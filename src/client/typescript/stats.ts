import '../scss/global';
import menu from './menu';
import section from './section';
import { computeWN8, wn8, getColor } from './wn8';
import { ExtJsObject, $ } from './extjs';
import { createAd } from './ads';
import { getCookie, setCookie } from './cookies';
//@ts-ignore
const pid: string = window.data.user_id;
const loading = section('Loading...');
loading.content.text('Please wait while we are loading data from the server');

menu();
fetch(`api/player/${pid}/data`)
    .then((response) => response.json())
    .then(async (data: api_player_data) => {
        const [expected, wg_tanks]: [
            expected_values,
            wot_available_tanks
        ] = await Promise.all([
            (await fetch(`api/expected`)).json(),
            (await fetch(`api/tanks`)).json(),
        ]);

        const global = {
            IDNum: 0,
            expDef: 0,
            expFrag: 0,
            expSpot: 0,
            expDamage: 0,
            expWinRate: 0,
        };

        let tanks = data.tanks_stats.map((tank) => {
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
                wn8 = computeWN8(
                    avg_damages,
                    avg_spot,
                    avg_frag,
                    avg_def,
                    avg_win_rate,
                    tank_expected
                );
                global.expDamage += tank.battles * tank_expected.expDamage;
                global.expDef += tank.battles * tank_expected.expDef;
                global.expFrag += tank.battles * tank_expected.expFrag;
                global.expSpot += tank.battles * tank_expected.expSpot;
                global.expWinRate +=
                    0.01 * tank.battles * tank_expected.expWinRate;
            } catch (error) {
                wn8 = -1;
            }

            return {
                name: '',
                tier: 0,
                premium: false,
                avg_damages,
                avg_spot,
                avg_frag,
                avg_def,
                avg_win_rate,
                avg_xp,
                wn8,
                ...tank,
                data: wg_tanks[tank.tank_id],
            };
        });

        const all = data.player.statistics.all;
        const r_damage = all.damage_dealt / global.expDamage;
        const r_spot = all.spotted / global.expSpot;
        const r_frags = all.frags / global.expFrag;
        const r_def = all.dropped_capture_points / global.expDef;
        const r_winrate = all.wins / global.expWinRate;

        const global_wn8 = wn8(r_damage, r_spot, r_frags, r_def, r_winrate);

        loading.container.remove();

        const player_info = section(
            'Informations about ' + data.player.nickname
        );

        createAd($('main'));

        player_info.content.html(`
        <span 
            style="color: ${getColor(global_wn8)}; font-size: 25px; 
            margin-bottom:15px;display: block;">
            ${global_wn8.toFixed(0)}
        </span>
        Last battle : 
        ${new Date(data.player.last_battle_time * 1000).toLocaleString()} 
        <br />
        Last seen : ${new Date(data.player.logout_at * 1000).toLocaleString()} 
        `);

        const tanks_info = section(
            'Informations about ' + data.player.nickname + ' tanks'
        ).content.child('table');

        let last = getCookie('last');
        let e = 1;
        const array_sort = (key: string) => {
            tanks = tanks.sort((a, b) => {
                //@ts-ignore
                const _a = a[key];
                //@ts-ignore
                const _b = b[key];
                if (_a < _b) return -1 * e;
                else if (_a > _b) return 1 * e;
                return 0 * e;
            });
        };
        const manage_key = (key: string) => {
            if (last == key + '.asc') {
                e = 1;
                last = key + '.desc';
                setCookie('last', key + '.asc');
            } else {
                e = -1;
                setCookie('last', key + '.desc');
                last = key + '.asc';
            }
        };
        const sort = (x: ExtJsObject, key: any) => {
            x.click(() => {
                manage_key(key);
                array_sort(key);
                render();
            });
        };

        tanks.forEach((tank) => {
            if (tank?.data?.name) tank.name = tank.data.name;
            if (tank?.data?.tier) tank.tier = tank.data.tier;
            if (tank?.data?.is_premium) tank.premium = tank.data.is_premium;
        });

        const render = () => {
            tanks_info.html('');
            const header = tanks_info.child('tr');
            [
                ['Tier', 'tier'],
                ['Tank', 'name'],
                ['Win', 'avg_win_rate'],
                ['Avg Dmg', 'avg_damages'],
                ['Avg XP', 'avg_xp'],
                ['Avg Spot', 'avg_spot'],
                ['Avg Kills', 'avg_frag'],
                ['Battles', 'battles'],
                ['WN8', 'wn8'],
            ].forEach(([header_title, key]) =>
                sort(
                    header
                        .child('th')
                        .text(header_title)
                        .css('cursor', 'pointer'),
                    key
                )
            );

            tanks.forEach((tank) => {
                const row = tanks_info.child('tr');
                row.child('td').text(tank.tier.toString());
                row.child('td')
                    .html(
                        `
                <img src="
                ${
                    tank.name != ''
                        ? tank.data.images.small_icon.replace(
                              'http://',
                              'https://'
                          )
                        : ''
                }
                " style="vertical-align: middle;">
                <span style="vertical-align: middle;">${tank.name} ${
                            tank.premium ? '&#9733;' : ''
                        }</span>
                `
                    )
                    .css('cursor', 'pointer')
                    .click(() => {
                        window.location.href = pid + '/' + tank.tank_id;
                    });
                row.child('td').text(tank.avg_win_rate.toFixed(2));
                row.child('td').text(tank.avg_damages.toFixed(0));
                row.child('td').text(tank.avg_xp.toFixed(0));
                row.child('td').text(tank.avg_spot.toFixed(2));
                row.child('td').text(tank.avg_frag.toFixed(2));
                row.child('td').text(tank.battles.toFixed(0));
                row.child('td')
                    .text(tank.wn8.toFixed(0))
                    .css('background', getColor(tank.wn8))
                    .css('color', 'white');
            });
        };
        let key = last.split('.')[0];
        key = key != '' ? key : 'wn8';
        manage_key(key);
        array_sort(key);
        render();
    });
