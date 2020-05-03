import WOTAPI_default from './api';

export default class WOTAPITanks extends WOTAPI_default {
    public async stats(player_id: string): Promise<wot_tanks_stats_request> {
        return await this.call('tanks/stats', { account_id: player_id });
    }
}
