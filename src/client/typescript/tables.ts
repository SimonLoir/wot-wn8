import { $ } from './extjs';

export function registerStyle(className: string, data: string[]) {
    $(document).ready(() => {
        let style = `@media only screen and (max-width: 760px) {
            .${className} thead,
            .${className} tbody,
            .${className} th,
            .${className} td,
            .${className} tr{
                display: block;
            }
            .${className} th {
                display: none;
            }
            .${className} td {
                /* Behave  like a "row" */
                border: none;
                position: relative;
                padding-left: 50%;
            }.${className} td img{
                float: right;
            }
            .${className} td:before {
                /* Now like a table header */
                position: absolute;
                /* Top/left values mimic padding */
                top: 6px;
                left: 6px;
                width: 45%;
                padding-right: 10px;
                white-space: nowrap;
            }
            `;
        data.forEach((d, i) => {
            style += `.${className} td:nth-of-type(${
                i + 1
            }):before { content: "${d}"; }`;
        });
        style += '}';
        $('body').child('style').html(style);
    });
}
