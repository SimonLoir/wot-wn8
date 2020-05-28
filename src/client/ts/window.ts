export default function get(what: string): any {
    //@ts-ignore
    return window.data[what];
}
