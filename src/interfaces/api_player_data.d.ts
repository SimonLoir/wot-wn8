declare interface api_player_data {
    player: {
        last_battle_time: number;
        account_id: number;
        created_at: number;
        updated_at: number;
        statistics: {
            all: wot_stats;
        };
        nickname: string;
        logout_at: number;
    };
    tanks_stats: api_tanks_stats[];
}

declare interface api_tanks_stats extends wot_stats {
    tank_id: string;
}
