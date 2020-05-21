import '../scss/global';
import menu from './menu';
import { createAd } from './ads';
import { $ } from './extjs';
const btn = document.getElementById('search');
const search_bar: HTMLInputElement = document.querySelector('input#search_bar');
const main = document.querySelector('#main');
const render = (data: player_search_result_item[]) => {
    main.innerHTML = '';
    data.forEach((e) => {
        main.appendChild(document.createElement('div')).innerHTML = `
        <a href="${e.user_id}">${e.user_name}</a>
        `;
    });
    if (data.length == 1) main.querySelector('a').click();
};

search_bar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        btn.click();
    }
});

btn.addEventListener('click', async (e) => {
    main.innerHTML = 'Loading data from servers';
    const search: player_search_result_item[] = await (
        await fetch(`api/player/${search_bar.value}/search`)
    ).json();
    render(search);
    const index = main.appendChild(document.createElement('button'));
    index.innerHTML = `Player not found ?`;
    index.addEventListener('click', async () => {
        index.style.display = 'none';
        const wot_player_search: wot_player_search = await (
            await fetch(`api/player/${search_bar.value}`)
        ).json();
        if (!wot_player_search.data || wot_player_search.data.length == 0)
            return alert('An error occured while getting data from WG API');
        const data = wot_player_search.data.map((e) => {
            return {
                user_id: e.account_id,
                user_name: e.nickname,
            };
        });
        render(data);
    });
});

menu();
createAd($('main'));
