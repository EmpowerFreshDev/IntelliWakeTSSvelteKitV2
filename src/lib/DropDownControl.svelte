<script lang='ts'>
	import {CleanNumbers, CleanSubtractNumbers, PickProperty} from '@solidbasisventures/intelliwaketsfoundation'
	import {slide} from 'svelte/transition'
	import {onMount, tick} from 'svelte'
	import type {TChatBubblePosition, TDropDownControlDrop, TDropDownControlPosition} from './Definitions'
	import ChatBubble from '$lib/ChatBubble.svelte'

	export let show = false
	export let manualShowHide = false
	export let allowOutsideClose = true
	export let position: TDropDownControlPosition = null
	export let drop: TDropDownControlDrop = null
	export let sameSize = false
	export let controlClass = ''
	export let toggleClass = ''
	export let bodyClass = ''
	export let noScroll = false
	export let fullBlock = false
	export let bubble = false
	export let verbose = false
	export let resizeTS = 1
	export let elFocus: HTMLElement | null = null
	export let zIndex = 40
	export let openingDown = true
	export let disabled = false
	export let index = 0
	export let parentDivElement: HTMLDivElement | null = null
	export let hidden = false

	let pointerPosition: TChatBubblePosition = 'Top'

	let showThis = false

	async function doShow() {
		if (!manualShowHide && !disabled) {
			showThis = true
			await tick()
			show = !show
		}
	}

	const onClick = async () => {
		if (showThis) {
			showThis = false
		} else if (show && (allowOutsideClose || !manualShowHide)) {
			show = false
		}
	}

	const keyDown = async (e: KeyboardEvent) => {
		await tick()

		if (show && (allowOutsideClose || !manualShowHide)) {
			e.stopPropagation()

			switch (e.key) {
				case 'Escape':
					show = false
					e.preventDefault()
					break
				case 'Tab':
					show = false
					break
			}
		}
	}

	const toggleKeyDown = async (e: KeyboardEvent) => {
		await tick()

		if (!show && (allowOutsideClose || !manualShowHide)) {
			e.stopPropagation()

			switch (e.key) {
				case 'Space':
				case 'Enter':
					if (!disabled || show) {
						show = !show
					}
					e.preventDefault()
					break
			}
		}
	}

	let divToggle: HTMLDivElement
	$: dialogParent = divToggle?.closest('.dialogFrame') satisfies HTMLDialogElement | null | undefined

	let windowW: number
	let windowH: number
	let toggleW: number

	let bodyStyle: string | null = null

	function resizeEvent(isShow: boolean, togg: HTMLDivElement | null | undefined, dial: HTMLDialogElement | null | undefined, wW: number, wH: number) {
		const toggleRect = togg?.getBoundingClientRect()
		const dialogRect = dial?.getBoundingClientRect()
		if (toggleRect) {
			const rect = PickProperty(toggleRect, 'x', 'y', 'width', 'height')

			// Fixed items in dialogs are offset by the position of the dialog
			if (dialogRect) {
				rect.x -= dialogRect.x
				rect.y -= dialogRect.y
			}

			if (toggleRect) {
				openingDown = drop === 'Down' || (drop === null && rect.y < (wH * 0.65))
			}

			if (!isShow) {
				bodyStyle = null
			} else {
				if (toggleRect) {
					const newStyle: string[] = []
					if (position === 'CenterForce' || (position === 'Center' && rect.x > rect.width && (wW - rect.x - rect.width) > rect.width)) {
						newStyle.push(`left: ${CleanNumbers(2, rect.x, rect.width * 0.5)}px`)
						newStyle.push(`transform: translateX(-50%)`)
						newStyle.push(`max-width: ${wW}px`)
					} else if (position === 'Left' || (position !== 'Right' && rect.x < (wW * 0.5))) {
						newStyle.push(`left: ${CleanNumbers(2, rect.x)}px`)
						newStyle.push(`max-width: ${wW - rect.x}px`)
					} else {
						newStyle.push(`right: ${CleanNumbers(2, rect.x * -1, rect.width * -1, wW)}px`)
						newStyle.push(`max-width: ${CleanNumbers(2, rect.x, rect.width)}px`)
					}
					if (drop === 'Down' || (drop === null && rect.y < (wH * 0.65))) {
						pointerPosition = 'Top'
						newStyle.push(`top: ${CleanNumbers(2, rect.y, rect.height, 3)}px`)
						const maxHeight = !dialogRect ?
							CleanSubtractNumbers(2, wH, rect.y, rect.height, 3, 20) :
							CleanSubtractNumbers(2, dialogRect.height, rect.y, rect.height, 3, 20)
						newStyle.push(`max-height: ${maxHeight}px`)
					} else {
						pointerPosition = 'Bottom'
						newStyle.push(`bottom: ${CleanNumbers(2, rect.y * -1, 3, wH)}px`)
						newStyle.push(`max-height: ${CleanSubtractNumbers(2, rect.y, 3, 20)}px`)
					}

					if (sameSize && toggleW) {
						newStyle.push(`width: ${toggleW}px`)
					}

					newStyle.push(`z-index: ${zIndex}`)

					bodyStyle = newStyle.join('; ') + ';'
				}
			}
		}
	}

	$: resizeTS, resizeEvent(show, divToggle, dialogParent, windowW, windowH)

	function getScrollParent(node: HTMLElement) {
		const regex = /(auto|scroll)/
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const parents = (node: any, ps: HTMLElement[]): HTMLElement[] => {
			if (!node.parentNode) {
				return ps
			}
			return parents(node.parentNode, ps.concat([node]))
		}

		// noinspection TypeScriptValidateTypes
		const style = (node: HTMLElement, prop: string) => getComputedStyle(node, null).getPropertyValue(prop)
		const overflow = (node: HTMLElement) => style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x')
		const scroll = (node: HTMLElement) => regex.test(overflow(node))

		/* eslint-disable consistent-return */
		const scrollParent = (node: any) => {
			if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
				return null
			}

			const ps = parents(node.parentNode, [])

			if (!ps) return null

			for (let i = 0; i < ps.length; i += 1) {
				if (scroll(ps[i])) {
					return ps[i]
				}
			}

			return null // document.scrollingElement || document.documentElement
		}

		return scrollParent(node)
		/* eslint-enable consistent-return */
	}

	onMount(() => {
		const parentScrolls: HTMLElement[] = []
		{
			let nextParentScroll = getScrollParent(divToggle)
			let found = 0

			while (nextParentScroll) {
				if (found > 5) break
				found++
				parentScrolls.push(nextParentScroll)
				nextParentScroll = getScrollParent(nextParentScroll)
			}
		}

		function doResize() {
			resizeEvent(show, divToggle, dialogParent, windowW, windowH)
		}

		parentScrolls.forEach(parentScroll => parentScroll.addEventListener('scroll', doResize))

		return () => {
			parentScrolls.forEach(parentScroll => parentScroll.removeEventListener('scroll', doResize))
		}
	})

	$: useControlClass = `${hidden ? 'hidden' : !fullBlock ? 'inline-block' : ''} ${controlClass ?? ''}`.trim()
	$: useToggleClass = `${!fullBlock ? 'inline-block' : ''} ${toggleClass ?? ''}`.trim()

	$: verbose && console.info('Show', show)

	$: show && elFocus && elFocus?.focus()

</script>

<svelte:window on:keydown={keyDown}
               on:click={onClick}
               bind:innerWidth={windowW}
               bind:innerHeight={windowH}/>

<div class={useControlClass}
	 bind:this={parentDivElement}
     role="button"
     tabindex={-1}
     on:blur
     on:keydown
     on:keypress
     on:focusin
     on:focusout
     on:keyup
     on:click>
	<div class={useToggleClass}
	     role="button"
	     tabindex={index}
	     bind:this={divToggle}
	     aria-expanded={show}
	     bind:clientWidth={toggleW}
	     aria-haspopup='true'
	     on:click={doShow}
	     on:keydown={toggleKeyDown}>
		<slot name='toggle'/>
	</div>
	{#if bodyStyle}
		<div class='fixed inline-block rounded focus:outline-none text-sm text-left {bodyClass}'
		     class:shadow-lg={!bubble}
		     class:bg-white={!bubble}
		     class:p-1={bubble}
		     class:dark:border-slate-500={!bubble}
		     class:dark:bg-slate-500={!bubble}
		     class:border={!bubble}
		     class:ring-1={!bubble}
		     class:ring-black={!bubble}
		     class:ring-opacity-5={!bubble}
		     class:overflow-y-auto={!noScroll && !bubble}
		     class:overflow-hidden={noScroll || !!bubble}
		     transition:slide={{duration: 200}}
		     role='menu'
		     aria-orientation='vertical'
		     tabindex={-1}
		     style={bodyStyle}
		     on:click|stopPropagation
		     on:keydown|stopPropagation>
			{#if bubble}
				<ChatBubble {pointerPosition}>
					<slot name='body'/>
				</ChatBubble>
			{:else}
				<slot name='body'/>
			{/if}
		</div>
	{/if}
</div>
