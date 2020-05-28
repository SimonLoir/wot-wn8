import '../scss/index';
import get from './window';
import { $ } from './extjs';
import { getColor } from '../../server/wn8';

if (get('page') == 'player')
    fetch('../api/data/' + get('user_id'))
        .then((e) => e.json())
        .then((data: data_request) => {
            if (!data.user[0])
                return alert('This user does not exist in the database.');
            const user = data.user[0];
            $('main')
                .child('p')
                .text(
                    'Last update : ' +
                        new Date(user.last_check * 1000).toLocaleString()
                );
            $('.user-name h2').text(user.user_name);
            $('.user-name span')
                .text(user.wn8.toFixed(2))
                .css('color', getColor(user.wn8));
            $('.user-battles-played span').text(`${user.battles}`);
            $('.user-avg-xp span').text(`${user.avg_xp}`);
            const table = $('main').child('table');
            data.snapshot.forEach((tank) => {
                const tank_name =
                    data?.tanks[tank.tank_id]?.name || 'Name not found';
                const image =
                    data?.tanks[tank.tank_id]?.images?.small_icon || '';
                const premium = data?.tanks[tank.tank_id]?.is_premium;
                const tr = table.child('tr');
                tr.child('td').html(`
                <img src="${image}" alt="not found" style="vertical-align: middle"/>
                ${tank_name}
                ${premium ? '&#9733;' : ''}
                `);
                tr.child('td')
                    .text(tank.wn8.toString())
                    .css('color', getColor(tank.wn8, true));
            });
        });
