import WOTAPI_default from './api';

export default class WOTAPIAccount extends WOTAPI_default {
    /**
     * Searches for a player using its nickname
     * @param player_name the name of the player
     */
    public async search(player_name: string): Promise<wot_player_search> {
        return await this.call('account/list', { search: player_name });
    }

    public async info(player_id: string): Promise<wot_player_info> {
        return await this.call('account/info', { account_id: player_id });
    }
}
