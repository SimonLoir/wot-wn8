import { ExtJsObject } from './extjs';

export function createAd(parent: ExtJsObject) {
    const el = parent.child('div').addClass('ad');
    el.css('textAlign', 'center');
    el.html(
        `<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=8&p=48&l=ez&f=ifr&linkID=333e26cce8d73e149e8989fa81c47733&t=sloir-21&tracking_id=sloir-21" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>`
    );
}
