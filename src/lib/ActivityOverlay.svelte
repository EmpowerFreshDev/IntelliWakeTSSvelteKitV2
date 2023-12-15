<script lang='ts'>
	import {DateCompare, DateParseTS} from '@solidbasisventures/intelliwaketsfoundation'
	import {createEventDispatcher} from 'svelte'

	export let show = true
	export let allowCancelAfterSeconds: number | null = 5
	export let size = '3em'
	export let position: 'fixed' | 'absolute' = 'absolute'
	export let zIndex = 30

	const dispatch = createEventDispatcher()

	let lastShow = DateParseTS('now')

	const setLastShow = () => {
		lastShow = DateParseTS('now')
	}

	$: !!show && setLastShow()

	const attemptCloseShow = () => {
		if (show && allowCancelAfterSeconds !== null && DateCompare(lastShow, 'IsBefore', DateParseTS('now', {seconds: allowCancelAfterSeconds * -1}))) {
			show = false
			dispatch('ManualClose')
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='inset-0 items-center justify-center backdrop-blur-[1px]'
     class:flex={show}
     style='position: {position}; z-index: {zIndex};'
     class:hidden={!show}
     class:pointer-events-none={!show}
     on:click={attemptCloseShow}>
	<div class='!border-b-transparent animate-spin aspect-square border-4 rounded-full border-blue-800 z-50 absolute inset-0 mx-auto my-auto'
	     style:width={size}></div>
</div>
