import { CleanNumber, isNullUndefined } from '@solidbasisventures/intelliwaketsfoundation';
/**
 * Converts the given hue, saturation, and lightness values to a display color style string.
 *
 * @param {number | null | undefined} hue - The hue value.
 * @param {number | null | undefined} saturation - The saturation value.
 * @param {number | null | undefined} lightness - The lightness value.
 * @param {TDisplayColorStyleOptions} [options] - The options to customize the display color style.
 * @returns {string | undefined} - The display color style string, or undefined if the values are invalid.
 */
export const DisplayColorStyle = (hue, saturation, lightness, options) => {
    if (isNullUndefined(hue) || isNullUndefined(saturation) || isNullUndefined(lightness)) {
        return undefined;
    }
    return `${options?.prefix ?? ''} hsla(${hue}, ${CleanNumber(saturation, 0) * (options?.saturationPercent ?? 1)}%, ${CleanNumber(lightness, 0) * (options?.lightnessPercent ?? 1)}%, ${options?.alpha ?? 1}) ${options?.suffix ?? ''}`;
};
