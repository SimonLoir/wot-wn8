declare interface wot_player_info {
    status: string;
    meta: { count: number };
    data: {
        [player_id: string]: wot_player_info_player;
    };
}

declare interface wot_player_info_player {
    client_language: string;
    last_battle_time: number;
    account_id: number;
    created_at: number;
    updated_at: number;
    private?: any;
    global_rating: number;
    clan_id?: any;
    statistics: wot_player_info_statistics;
    nickname: string;
    logout_at: number;
}

declare interface wot_player_info_statistics {
    clan: wot_stats;
    all: wot_stats;
    regular_team: wot_stats;
    trees_cut: number;
    company: wot_stats;
    stronghold_skirmish: wot_stats;
    stronghold_defense: wot_stats;
    historical: wot_stats;
    team: wot_stats;
    frags?: any;
}
