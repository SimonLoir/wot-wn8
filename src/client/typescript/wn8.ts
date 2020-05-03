export function computeWN8(
    damage_dealt: number,
    spotted: number,
    frags: number,
    dropped_capture_points: number,
    wins: number,
    draws: number,
    losses: number,
    expected: any,
    battles: number
) {
    const avg_damages = damage_dealt / battles;
    const avg_spot = spotted / battles;
    const avg_frag = frags / battles;
    const avg_def = dropped_capture_points / battles;
    const avg_win_rate = (100 * wins) / (wins + draws + losses);

    const r_damages = avg_damages / expected.expDamage;
    const r_spot = avg_spot / expected.expSpot;
    const r_frag = avg_frag / expected.expFrag;
    const r_def = avg_def / expected.expDef;
    const r_win_rate = avg_win_rate / expected.expWinRate;

    return wn8(r_damages, r_spot, r_frag, r_def, r_win_rate);
}

export function wn8(
    r_damages: number,
    r_spot: number,
    r_frag: number,
    r_def: number,
    r_win_rate: number
) {
    const r_win_c = Math.max(0, (r_win_rate - 0.71) / (1 - 0.71));
    const r_damages_c = Math.max(0, (r_damages - 0.22) / (1 - 0.22));
    const r_frag_c = Math.max(
        0,
        Math.min(r_damages_c + 0.2, (r_frag - 0.12) / (1 - 0.12))
    );
    const r_spot_c = Math.max(
        0,
        Math.min(r_damages_c + 0.1, (r_spot - 0.38) / (1 - 0.38))
    );
    const r_def_c = Math.max(
        0,
        Math.min(r_damages_c + 0.1, (r_def - 0.1) / (1 - 0.1))
    );

    return (
        980 * r_damages_c +
        210 * r_damages_c * r_frag_c +
        155 * r_frag_c * r_spot_c +
        75 * r_def_c * r_frag_c +
        145 * Math.min(1.8, r_win_c)
    );
}
