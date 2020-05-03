import * as fetch from 'node-fetch';
export default class WOTAPI_default {
    constructor(protected appID: string, protected server: string = 'eu') {}
    public call(endpoint: string, options: wot_api_call_options) {}
}
