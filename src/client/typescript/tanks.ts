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

        const dmg_chart = new Chart(damages_canvas, {
            type: 'line',
            data: {
                labels: dates,

                datasets: [
                    {
                        data: damages,
                        label: 'damages',
                        lineTension: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        const avg_kills: HTMLCanvasElement = section('average kills')
            .content.addClass('data-graph')
            .child('canvas')
            .get(0);

        avg_kills.style.height = '100%';
        avg_kills.style.width = '100%';

        const avg_kills_chart = new Chart(avg_kills, {
            type: 'line',
            data: {
                labels: dates,

                datasets: [
                    {
                        data: kills,
                        label: 'Kills',
                        lineTension: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        window.addEventListener('resize', () => {
            console.log('e');
            dmg_chart.update();
            avg_kills_chart.update();
        });
    });
