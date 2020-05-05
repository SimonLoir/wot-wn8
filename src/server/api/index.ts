import * as express from 'express';
import * as fs from 'fs';
import { asyn } from '../errors';
import WOTAPI from '../wot';
import fetch from 'node-fetch';
import { database } from '../database';
export const API = express.Router();
const WOTEU = new WOTAPI(process.env.APPID, 'eu');
API.get(
    '/player/:name',
    asyn(async (req, res) => {
        res.json(await WOTEU.accounts.search(req.params.name));
    })
);

API.get(
    '/player/:player_id/info',
    asyn(async (req, res) => {
        res.json(await WOTEU.accounts.info(req.params.player_id));
    })
);

API.get(
    '/player/:player_id/tanks_stats',
    asyn(async (req, res) => {
        res.json(await WOTEU.tanks.stats(req.params.player_id));
    })
);

API.get(
    '/update-expected',
    asyn(async (req, res) => {
        const values: {
            data: {
                IDNum: number;
                expDef: number;
                expFrag: number;
                expSpot: number;
                expDamage: number;
                expWinRate: number;
            }[];
        } = await (
            await fetch(
                'https://static.modxvm.com/wn8-data-exp/json/wn8exp.json'
            )
        ).json();
        let data: any = {};
        values.data.forEach((e) => {
            data[e.IDNum] = e;
        });

        fs.writeFileSync('data/exp.json', JSON.stringify(data));

        res.send('done');
    })
);

API.get(
    '/update-tanks',
    asyn(async (req, res) => {
        const data = await WOTEU.tanks.getAll();
        fs.writeFileSync('data/tanks.json', JSON.stringify(data));

        res.send('done');
    })
);

API.use('/tanks', express.static('data/tanks.json'));
API.use('/expected', express.static('data/exp.json'));

API.get(
    '/player/:player_id/data',
    asyn(async (req, res) => {
        // Getting the player ID from the request
        const player = req.params.player_id;
        console.log(`Player data asked for ${player}`);

        // Getting user data
        const player_data: wot_player_info = await WOTEU.accounts.info(player);

        // Checking that the user exists
        if (!player_data?.data[player])
            throw 'Fatal error while loading the user';

        const data = player_data.data[player];
        let tanks_stats: any = [];

        const snapshot = (
            await database.query(
                'SELECT * FROM snapshots WHERE pid = ? AND time = ?',
                [player, data.updated_at.toString()]
            )
        )[0];

        if (snapshot) {
            res.json({
                player: data,
                tanks_stats: (
                    await database.query(
                        'SELECT * FROM snapshots_data WHERE id = ?',
                        [snapshot.id]
                    )
                ).map((data: any) => JSON.parse(data.data)),
            });
        } else {
            const all_tanks_request = await WOTEU.tanks.stats(player);
            const all_tanks = all_tanks_request.data[player].map((tank) => {
                return { tank_id: tank.tank_id, ...tank.all };
            });
            tanks_stats = all_tanks;

            res.json({
                player: data,
                tanks_stats,
            });

            const id: number = (
                await database.query(
                    `INSERT INTO snapshots VALUES (NULL, ?, ?)`,
                    [player, data.updated_at.toString()]
                )
            ).insertId;

            all_tanks.forEach((tank) =>
                database.query('INSERT INTO snapshots_data VALUES (?, ?, ?)', [
                    id.toString(),
                    tank.tank_id,
                    JSON.stringify(tank),
                ])
            );
            console.log('done');
        }
    })
);
