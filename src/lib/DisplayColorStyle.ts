import {CleanNumber, isNullUndefined} from '@solidbasisventures/intelliwaketsfoundation'

/**
 * Options for specifying display color style.
 *
 * @typedef {Object} TDisplayColorStyleOptions
 * @property {string} [prefix] - The prefix to be added to the color.
 * @property {string} [suffix] - The suffix to be added to the color.
 * @property {number} [saturationPercent] - The saturation level of the color (between 0 and 1).
 * @property {number} [lightnessPercent] - The lightness level of the color (between 0 and 1).
 * @property {number} [alpha] - The alpha value of the color (between 0 and 1).
 */
export type TDisplayColorStyleOptions = {
	prefix?: string
	suffix?: string
	/** 0-1 */
	saturationPercent?: number
	/** 0-1 */
	lightnessPercent?: number
	/** 0-1 */
	alpha?: number
}

/**
 * Converts the given hue, saturation, and lightness values to a display color style string.
 *
 * @param {number | null | undefined} hue - The hue value.
 * @param {number | null | undefined} saturation - The saturation value.
 * @param {number | null | undefined} lightness - The lightness value.
 * @param {TDisplayColorStyleOptions} [options] - The options to customize the display color style.
 * @returns {string | undefined} - The display color style string, or undefined if the values are invalid.
 */
export const DisplayColorStyle = (hue: number | null | undefined, saturation: number | null | undefined, lightness: number | null | undefined,
                                  options?: TDisplayColorStyleOptions): string | undefined => {
	if (isNullUndefined(hue) || isNullUndefined(saturation) || isNullUndefined(lightness)) {
		return undefined
	}

	return `${options?.prefix ?? ''} hsla(${hue}, ${CleanNumber(saturation, 0) * (options?.saturationPercent ?? 1)}%, ${CleanNumber(lightness, 0) * (options?.lightnessPercent ?? 1)}%, ${options?.alpha ?? 1}) ${options?.suffix ?? ''}`
}
