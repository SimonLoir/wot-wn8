import WOTAPI_default from './api';
import WOTAPIAccount from './accounts';
import WOTAPITanks from './tanks';

export default class WOTAPI extends WOTAPI_default {
    public accounts: WOTAPIAccount;
    public tanks: WOTAPITanks;
    constructor(appID: string, server: string = 'eu') {
        super(appID, server);
        this.accounts = new WOTAPIAccount(appID, server);
        this.tanks = new WOTAPITanks(appID, server);
    }
}
