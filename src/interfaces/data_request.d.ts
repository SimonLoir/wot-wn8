declare interface data_request {
    snapshot: {
        sid: number;
        tank_id: number;
        wn8: number;
    }[];
    tanks: {
        [id: number]: {
            images: { small_icon: string };
            name: string;
            tier: number;
            is_premium: boolean;
        };
    };
    user: {
        avg_xp: number;
        battles: number;
        wn8: number;
        last_check: number;
        last_seen: number;
        user_id: number;
        user_name: string;
    }[];
}
