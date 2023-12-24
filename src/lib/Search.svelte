<script lang='ts'>
	import {selectOnFocus} from './Functions'
	import {type ActionArray, useActions} from '$lib/useActions'
	import {createEventDispatcher} from 'svelte'

	export let id: string | undefined = undefined
	export let value = ''
	export let use: ActionArray = []
	export let delayMS = 500
	export let placeholder = 'Search'
	export let bordered = false
	export let element: HTMLInputElement | undefined = undefined

	const dispatch = createEventDispatcher()

	let nowValue: string | undefined

	const setNowValue = (loadValue: string) => {
		if (nowValue === undefined || nowValue !== loadValue) {
			nowValue = loadValue
		}
	}

	$: setNowValue(value)

	let delayTimeout = setTimeout(() => 0, 100)

	const triggerChange = (nextValue: string | undefined, delay: number) => {
		clearTimeout(delayTimeout)
		delayTimeout = setTimeout(() => {
			if (value !== nextValue) {
				value = nextValue ?? ''
				dispatch('change', value)
			}
		}, delay)
	}

	$: !!delayMS && triggerChange(nowValue, delayMS)

	const keypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault()

			triggerChange(nowValue, 1)
		}
	}

</script>

<input type='search'
       {id}
       use:useActions={use}
       use:selectOnFocus
       bind:this={element}
       {placeholder}
       bind:value={nowValue}
       class:!border-transparent={!bordered}
       class:print:hidden={!value}
       {...$$restProps}
       on:keydown={keypress}
       on:blur={() => triggerChange(nowValue, 1)}/>
