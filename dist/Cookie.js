// ----------------------------
//   Cookie Manager
// ----------------------------
import { env } from '$env/dynamic/public';
import { IsOn } from "@empowerfresh/intelliwake";
export function CookieCreate(name, value, days) {
    name = name.replace(/=/g, '');
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}
export function CookieReadOld(name, defaultValue = null) {
    name = name.replace(/=/g, '');
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return defaultValue;
}
export function CookieRead(name, defaultValue = null) {
    return IsOn(env.SSR) ? null : document.cookie
        .split(';')
        .find((row) => row.trim()
        .startsWith(`${name}=`))?.split('=')[1]?.trim() ?? defaultValue;
}
export function CookieErase(name) {
    CookieCreate(name, '', -1);
}
