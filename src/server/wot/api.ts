import fetch from 'node-fetch';
export default class WOTAPI_default {
    constructor(protected appID: string, protected server: string = 'eu') {}
    /**
     * Performs an API call to the wot API
     * @param endpoint API endpoint
     * @param options call options
     */
    public async call(endpoint: string, options: wot_api_call_options) {
        options.application_id = this.appID;
        const params = this.serialize(options);
        const url = `https://api.worldoftanks.${this.server}/wot/${endpoint}/?${params}`;
        console.log(url);
        return await (await fetch(url)).json();
    }
    /**
     * Converts an object into a query string
     */
    private serialize = function (obj: any) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
                );
            }
        return str.join('&');
    };
}
