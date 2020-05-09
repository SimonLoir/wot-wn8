import '../scss/global';
import menu from './menu';
import { createAd } from './ads';
import { $ } from './extjs';
const btn = document.getElementById('search');
const search_bar: HTMLInputElement = document.querySelector('input#search_bar');
const main = document.querySelector('#main');

search_bar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        btn.click();
    }
});

btn.addEventListener('click', async (e) => {
    main.innerHTML = 'Loading data from Wargaming API';
    const wot_player_search: wot_player_search = await (
        await fetch(`api/player/${search_bar.value}`)
    ).json();

    if (!wot_player_search.data) return alert('An error occured');
    wot_player_search.data.map((e) => {
        main.appendChild(document.createElement('div')).innerHTML = `
        <a href="${e.account_id}">${e.nickname}</a>
        `;
    });
    if (wot_player_search.data.length == 1) main.querySelector('a').click();
});

menu();
createAd($('main'));
