import '../scss/global';
import { computeWN8, wn8, getColor } from './wn8';
import { $ } from './extjs';

const main = document.querySelector('#main');
//@ts-ignore
const { user_id }: { user_id: string } = window.data;
const load = async () => {
    // Get list of available tanks
    const tanks: wot_available_tanks = await (await fetch(`api/tanks`)).json();
    // Get information about the user
    const get_player_info: wot_player_info = await (
        await fetch(`api/player/${user_id}/info`)
    ).json();

    // Player data
    const player = get_player_info.data[user_id];

    document.title = player.nickname;

    const player_global_info = $(main).child('div').addClass('section');
    player_global_info
        .child('div')
        .addClass('header')
        .text(`information about the player ${player.nickname}`);

    const getTanksStats: wot_tanks_stats_request = await (
        await fetch(`api/player/${user_id}/tanks_stats`)
    ).json();

    const expected: expected_values = await (
        await fetch(`api/expected`)
    ).json();

    const tanks_stats = getTanksStats.data[user_id];

    let player_tanks = $(main).child('div').addClass('section');
    player_tanks
        .child('div')
        .addClass('header')
        .text(`Tanks [${player.nickname}]`);
    player_tanks = player_tanks.child('div').addClass('content');

    const global = {
        IDNum: 0,
        expDef: 0,
        expFrag: 0,
        expSpot: 0,
        expDamage: 0,
        expWinRate: 0,
    };

    let all_tanks_data = tanks_stats
        .sort((a, b) => b.all.battles - a.all.battles)
        .map((t) => {
            let tank = {
                ...t,
                ...tanks[t.tank_id],
                wn8: 0,
                battles: 0,
                win: 0,
                avgSpot: 0,
            };
            const tank_expected = expected[tank.tank_id];

            const battles = tank.all.battles;
            tank.battles = battles;
            tank.win =
                (100 * tank.all.wins) /
                (tank.all.wins + tank.all.draws + tank.all.losses);
            tank.avgSpot = tank.all.spotted / battles;

            tank.wn8 = computeWN8(
                tank.all.damage_dealt,
                tank.all.spotted,
                tank.all.frags,
                tank.all.dropped_capture_points,
                tank.all.wins,
                tank.all.draws,
                tank.all.losses,
                tank_expected,
                battles
            );

            global.expDamage += battles * tank_expected.expDamage;
            global.expDef += battles * tank_expected.expDef;
            global.expFrag += battles * tank_expected.expFrag;
            global.expSpot += battles * tank_expected.expSpot;
            global.expWinRate += 0.01 * battles * tank_expected.expWinRate;

            return tank;
        });

    let e: number;
    let last = '';
    const sort = (key: any) => {
        if (last == key + '_asc') {
            e = 1;
            last = key + '_desc';
        } else {
            e = -1;
            last = key + '_asc';
        }

        all_tanks_data = all_tanks_data.sort((a, b) => {
            //@ts-ignore
            const _a = a[key];
            //@ts-ignore
            const _b = b[key];
            if (_a < _b) return -1 * e;
            else if (_a > _b) return 1 * e;
            return 0 * e;
        });
        render();
    };

    const render = () => {
        player_tanks.html('');
        const table = player_tanks.child('table');

        const thead = table.child('tr');
        thead
            .child('th')
            .click(() => sort('name'))
            .text('Tank');
        thead
            .child('th')
            .click(() => sort('win'))
            .text('Win');
        thead
            .child('th')
            .click(() => {})
            .text('Avg Dmg');
        thead
            .child('th')
            .click(() => {})
            .text('Avg XP');
        thead
            .child('th')
            .click(() => sort('avgSpot'))
            .text('Avg Spot');
        thead
            .child('th')
            .click(() => sort('battles'))
            .text('Battles');
        thead
            .child('th')
            .click(() => sort('wn8'))
            .text('WN8');

        all_tanks_data.forEach((tank) => {
            const tank_div = table.child('tr');
            const battles = tank.battles;
            tank_div.html(`
            <td>
                <img src="${tank.images.small_icon.replace(
                    'http://',
                    'https://'
                )}" style="vertical-align: middle;">
                <span style="vertical-align: middle;">${tank.name}</span>
                </td>
            <td>${tank.win.toFixed(2)} %</td>


            <td>${(tank.all.damage_dealt / battles).toFixed(0)}</td>
            <td>${tank.all.battle_avg_xp}</td>
            <td>${tank.avgSpot.toFixed(2)}</td>
            <td>${battles}</td>
            <td style="background: ${getColor(tank.wn8)};color:white;">
                ${tank.wn8.toFixed(0)}
            </td>
        `);
        });
    };
    render();

    const all = player.statistics.all;
    const r_damage = all.damage_dealt / global.expDamage;
    const r_spot = all.spotted / global.expSpot;
    const r_frags = all.frags / global.expFrag;
    const r_def = all.dropped_capture_points / global.expDef;
    const r_winrate = all.wins / global.expWinRate;

    const global_wn8 = wn8(r_damage, r_spot, r_frags, r_def, r_winrate);

    player_global_info.child('div').addClass('content').html(`
    <span style="color:${getColor(
        global_wn8
    )};font-size: 25px; margin-bottom:15px;display: block;">${global_wn8.toFixed(
        0
    )}</span>
    Last battle : ${new Date(player.last_battle_time * 1000).toLocaleString()} 
    <br />
    Last seen : ${new Date(player.logout_at * 1000).toLocaleString()} 
    `);
};
load();
