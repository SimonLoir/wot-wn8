import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as https from 'express-force-https';
import * as Discord from 'discord.js';
dotenv.config();
import { API } from './api';
import errorMessage from './errors';
import { database } from './database';
import { wn8, getColor } from '../client/typescript/wn8';

const {
    APP_BASE_URL = '/',
    PORT = 8080,
    NODE_ENV = 'development',
} = process.env;

const app = express();

app.set('view engine', 'ejs');

app.use(https);

app.set('views', 'public/');
app.use(APP_BASE_URL, express.static('public'));
app.use(APP_BASE_URL + 'api', API);

app.get(APP_BASE_URL, (req, res) => {
    res.render('index');
});

app.get(APP_BASE_URL + ':user_id', (req, res) => {
    res.render('stats', { params: req.params });
});

app.get(APP_BASE_URL + ':user_id/:tank_id', (req, res) => {
    res.render('tanks', { params: req.params });
});

app.listen(PORT, () =>
    console.log(`Server started at ${new Date().toString()}`)
);

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        errorMessage(err.message, res);
    }
);

/**
 * Discord bot
 */
if (process.env.DISCORD_TOKEN) {
    const discord = new Discord.Client();

    discord.login(process.env.DISCORD_TOKEN);

    discord.on('message', async (message) => {
        let msg = message.content;

        if (msg.indexOf('!wn ') != 0) return;
        msg = msg.replace('!wn ', '');

        if (msg.indexOf('search ') == 0) {
            const username = msg.replace('search ', '').trim();
            const user_search = await database.query(
                'SELECT * FROM users WHERE user_name = ?',
                [username]
            );
            if (user_search.length != 1)
                return message.channel.send('Could not find the user');
            const { user_id, user_name } = user_search[0];
            const snapshot = await database.query(
                'SELECT * FROM snapshots WHERE pid = ? ORDER BY id DESC LIMIT 1',
                [user_id]
            );
            const url = `https://wn8master.games/${user_id}`;
            if (snapshot.length != 1)
                return message.channel.send(
                    `No snapshot found ! 
Visit ${url} to create one :-)`
                );

            const expected = JSON.parse(
                fs.readFileSync('data/exp.json', 'utf8')
            );
            const stats: api_tanks_stats[] = (
                await database.query(
                    'SELECT * FROM snapshots_data WHERE id = ?',
                    [snapshot[0].id]
                )
            ).map((data: any) => JSON.parse(data.data));
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
            console.time('Compute duration');
            stats.forEach((tank) => {
                all.damage_dealt += tank.damage_dealt;
                all.spotted += tank.spotted;
                all.frags += tank.frags;
                all.dropped_capture_points += tank.dropped_capture_points;
                all.wins += tank.wins;
                all.battles += tank.battles;

                const avg_damages = tank.damage_dealt / tank.battles;
                const avg_xp = tank.xp / tank.battles;
                const avg_spot = tank.spotted / tank.battles;
                const avg_frag = tank.frags / tank.battles;
                const avg_def = tank.dropped_capture_points / tank.battles;
                const avg_win_rate =
                    (100 * tank.wins) / (tank.wins + tank.draws + tank.losses);

                let wn8: number;
                try {
                    const tank_expected = expected[tank.tank_id];
                    global.expDamage += tank.battles * tank_expected.expDamage;
                    global.expDef += tank.battles * tank_expected.expDef;
                    global.expFrag += tank.battles * tank_expected.expFrag;
                    global.expSpot += tank.battles * tank_expected.expSpot;
                    global.expWinRate +=
                        0.01 * tank.battles * tank_expected.expWinRate;
                } catch (error) {
                    wn8 = -1;
                }
            });

            const r_damage = all.damage_dealt / global.expDamage;
            const r_spot = all.spotted / global.expSpot;
            const r_frags = all.frags / global.expFrag;
            const r_def = all.dropped_capture_points / global.expDef;
            const r_winrate = all.wins / global.expWinRate;

            const global_wn8 = wn8(r_damage, r_spot, r_frags, r_def, r_winrate);
            console.timeEnd('Compute duration');

            const content = new Discord.MessageEmbed();
            content.setTitle(user_name);
            content.setDescription(`Username : ${user_name} #${user_id}
            Last update : ${snapshot[0].date}
            WN8 : ${global_wn8.toFixed(2)}
            Battles : ${all.battles}

            Link to update : ${url}
            `);
            content.setColor(getColor(global_wn8, false));
            message.channel.send(content);
        }
    });
}
