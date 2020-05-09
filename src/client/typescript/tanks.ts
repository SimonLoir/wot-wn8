import '../scss/global';
import menu from './menu';
import * as Chart from 'chart.js';
import section from './section';
menu();

//@ts-ignore
const pid: string = window.data.user_id;

//@ts-ignore
const tid: string = window.data.tank_id;

fetch(`../api/player/${pid}/tank/${tid}/snapshots`)
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

        const dmg_chart = chart(damages_canvas, damages, dates, 'AVG Damages');

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
