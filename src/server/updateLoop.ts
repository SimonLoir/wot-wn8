import { database } from './database';
import WOTAPI from './wot';
export let users_queue: number[] = [];
const threshold = 99; // must be less than 99
const API = new WOTAPI(process.env.APPID);
export default async function updateLoop() {
    console.log(users_queue.length + ' users in the queue');

    // We get the user that were updated a while ago
    const users: wn8master_user[] = await database.query(
        `SELECT * FROM users ORDER BY last_check ASC LIMIT ${Math.max(
            0,
            threshold - users_queue.length
        )}`
    );

    // We put the user in the queue
    users.forEach((user) => users_queue.push(user.user_id));

    const selected_users = users_queue.splice(0, threshold);
    const wot_infos = await API.accounts.info(
        selected_users.join(', '),
        'logout_at'
    );

    if (wot_infos.data) {
        const keys = Object.keys(wot_infos.data);
        for (let i = 0; i < keys.length; i++) {
            const data = wot_infos.data[keys[i]];
            if (
                users.filter(
                    (user) =>
                        parseInt(keys[i]) == user.user_id &&
                        data.logout_at == user.last_seen
                ).length != 1
            ) {
                console.log('Must update user ' + keys[i]);
                await database.query(
                    'UPDATE users SET last_seen = ?, last_check = ? WHERE user_id = ?',
                    [
                        data.logout_at.toString(),
                        (new Date().getTime() / 1000).toFixed(0),
                        keys[i],
                    ]
                );
            }
        }
    }

    setTimeout(updateLoop, 30000);
}
