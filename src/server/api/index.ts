import * as express from 'express';
import * as fs from 'fs';
import { asyn } from '../errors';
import { database } from '../database';
export const api = express.Router();

api.get(
    '/data/:user_id',
    asyn(async (req, res) => {
        const { user_id } = req.params;
        res.json({
            user: await database.query(
                'SELECT * FROM users WHERE user_id = ?',
                [user_id]
            ),
            snapshot: await database.query(
                `SELECT * FROM snapshot_v2_data WHERE sid IN 
            (SELECT id FROM snapshot_v2 WHERE user_id = ?)`,
                [user_id]
            ),
            tanks: JSON.parse(fs.readFileSync('data/tanks.json', 'utf8')),
        });
    })
);
