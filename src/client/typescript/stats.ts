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

    const table = player_tanks.child('table');

    table.html(`
        <tr>
            <th>Image</th>
            <th>Tank</th>
            <th>Win</th>
            <th>Battles</th>
            <th>WN8</th>
        </tr>
    `);

    const global = {
        IDNum: 0,
        expDef: 0,
        expFrag: 0,
        expSpot: 0,
        expDamage: 0,
        expWinRate: 0,
    };

    tanks_stats
        .sort((a, b) => b.all.battles - a.all.battles)
        .forEach((t) => {
            const tank = { ...t, ...tanks[t.tank_id] };
            const tank_div = table.child('tr');
            const tank_expected = expected[tank.tank_id];

            const wn8 = computeWN8(
                tank.all.damage_dealt,
                tank.all.spotted,
                tank.all.frags,
                tank.all.dropped_capture_points,
                tank.all.wins,
                tank.all.draws,
                tank.all.losses,
                tank_expected,
                tank.all.battles
            );

            global.expDamage += tank.all.battles * tank_expected.expDamage;
            global.expDef += tank.all.battles * tank_expected.expDef;
            global.expFrag += tank.all.battles * tank_expected.expFrag;
            global.expSpot += tank.all.battles * tank_expected.expSpot;
            global.expWinRate +=
                0.01 * tank.all.battles * tank_expected.expWinRate;

            tank_div.html(`
            <td>
                <img src="${tank.images.small_icon.replace(
                    'http://',
                    'https://'
                )}">
            </td>
            <td>${tank.name}</td>
            <td>${(
                (100 * tank.all.wins) /
                (tank.all.wins + tank.all.draws + tank.all.losses)
            ).toFixed(2)} %</td>
            <td>${tank.all.battles}</td>
            <td style="background: ${getColor(wn8)};color:white;">
                ${wn8.toFixed(0)}
            </td>
        `);
        });
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
