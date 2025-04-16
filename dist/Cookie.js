// ----------------------------
//   Cookie Manager
// ----------------------------
import { env } from '$env/dynamic/public';
import { IsOn } from "@empowerfresh/intelliwake";
export function CookieCreate(name, value, days) {
    name = name.replace(/=/g, '');
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = "".concat(name, "=").concat(value).concat(expires, "; path=/");
}
export function CookieReadOld(name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    name = name.replace(/=/g, '');
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return defaultValue;
}
export function CookieRead(name, defaultValue) {
    var _a, _b, _c;
    if (defaultValue === void 0) { defaultValue = null; }
    return IsOn(env.SSR) ? null : (_c = (_b = (_a = document.cookie
        .split(';')
        .find(function (row) { return row.trim()
        .startsWith("".concat(name, "=")); })) === null || _a === void 0 ? void 0 : _a.split('=')[1]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : defaultValue;
}
export function CookieErase(name) {
    CookieCreate(name, '', -1);
}
