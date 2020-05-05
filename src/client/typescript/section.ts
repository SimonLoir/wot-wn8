import { $ } from './extjs';

export default function section(title: string) {
    const container = $('main').child('div').addClass('section');
    container.child('div').addClass('header').text(title);
    return {
        container,
        content: container.child('div').addClass('content'),
    };
}
