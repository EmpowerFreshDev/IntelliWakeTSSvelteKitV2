<script lang='ts'>
	import type {IMessageBoxStore} from './Definitions'
	import {ShowMessageBox} from './Definitions'
	import {fade, fly} from 'svelte/transition'
	import {DateCompare} from '@solidbasisventures/intelliwaketsfoundation'
	import Fa from 'svelte-fa/src/fa.svelte'
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
		 role="button"
		 tabindex={-1}
	     on:click={() => hideMessageBox(messageBox)}
	     on:keypress={() => hideMessageBox(messageBox)}>
		<div class='bg-blue-300 text-blue-600 flex justify-center items-center'>
			<Fa icon={faCircleInfo} class='inline-block'/>
		</div>
		<div class='py-1 px-2'>
			{messageBox.message}
		</div>
		<div class='text-center pt-1'>
			<Fa icon={faTimes} class='inline-block'/>
		</div>
	</div>
{/each}
