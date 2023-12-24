<script lang='ts'>
	import type {IMessageBoxStore} from './Definitions'
	import {ShowMessageBox} from './Definitions'
	import {fade, fly} from 'svelte/transition'
	import {DateCompare} from '@solidbasisventures/intelliwaketsfoundation'
	import Icon from '$lib/Icon.svelte'
	import {faCircleInfo, faTimes} from '@fortawesome/free-solid-svg-icons'

	setInterval(() => {
		const toClears = $ShowMessageBox.filter(smb => !!smb.dismissAt && DateCompare(smb.dismissAt, 'IsBefore', 'now', 'seconds'))

		if (toClears.length > 0) {
			ShowMessageBox.hide(toClears.map(smb => smb.message ?? ''))
		}

	}, 1000)

	const hideMessageBox = (messageBox: IMessageBoxStore) => {
		ShowMessageBox.hide(messageBox.message)
	}
</script>

{#each $ShowMessageBox as messageBox (messageBox.message)}
	<div class='w-fit max-w-[80vw] mx-auto mb-6 p-0 bg-blue-100 text-black shadow-xl rounded-lg overflow-hidden cursor-pointer pointer-events-auto print:hidden grid grid-cols-[2em_1fr_2em]'
	     in:fly='{{ y: 200, duration: 200 }}'
	     out:fade='{{ duration: 200 }}'
	     role='button'
	     tabindex={-1}
	     on:click={() => hideMessageBox(messageBox)}
	     on:keypress={() => hideMessageBox(messageBox)}>
		<div class='bg-blue-300 text-blue-600 flex justify-center items-center'>
			<svg xmlns='http://www.w3.org/2000/svg'
			     class='inline-block'
			     height='16'
			     width='16'
			     viewBox='0 0 512 512'>
				<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/>
			</svg>
		</div>
		<div class='py-1 px-2'>
			{messageBox.message}
		</div>
		<div class='text-center pt-1'>
			<svg xmlns='http://www.w3.org/2000/svg'
			     class='inline-block'
			     height='16'
			     width='12'
			     viewBox='0 0 384 512'>
				<path
					d='M192 244.7L45.9 98.6 34.6 109.9 180.7 256 34.6 402.1l11.3 11.3L192 267.3 338.1 413.4l11.3-11.3L203.3 256 349.4 109.9 338.1 98.6 192 244.7z'/>
			</svg>
		</div>
	</div>
{/each}
