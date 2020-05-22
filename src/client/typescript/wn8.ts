export function computeWN8(
    avg_damages: number,
    avg_spot: number,
    avg_frag: number,
    avg_def: number,
    avg_win_rate: number,
    expected: {
        IDNum: number;
        expDef: number;
        expFrag: number;
        expSpot: number;
        expDamage: number;
        expWinRate: number;
    }
) {
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

export function getColor(wn8: number, return_rgb = true) {
    let colors: [number, number, number] = [90, 49, 117];
    if (wn8 < 300) colors = [0, 0, 0];
    else if (wn8 < 599) colors = [205, 51, 51];
    else if (wn8 < 899) colors = [215, 121, 0];
    else if (wn8 < 1249) colors = [215, 182, 0];
    else if (wn8 < 1599) colors = [109, 149, 33];
    else if (wn8 < 1899) colors = [76, 118, 46];
    else if (wn8 < 2349) colors = [74, 146, 183];
    else if (wn8 < 2899) colors = [131, 87, 157];
    if (return_rgb) return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    else return colors;
}
