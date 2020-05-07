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

        // We check if an existing snapshot exists for the last_updated value
        const snapshot = (
            await database.query(
                'SELECT * FROM snapshots WHERE pid = ? AND time = ?',
                [player, data.updated_at.toString()]
            )
        )[0];

        // If there is a snapshot, no api call, we deliver the content of the database
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
            // We get the stats from the WG API
            const all_tanks_request = await WOTEU.tanks.stats(player);
            const all_tanks = all_tanks_request.data[player].map((tank) => {
                return { tank_id: tank.tank_id, ...tank.all };
            });

            // We send the data to the client
            res.json({
                player: data,
                tanks_stats: all_tanks,
            });

            try {
                // We continue as a background work
                // Indexing the snapshot
                const id: number = (
                    await database.query(
                        `INSERT INTO snapshots VALUES (NULL, ?, ?, ?)`,
                        [
                            player,
                            data.updated_at.toString(),
                            new Date(data.updated_at * 1000)
                                .toISOString()
                                .split('T')[0],
                        ]
                    )
                ).insertId;

                // Sending values in the database
                all_tanks.forEach((tank) =>
                    database.query(
                        'INSERT INTO snapshots_data VALUES (?, ?, ?)',
                        [id.toString(), tank.tank_id, JSON.stringify(tank)]
                    )
                );
            } catch (error) {
                console.log(error);
            }

            // Server is done with the request
        }
    })
);

API.get(
    '/player/:player_id/snapshots',
    asyn(async (req, res) => {
        res.json(
            await database.query(
                `SELECT * FROM snapshots_data s WHERE s.id IN (
                SELECT MAX(id) AS id
                FROM snapshots 
                WHERE pid = ?
                GROUP BY \`date\`)`,
                [req.params.player_id]
            )
        );
    })
);

API.get(
    '/player/:player_id/tank/:tank_id/snapshots',
    asyn(async (req, res) => {
        res.json(
            (
                await database.query(
                    `SELECT * FROM snapshots_data sd, snapshots s 
                    WHERE 
                    sd.id = s.id
                    AND s.pid = ?
                    AND tank_id = ?`,
                    [req.params.player_id, req.params.tank_id]
                )
            ).map((e: any) => {
                let d = JSON.parse(e.data);
                d.time = e.time;
                return d;
            })
        );
    })
);
