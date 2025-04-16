import { CleanNumber, isNullUndefined } from '@empowerfresh/intelliwake';
/**
 * Converts the given hue, saturation, and lightness values to a display color style string.
 *
 * @param {number | null | undefined} hue - The hue value.
 * @param {number | null | undefined} saturation - The saturation value.
 * @param {number | null | undefined} lightness - The lightness value.
 * @param {TDisplayColorStyleOptions} [options] - The options to customize the display color style.
 * @returns {string | undefined} - The display color style string, or undefined if the values are invalid.
 */
export var DisplayColorStyle = function (hue, saturation, lightness, options) {
    var _a, _b, _c, _d, _e;
    if (isNullUndefined(hue) || isNullUndefined(saturation) || isNullUndefined(lightness)) {
        return undefined;
    }
    return "".concat((_a = options === null || options === void 0 ? void 0 : options.prefix) !== null && _a !== void 0 ? _a : '', " hsla(").concat(hue, ", ").concat(CleanNumber(saturation, 0) * ((_b = options === null || options === void 0 ? void 0 : options.saturationPercent) !== null && _b !== void 0 ? _b : 1), "%, ").concat(CleanNumber(lightness, 0) * ((_c = options === null || options === void 0 ? void 0 : options.lightnessPercent) !== null && _c !== void 0 ? _c : 1), "%, ").concat((_d = options === null || options === void 0 ? void 0 : options.alpha) !== null && _d !== void 0 ? _d : 1, ") ").concat((_e = options === null || options === void 0 ? void 0 : options.suffix) !== null && _e !== void 0 ? _e : '');
};
