const fetch = require('node-fetch');
const fs = require('fs');
const tanks = JSON.parse(fs.readFileSync('tanks.json'));
const tanks_stats = JSON.parse(fs.readFileSync('stats.json'));
const exp = JSON.parse(fs.readFileSync('exp.json'));
const player = '529721740';
const results = {};

const load = async () => {
    let sum = 0;
    tanks_stats.forEach((element) => {
        const tank = { ...tanks.data[element.tank_id], ...element };
        const expected = exp[element.tank_id];
        const win = (tank.all.wins / (tank.all.wins + tank.all.losses)) * 100;

        const battles = tank.all.battles;
        const damages = tank.all.damage_dealt;
        const avgDmg = damages / battles;
        const avgSpot = tank.all.spotted / battles;
        const avgFrag = tank.all.frags / battles;
        const avgDef = tank.all.dropped_capture_points / battles;

        /**
         * r
         */

        const rDAMAGE = avgDmg / expected.expDamage;
        const rWIN = win / expected.expWinRate;
        const rSPOT = avgSpot / expected.expSpot;
        const rFRAG = avgFrag / expected.expFrag;
        const rDEF = avgDef / expected.expDef;

        /**
         * rc
         */

        const rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
        const rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
        const rFRAGc = Math.max(
            0,
            Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12))
        );
        const rSPOTc = Math.max(
            0,
            Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38))
        );
        const rDEFc = Math.max(
            0,
            Math.min(rDAMAGEc + 0.1, (rDEF - 0.1) / (1 - 0.1))
        );

        const wn8 =
            980 * rDAMAGEc +
            210 * rDAMAGEc * rFRAGc +
            155 * rFRAGc * rSPOTc +
            75 * rDEFc * rFRAGc +
            145 * Math.min(1.8, rWINc);

        sum += wn8;

        const stats = {
            name: tank.name,
            battles,
            rDAMAGE,
            rWIN,
            rSPOT,
            rFRAG,
            rDEF,
            wn8,
            win,
        };
        results[tank.tank_id] = stats;
    });

    console.log(sum / tanks_stats.length);

    fs.writeFileSync(`wn8.json`, JSON.stringify(results));
};

load();
