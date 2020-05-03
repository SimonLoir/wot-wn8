declare interface wot_tanks_stats_request {
    status: string;
    meta: { count: number };
    data: {
        [player_id: string]: wot_tank_stats;
    };
}

declare interface wot_tank_stats {
    clan: wot_stats;
    stronghold_skirmish: wot_stats;
    regular_team: wot_stats;
    account_id: string;
    max_xp: number;
    company: wot_stats;
    all: wot_stats;
    stronghold_defense: wot_stats;
    max_frags: number;
    team: wot_stats;
    globalmap: wot_stats;
    frags?: any;
    mark_of_mastery: number;
    in_garage?: any;
    tank_id: string;
}
