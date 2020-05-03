import WOTAPI_default from './api';
import WOTAPIAccount from './accounts';

export default class WOTAPI extends WOTAPI_default {
    private accounts: WOTAPIAccount;
    constructor(appID: string, server: string = 'eu') {
        super(appID, server);
        this.accounts = new WOTAPIAccount(appID, server);
    }
}
