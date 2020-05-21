import '../scss/global';
import menu from './menu';
import * as Chart from 'chart.js';
import section from './section';
import { $ } from './extjs';
menu();

//@ts-ignore
const pid: string = window.data.user_id;

//@ts-ignore
const tid: string = window.data.tank_id;

fetch(`../api/player/${pid}/available_snapshots`)
    .then((response) => response.json())
    .then((snapshots: { id: number; time: number }[]) => {
        if (snapshots.length < 2) return alert('No data available');
        load(snapshots[0].id, snapshots.reverse()[0].id, snapshots);
    });

const load = (
    from: number,
    to: number,
    snapshots: { id: number; time: number }[]
) => {
    $('main').html('');

    const controls = section('Controls').content;

    const from_select = controls.child('select');

    const to_select = controls.child('select');
    snapshots.forEach((snapshot) => {
        [from_select, to_select].forEach((e) => {
            const opt = e
                .child('option')
                .value(snapshot.id.toString())
                .text(
                    `#${snapshot.id} ${new Date(
                        snapshot.time * 1000
                    ).toLocaleString()}`
                );
            if (
                (from == snapshot.id && e == from_select) ||
                (to == snapshot.id && e == to_select)
            )
                opt.attr('selected', '');
        });
    });

    [from_select, to_select].forEach((e) => {
        e.change(() => {
            load(
                parseInt(from_select.value()),
                parseInt(to_select.value()),
                snapshots
            );
        });
    });

    fetch(`../api/player/${pid}/tank/${tid}/snapshots/${from}/${to}`)
        .then((response) => response.json())
        .then((e: api_tanks_stats[]) => {
            const damages = e.map((t) => {
                return t.damage_dealt / t.battles;
            });
            const kills = e.map((t) => {
                return t.frags / t.battles;
            });
            const dates = e.map((t) => {
                return new Date(t.time * 1000).toDateString();
            });

            const damages_canvas: HTMLCanvasElement = section('average damages')
                .content.addClass('data-graph')
                .child('canvas')
                .get(0);

            damages_canvas.style.height = '100%';
            damages_canvas.style.width = '100%';

            const dmg_chart = chart(
                damages_canvas,
                damages,
                dates,
                'AVG Damages'
            );

            const avg_kills: HTMLCanvasElement = section('average kills')
                .content.addClass('data-graph')
                .child('canvas')
                .get(0);

            avg_kills.style.height = '100%';
            avg_kills.style.width = '100%';

            const avg_kills_chart = chart(avg_kills, kills, dates, 'AVG Kills');
            window.addEventListener('resize', () => {
                console.log('e');
                dmg_chart.update();
                avg_kills_chart.update();
            });
        });
};

function chart(
    canvas: HTMLCanvasElement,
    data: number[],
    dates: any[],
    label: string
) {
    return new Chart(canvas, {
        type: 'line',
        data: {
            labels: dates,

            datasets: [
                {
                    data,
                    label,
                    lineTension: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}
