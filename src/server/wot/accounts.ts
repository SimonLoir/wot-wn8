import WOTAPI_default from './api';

export default class WOTAPIAccount extends WOTAPI_default {
    public async search(player_name: string): Promise<wot_player_search> {
        return;
    }
}
