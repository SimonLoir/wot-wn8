import * as express from 'express';
import * as fs from 'fs';
import { asyn } from '../errors';
import WOTAPI from '../wot';
import fetch from 'node-fetch';
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

API.use('/tanks', express.static('data/tanks.json'));
API.use('/expected', express.static('data/exp.json'));
