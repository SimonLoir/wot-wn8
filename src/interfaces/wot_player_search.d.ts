declare interface wot_player_search_meta {
    count: number;
}

declare interface wot_player_search_player {
    nickname: string;
    account_id: number;
}

declare interface wot_player_search {
    status: string;
    meta: wot_player_search_meta;
    data: wot_player_search_player[];
}
