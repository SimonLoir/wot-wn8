import { $ } from './extjs';

export default function menu() {
    $('#menu').click(function () {
        const app = $('.app');
        if (app.hasClass('expended')) {
            $(this).removeClass('icon-left');
            $(this).addClass('icon-menu');
            app.removeClass('expended');
        } else {
            $(this).removeClass('icon-menu');
            $(this).addClass('icon-left');
            app.addClass('expended');
        }
    });

    $('#go-home').click(() => {
        window.location.href = './';
    });
}
