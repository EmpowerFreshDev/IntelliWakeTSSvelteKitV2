<!--
  @component

  This is a Svelte component that shows a bubble with a pointer on one side.
-->

<!--suppress CssUnresolvedCustomProperty -->
<script lang='ts'>
	import type {TChatBubblePosition} from '$lib/Definitions'

	/** The position of the pointer on the chat bubble */
	export let pointerPosition: TChatBubblePosition = 'Top'
	export let shadow = true
	export let borderWidth = 2
	export let pointerHeight = 8
	export let pointerWidthRatio = 0.75
	export let borderRadius = '10px'
	export let backgroundColor = 'white'
	export let borderColor = 'blue'
	export let lrPad = '10px'
	export let tbPad = '5px'

	type TPointer = {
		leftAdjust: string
		rightAdjust: string
		topAdjust: string
		bottomAdjust: string
		rotate: string
		translateX: string
		translateY: string
		leftBorderWidth: string
		rightBorderWidth: string
		topBorderWidth: string
		bottomBorderWidth: string
		leftBorderColor: string
		rightBorderColor: string
		topBorderColor: string
		bottomBorderColor: string
	}

	$: style = (() => {
		function createStyles(pointer: TPointer, isAfter: boolean): string[] {
			const styles: string[] = []

			const prefix = `--pointer${isAfter ? '-after' : '-before'}-`

			styles.push(`${prefix}left-adjust: ${pointer.leftAdjust}`)
			styles.push(`${prefix}right-adjust: ${pointer.rightAdjust}`)
			styles.push(`${prefix}bottom-adjust: ${pointer.bottomAdjust}`)
			styles.push(`${prefix}top-adjust: ${pointer.topAdjust}`)
			styles.push(`${prefix}rotate: ${pointer.rotate}`)
			styles.push(`${prefix}translate-x: ${pointer.translateX}`)
			styles.push(`${prefix}translate-y: ${pointer.translateY}`)
			styles.push(`${prefix}left-border-width: ${pointer.leftBorderWidth}`)
			styles.push(`${prefix}right-border-width: ${pointer.rightBorderWidth}`)
			styles.push(`${prefix}top-border-width: ${pointer.topBorderWidth}`)
			styles.push(`${prefix}bottom-border-width: ${pointer.bottomBorderWidth}`)
			styles.push(`${prefix}left-border-color: ${pointer.leftBorderColor}`)
			styles.push(`${prefix}right-border-color: ${pointer.rightBorderColor}`)
			styles.push(`${prefix}top-border-color: ${pointer.topBorderColor}`)
			styles.push(`${prefix}bottom-border-color: ${pointer.bottomBorderColor}`)

			return styles
		}

		const beforePointer: TPointer = {
			leftAdjust: 'auto',
			rightAdjust: 'auto',
			topAdjust: 'auto',
			bottomAdjust: 'auto',
			rotate: '0deg',
			translateX: '0',
			translateY: '0',
			leftBorderWidth: 'auto',
			rightBorderWidth: 'auto',
			topBorderWidth: 'auto',
			bottomBorderWidth: 'auto',
			leftBorderColor: 'transparent',
			rightBorderColor: 'transparent',
			topBorderColor: 'transparent',
			bottomBorderColor: 'transparent'
		}

		const afterPointer = {...beforePointer}

		switch (pointerPosition as string) {
			case 'Top':
				beforePointer.leftAdjust = `50%`
				beforePointer.translateX = '-50%'
				afterPointer.leftAdjust = `50%`
				afterPointer.translateX = '-50%'
				beforePointer.bottomAdjust = '100%'
				afterPointer.bottomAdjust = '100%'

				beforePointer.leftBorderWidth = `${pointerHeight * pointerWidthRatio}px`
				beforePointer.rightBorderWidth = beforePointer.leftBorderWidth
				beforePointer.bottomBorderWidth = `${pointerHeight + borderWidth}px`
				beforePointer.bottomBorderColor = borderColor
				afterPointer.leftBorderWidth = `${(pointerHeight - borderWidth / pointerWidthRatio) * pointerWidthRatio}px`
				afterPointer.rightBorderWidth = afterPointer.leftBorderWidth
				afterPointer.bottomBorderWidth = `${pointerHeight - (borderWidth * 0.5 / pointerWidthRatio)}px`
				afterPointer.bottomBorderColor = backgroundColor
				break
			case 'Bottom':
				beforePointer.leftAdjust = `50%`
				beforePointer.translateX = '-50%'
				afterPointer.leftAdjust = `50%`
				afterPointer.translateX = '-50%'
				beforePointer.topAdjust = '100%'
				afterPointer.topAdjust = beforePointer.topAdjust
				beforePointer.rotate = '180deg'
				afterPointer.rotate = beforePointer.rotate

				beforePointer.leftBorderWidth = `${pointerHeight * pointerWidthRatio}px`
				beforePointer.rightBorderWidth = beforePointer.leftBorderWidth
				beforePointer.bottomBorderWidth = `${pointerHeight + borderWidth}px`
				beforePointer.bottomBorderColor = borderColor
				afterPointer.leftBorderWidth = `${(pointerHeight - borderWidth / pointerWidthRatio) * pointerWidthRatio}px`
				afterPointer.rightBorderWidth = afterPointer.leftBorderWidth
				afterPointer.bottomBorderWidth = `${pointerHeight - (borderWidth * 0.5 / pointerWidthRatio)}px`
				afterPointer.bottomBorderColor = backgroundColor
				break
			case 'Left':
				beforePointer.topAdjust = `50%`
				beforePointer.translateY = '-50%'
				afterPointer.topAdjust = `50%`
				afterPointer.translateY = '-50%'
				beforePointer.rightAdjust = `calc(100% + ${(pointerHeight - (pointerHeight * pointerWidthRatio)) - (borderWidth / 2)}px)`
				afterPointer.rightAdjust = `calc(100% + ${(pointerHeight - (pointerHeight * pointerWidthRatio)) - (borderWidth * 1.75)}px)`
				beforePointer.rotate = '270deg'
				afterPointer.rotate = beforePointer.rotate

				beforePointer.leftBorderWidth = `${pointerHeight * pointerWidthRatio}px`
				beforePointer.rightBorderWidth = beforePointer.leftBorderWidth
				beforePointer.bottomBorderWidth = `${pointerHeight + borderWidth}px`
				beforePointer.bottomBorderColor = borderColor
				afterPointer.leftBorderWidth = beforePointer.leftBorderWidth
				afterPointer.rightBorderWidth = beforePointer.rightBorderWidth
				afterPointer.bottomBorderWidth = beforePointer.bottomBorderWidth
				afterPointer.bottomBorderColor = backgroundColor
				break
			case 'Right':
				beforePointer.topAdjust = `50%`
				beforePointer.translateY = '-50%'
				afterPointer.topAdjust = `50%`
				afterPointer.translateY = '-50%'
				beforePointer.leftAdjust = `calc(100% + ${(pointerHeight - (pointerHeight * pointerWidthRatio)) - (borderWidth / 2)}px)`
				afterPointer.leftAdjust = `calc(100% + ${(pointerHeight - (pointerHeight * pointerWidthRatio)) - (borderWidth * 1.75)}px)`
				beforePointer.rotate = '90deg'
				afterPointer.rotate = beforePointer.rotate

				beforePointer.leftBorderWidth = `${pointerHeight * pointerWidthRatio}px`
				beforePointer.rightBorderWidth = beforePointer.leftBorderWidth
				beforePointer.bottomBorderWidth = `${pointerHeight + borderWidth}px`
				beforePointer.bottomBorderColor = borderColor
				afterPointer.leftBorderWidth = beforePointer.leftBorderWidth
				afterPointer.rightBorderWidth = beforePointer.rightBorderWidth
				afterPointer.bottomBorderWidth = beforePointer.bottomBorderWidth
				afterPointer.bottomBorderColor = backgroundColor
				break
		}

		const styles = [
			`--bubble-border-size: ${borderWidth}px`,
			`--bubble-border-radius: ${borderRadius}`,
			`--bubble-border-color: ${borderColor}`,
			`--bubble-background-color: ${backgroundColor}`,
			`padding: ${tbPad} ${lrPad}`,
			...createStyles(beforePointer, false),
			...createStyles(afterPointer, true)
		]

		switch (pointerPosition as TPointer) {
			case 'Top':
				styles.push(`margin-top: ${pointerHeight}px`)
				break
			case 'Bottom':
				styles.push(`margin-bottom: ${pointerHeight}px`)
				break
			case 'Left':
				styles.push(`margin-left: ${pointerHeight}px`)
				break
			case 'Right':
				styles.push(`margin-right: ${pointerHeight}px`)
				break
		}

		return styles.join('; ') + ';'
	})()

</script>

<div {style}
     class='chatBubble'
     class:drop-shadow={shadow}>
	<slot/>
</div>

<style>
	.chatBubble {
		position: relative;
		display: inline-block;
		background-color: var(--bubble-background-color);
		border-color: var(--bubble-border-color);
		border-width: var(--bubble-border-width);
		border-style: solid;
		border-radius: var(--bubble-border-radius);
	}

	.chatBubble::before {
		content: '';
		position: absolute;
		left: var(--pointer-before-left-adjust);
		right: var(--pointer-before-right-adjust);
		top: var(--pointer-before-top-adjust);
		bottom: var(--pointer-before-bottom-adjust);
		rotate: var(--pointer-before-rotate);
		translate: var(--pointer-before-translate-x) var(--pointer-before-translate-y);
		width: 0;
		height: 0;
		border-style: solid;
		border-left-width: var(--pointer-before-left-border-width);
		border-right-width: var(--pointer-before-right-border-width);
		border-top-width: var(--pointer-before-top-border-width);
		border-bottom-width: var(--pointer-before-bottom-border-width);
		border-left-color: var(--pointer-before-left-border-color);
		border-right-color: var(--pointer-before-right-border-color);
		border-top-color: var(--pointer-before-top-border-color);
		border-bottom-color: var(--pointer-before-bottom-border-color);
	}

	.chatBubble::after {
		content: '';
		position: absolute;
		left: var(--pointer-after-left-adjust);
		right: var(--pointer-after-right-adjust);
		top: var(--pointer-after-top-adjust);
		bottom: var(--pointer-after-bottom-adjust);
		rotate: var(--pointer-after-rotate);
		translate: var(--pointer-after-translate-x) var(--pointer-after-translate-y);
		width: 0;
		height: 0;
		border-style: solid;
		border-left-width: var(--pointer-after-left-border-width);
		border-right-width: var(--pointer-after-right-border-width);
		border-top-width: var(--pointer-after-top-border-width);
		border-bottom-width: var(--pointer-after-bottom-border-width);
		border-left-color: var(--pointer-after-left-border-color);
		border-right-color: var(--pointer-after-right-border-color);
		border-top-color: var(--pointer-after-top-border-color);
		border-bottom-color: var(--pointer-after-bottom-border-color);
	}
</style>
