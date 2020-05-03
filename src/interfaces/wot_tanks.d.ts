declare interface wot_available_tanks {
    [tank_id: string]: {
        images: {
            small_icon: string;
        };
        name: string;
        tank_id: number;
    };
}
