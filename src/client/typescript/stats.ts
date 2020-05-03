import '../scss/global';

const main = document.querySelector('main');
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

    const player_global_info = main.appendChild(document.createElement('div'));
    player_global_info.innerHTML = `
    <h2>${player.nickname}</h2>
    Last battle : ${new Date(player.last_battle_time * 1000).toLocaleString()} 
    <br />
    Last seen : ${new Date(player.logout_at * 1000).toLocaleString()} 
    `;

    const getTanksStats: wot_tanks_stats_request = await (
        await fetch(`api/player/${user_id}/tanks_stats`)
    ).json();

    const expected: expected_values = await (
        await fetch(`api/expected`)
    ).json();

    const tanks_stats = getTanksStats.data[user_id];

    const table = main.appendChild(document.createElement('table'));

    tanks_stats
        .sort((a, b) => b.all.battles - a.all.battles)
        .forEach((t) => {
            const tank = { ...t, ...tanks[t.tank_id] };
            const tank_div = table.appendChild(document.createElement('tr'));

            const tank_battles = tank.all.battles;
            const tank_expected = expected[tank.tank_id];

            /**
             * Getting average values
             */
            const avg_damages = tank.all.damage_dealt / tank_battles;
            const avg_spot = tank.all.spotted / tank_battles;
            const avg_frag = tank.all.frags / tank_battles;
            const avg_def = tank.all.dropped_capture_points / tank_battles;
            const avg_win_rate =
                (100 * tank.all.wins) /
                (tank.all.wins + tank.all.draws + tank.all.losses);

            /**
             * Getting rates
             */
            const r_damages = avg_damages / tank_expected.expDamage;
            const r_spot = avg_spot / tank_expected.expSpot;
            const r_frag = avg_frag / tank_expected.expFrag;
            const r_def = avg_def / tank_expected.expDef;
            const r_win_rate = avg_win_rate / tank_expected.expWinRate;

            const r_win_c = Math.max(0, (r_win_rate - 0.71) / (1 - 0.71));
            const r_damages_c = Math.max(0, (r_damages - 0.22) / (1 - 0.22));
            const r_frag_c = Math.max(
                0,
                Math.min(r_damages_c + 0.2, (r_frag - 0.12) / (1 - 0.12))
            );
            const r_spot_c = Math.max(
                0,
                Math.min(r_damages_c + 0.1, (r_spot - 0.38) / (1 - 0.38))
            );
            const r_def_c = Math.max(
                0,
                Math.min(r_damages_c + 0.1, (r_def - 0.1) / (1 - 0.1))
            );

            const wn8 =
                980 * r_damages_c +
                210 * r_damages_c * r_frag_c +
                155 * r_frag_c * r_spot_c +
                75 * r_def_c * r_frag_c +
                145 * Math.min(1.8, r_win_c);

            tank_div.innerHTML = `
            <td>${tank.name}</td>
            <td>
                <img src="${tank.images.small_icon}">
            </td>
            <td>
                ${wn8.toFixed(0)}
            </td>
        `;
        });
};
load();
