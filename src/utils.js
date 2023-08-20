import { scryptSync } from 'crypto';
import { config } from 'dotenv';
config();
export function getShortid (url) {
    return scryptSync(url, 'salt', 8).toString('hex');
}
export function isUrl(str) {
    try{
        const isUrl = new URL(str);
        if (isUrl.hostname === 'localhost') return false;
        return true;
    } catch(e) {
        return false;
    }
}