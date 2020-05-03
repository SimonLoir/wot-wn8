import * as express from 'express';
import { asyn } from '../errors';
import WOTAPI from '../wot';
export const API = express.Router();
const WOTEU = new WOTAPI(process.env.APPID, 'eu');
API.get(
    '/player/:name',
    asyn(async (req, res) => {
        res.json(await WOTEU.accounts.search(req.params.name));
    })
);
