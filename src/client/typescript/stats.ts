import '../scss/global';

const main = document.querySelector('main');
//@ts-ignore
const { user_id }: { user_id: string } = window.data;
const load = async () => {
    const get_player_info: wot_player_info = await (
        await fetch(`api/player/${user_id}/info`)
    ).json();
    const player = get_player_info.data[user_id];
    console.log(player);
    document.title = player.nickname;

    const player_global_info = main.appendChild(document.createElement('div'));
    player_global_info.innerHTML = `
    <h2>${player.nickname}</h2>
    Last battle : ${new Date(player.last_battle_time * 1000).toLocaleString()} 
    <br />
    Last seen : ${new Date(player.logout_at * 1000).toLocaleString()} 
    `;
};
load();
