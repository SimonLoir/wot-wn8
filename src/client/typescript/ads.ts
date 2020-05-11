import { ExtJsObject } from './extjs';

export function createAd(parent: ExtJsObject) {
    const el = parent.child('div').addClass('ad');
    el.css('textAlign', 'center');
    el.html(
        ''
        //`<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=8&p=48&l=ur1&category=logiciels&banner=1H8V96R69K5Z2K93T482&f=ifr&linkID=c248a8fb07f27f4a5a4fb5868122e8b6&t=sloir-21&tracking_id=sloir-21" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>`
    );
}
