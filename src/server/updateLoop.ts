import { database } from './database';
import WOTAPI from './wot';
import * as fs from 'fs';
import { wn8, computeWN8 } from './wn8';
export let users_queue: number[] = [];
const threshold = 99; // must be less than 99
const API = new WOTAPI(process.env.APPID);
export default async function updateLoop() {
    console.log(users_queue.length + ' users in the queue');

    const expected = JSON.parse(fs.readFileSync('data/exp.json', 'utf8'));

    // We get the user that were updated a while ago
    const users: wn8master_user[] = await database.query(
        `SELECT * FROM users ORDER BY last_check ASC LIMIT ${Math.max(
            0,
            threshold - users_queue.length
        )}`
    );

    // We put the user in the queue
    users.forEach((user) => users_queue.push(user.user_id));

    // We only keep a small amount of users
    const selected_users = users_queue.splice(0, threshold);

    // We get the last logout time for these users
    const wot_infos = await API.accounts.info(
        selected_users.join(', '),
        'logout_at, statistics.all'
    );

    // If we get a result (otherwise it's an error)
    if (wot_infos.data) {
        // Key is the user ID
        const keys = Object.keys(wot_infos.data);
        for (let i = 0; i < keys.length; i++) {
            // Data about the player
            const data = wot_infos.data[keys[i]];

            let global_wn8 = 0;
            // If the same data already exist in the database, do nothing
            if (
                users.filter(
                    (user) =>
                        parseInt(keys[i]) == user.user_id &&
                        data.logout_at == user.last_seen
                ).length != 1
            ) {
                // We get user data
                const d = await API.tanks.stats(keys[i]);
                const tanks_data = d.data[keys[i]];

                if (tanks_data) {
                    const global = {
                        IDNum: 0,
                        expDef: 0,
                        expFrag: 0,
                        expSpot: 0,
                        expDamage: 0,
                        expWinRate: 0,
                    };
                    const all = {
                        damage_dealt: 0,
                        spotted: 0,
                        frags: 0,
                        dropped_capture_points: 0,
                        wins: 0,
                        battles: 0,
                    };

                    const values = tanks_data
                        .map((t) => {
                            return { ...t.all, tank_id: t.tank_id };
                        })
                        .map((tank) => {
                            all.damage_dealt += tank.damage_dealt;
                            all.spotted += tank.spotted;
                            all.frags += tank.frags;
                            all.dropped_capture_points +=
                                tank.dropped_capture_points;
                            all.wins += tank.wins;
                            all.battles += tank.battles;

                            const avg_damages =
                                tank.damage_dealt / tank.battles;
                            const avg_xp = tank.xp / tank.battles;
                            const avg_spot = tank.spotted / tank.battles;
                            const avg_frag = tank.frags / tank.battles;
                            const avg_def =
                                tank.dropped_capture_points / tank.battles;
                            const avg_win_rate =
                                (100 * tank.wins) / tank.battles;

                            let wn8: number;
                            try {
                                const tank_expected = expected[tank.tank_id];
                                global.expDamage +=
                                    tank.battles * tank_expected.expDamage;
                                global.expDef +=
                                    tank.battles * tank_expected.expDef;
                                global.expFrag +=
                                    tank.battles * tank_expected.expFrag;
                                global.expSpot +=
                                    tank.battles * tank_expected.expSpot;
                                global.expWinRate +=
                                    0.01 *
                                    tank.battles *
                                    tank_expected.expWinRate;

                                wn8 = computeWN8(
                                    avg_damages,
                                    avg_spot,
                                    avg_frag,
                                    avg_def,
                                    avg_win_rate,
                                    tank_expected
                                );
                            } catch (error) {
                                wn8 = -1;
                            }
                            return {
                                id: tank.tank_id,
                                wn8: isNaN(wn8) ? -1 : wn8,
                            };
                        });

                    const r_damage = all.damage_dealt / global.expDamage;
                    const r_spot = all.spotted / global.expSpot;
                    const r_frags = all.frags / global.expFrag;
                    const r_def = all.dropped_capture_points / global.expDef;
                    const r_winrate = all.wins / global.expWinRate;

                    global_wn8 = wn8(
                        r_damage,
                        r_spot,
                        r_frags,
                        r_def,
                        r_winrate
                    );

                    const s = (
                        await database.query(
                            'INSERT INTO snapshot_v2 VALUES (NULL, ?, ?)',
                            [keys[i], global_wn8.toFixed(2)]
                        )
                    ).insertId;

                    let all_db_push: Promise<any>[] = [];

                    values.forEach((v) => {
                        const req = database.query(
                            'INSERT INTO `snapshot_v2_data` VALUES (?, ?, ?)',
                            [s, v.id, v.wn8.toFixed(2)]
                        );
                    });

                    await Promise.all(all_db_push);

                    // We prevent API overload from wargaming side (20 requests per second max)
                    await sleep(40);
                    await database.query(
                        'UPDATE users SET wn8 = ?, avg_xp = ?, battles = ?  WHERE user_id = ?',
                        [
                            global_wn8.toFixed(2),
                            data.statistics.all.battle_avg_xp.toFixed(0),
                            data.statistics.all.battles.toFixed(0),
                            keys[i],
                        ]
                    );
                }
                // At this point we must save data of the player
                console.log('Saved ' + keys[i]);
                console.log(data.statistics.all.battles);
            }
            await database.query(
                'UPDATE users SET last_seen = ?, last_check = ? WHERE user_id = ?',
                [
                    data.logout_at.toString(),
                    (new Date().getTime() / 1000).toFixed(0),
                    keys[i],
                ]
            );
            console.log(global_wn8);
        }
    }

    setTimeout(updateLoop, 30000);
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
