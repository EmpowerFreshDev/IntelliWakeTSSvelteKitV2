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
 * Create hsl style
 *
 * @param hue
 * @param saturation
 * @param lightness
 * @param options
 * @constructor
 */
export const DisplayColorStyle = (hue: number | null, saturation: number | null, lightness: number | null,
                                  options?: TDisplayColorStyleOptions): string | undefined => {
	if (hue == null || saturation == null || lightness == null) {
		return undefined
	}

	return `${options?.prefix ?? ''} hsla(${hue}, ${saturation * (options?.saturationPercent ?? 1)}%, ${lightness * (options?.lightnessPercent ?? 1)}%, ${options?.alpha ?? 1}) ${options?.suffix ?? ''}`
}
