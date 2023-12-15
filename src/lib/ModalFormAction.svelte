<script lang='ts'>
	import {createEventDispatcher, tick} from 'svelte'
	import Fa from 'svelte-fa/src/fa.svelte'
	import {faTimes} from '@fortawesome/free-solid-svg-icons'
	import ActivityOverlay from './ActivityOverlay.svelte'
	import type {TEnhanceOptions} from './FormEnhance'
	import {FormEnhance} from './FormEnhance.js'
	import {enhance} from '$app/forms'

	export let action: string
	export let formEnhance: TEnhanceOptions | null | undefined = undefined
	export let show: unknown = false
	export let noShowValue: unknown = false
	export let width = '40em'
	export let cancelButton: string | false = 'Cancel'
	export let okButton: string | false = 'OK'
	export let okDisabled = false
	export let noCloseOnOK = false
	export let overflowVisible = false
	export let disable = false
	export let marginForStickyHeader = false

	const dispatch = createEventDispatcher()

	const cancelAction = async () => {
		if (show !== noShowValue && !disable) {
			await tick()
			dispatch('cancel')
			dispatch('close')
			show = noShowValue
		}
	}

	$: useEnhance = (!formEnhance ? {
		onStart: () => {
			disable = true
			if (formEnhance?.onStart) formEnhance.onStart()
		},
		onEnd: () => {
			disable = false
			if (formEnhance?.onEnd) formEnhance.onEnd()
		},
		onSuccess: async () => {
			await tick()
			dispatch('close')
			show = noShowValue
		}
	} : {
		...formEnhance,
		onStart: () => {
			disable = true
			if (formEnhance?.onStart) formEnhance.onStart()
		},
		onEnd: () => {
			disable = false
			if (formEnhance?.onEnd) formEnhance.onEnd()
		},
		onSuccess: async (data: any, originalAction: string) => {
			await tick()

			if (formEnhance?.onSuccess) formEnhance.onSuccess(data, originalAction)

			if (!noCloseOnOK) {
				dispatch('close')
				show = noShowValue
			}
		}
	}) satisfies TEnhanceOptions

	let dialogElement: HTMLDialogElement

	let isShowing = false
	let x = 0
	let y = 0
	const changeIsShowing = (isShow: any, isNoShowValue: any) => {
		if (!isShowing) {
			x = 0
			y = 0
		}

		if (dialogElement) {
			if (isShow !== isNoShowValue) {
				if (!isShowing) {
					isShowing = true
					dialogElement.showModal()
				}
			} else {
				if (isShowing) {
					isShowing = false
					dialogElement.close()
				}
			}
		}
	}
	$: changeIsShowing(show, noShowValue)

	let isMouseDown = false

	const doMouseDown = () => isMouseDown = true
	const doMouseUp = () => isMouseDown = false

	const doMouseMove = (e: MouseEvent) => {
		if (isMouseDown) {
			x += e.movementX
			y += e.movementY
		}
	}

</script>

<!-- <svelte:window on:IsProcessing={() => disable = true}
               on:NotProcessing={() => disable = false}
               on:mouseup={doMouseUp}
               on:mousemove={doMouseMove}/> -->
<svelte:window on:mouseup={doMouseUp} on:mousemove={doMouseMove}/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog class='bg-white drop-shadow-xl shadow-xl rounded-lg w-full p-0 max-w-full
			   dark:bg-slate-600 dark:text-white overflow-visible'
        class:overflow-y-visible={overflowVisible}
        class:overflow-hidden={!overflowVisible}
        style:transform='translate({x}px,{y}px) scale({isShowing ? 1 : 0.9})'
        on:click={cancelAction}
        style:max-width={width}
        bind:this={dialogElement}
        on:close={cancelAction}>

	<form class='grid grid-rows-[auto_1fr_auto] max-h-[90vh]'
	      method='POST'
	      {action}
	      use:enhance={() => FormEnhance(useEnhance)}
	      class:overflow-y-visible={overflowVisible}
	      class:overflow-hidden={!overflowVisible}
	      on:click|stopPropagation={() => {}}>
		<h4 class='bg-primary-main dark:bg-primary-face text-white py-2 px-4 select-none mb-0
		           rounded-t-lg'
		    class:cursor-grab={isMouseDown}
		    on:mousedown={doMouseDown}>
			{#if $$slots.header}
				<div class='grid grid-cols-[1fr_auto]'>
					<slot name='header'/>
					<button type='button'
					        class='float-right btnLink text-white !py-0'
					        on:click|stopPropagation={cancelAction}>
						<Fa icon={faTimes}
						    class='text-white'/>
					</button>
				</div>
			{/if}
		</h4>
		<fieldset class='px-4 pb-6'
		          class:pt-3={!marginForStickyHeader}
		          class:mt-3={marginForStickyHeader}
		          disabled={disable}
		          class:overflow-y-auto={!overflowVisible}
		          class:overflow-y-visible={overflowVisible}>
			<ActivityOverlay show={disable} size='2em'/>
			{#if $$slots.body}
				<slot name='body'/>
			{/if}
		</fieldset>
		<fieldset class='grid grid-cols-[auto_auto] border-t border-t-slate-200 dark:border-t-slate-700 px-4 py-2'
		          disabled={disable}>
			{#if !!cancelButton || !!okButton}
				<div>
					{#if !!cancelButton}
						<button type='button'
						        class='btnClean bg-transparent hover:bg-transparent shadow-none text-slate-500 hover:text-slate-700 dark:text-slate-300 pl-0'
						        on:click|stopPropagation={cancelAction}>
							{cancelButton}
						</button>
					{/if}
					<slot name='leftFooter'/>
				</div>
				<div class='text-right'>
					<slot name='rightFooter'/>
					{#if !!okButton}
						<button class='shadow-none'
						        disabled={okDisabled}>
							{okButton}
						</button>
					{/if}
				</div>
			{/if}
		</fieldset>
	</form>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.4);
		/*animation: fade-in 0.5s;*/
	}

	dialog {
		animation: fade-in 0.3s;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			scale: 0.9;
		}
		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
