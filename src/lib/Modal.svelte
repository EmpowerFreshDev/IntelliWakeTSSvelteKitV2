<!--
  @component

  This component presents a modal window using the HTML5 dialog element
  @param {any} show A property that determines if the modal should be shown or not
  @param {any} noShowValue A property that, if equal to the show property, will hide the modal, otherwise show the modal
-->

<script lang='ts'>
	import {createEventDispatcher, tick} from 'svelte'
	import ActivityOverlay from './ActivityOverlay.svelte'

	/**  A value equal to the 'noShowValue' or 'false' will have the modal hidden, any other value will show it */
	export let show: unknown = false
	/** The value to compare against to have the modal hidden, default 'false' */
	export let noShowValue: unknown = !show ? show : !show
	export let width = '40em'
	export let cancelButton: string | false = 'Cancel'
	export let okButton: string | false = 'OK'
	export let okActionNotOnEnter = false
	export let okDisabled = false
	export let noCloseOnOK = true
	export let overflowVisible = false
	export let disable = false
	export let okType: 'submit' | 'button' = 'button'
	export let marginForStickyHeader = false
	export let okButtonWrap = false
	let clazz = ''
	export {clazz as class}
	export let classHeader = ''
	export let classButton = ''
	export let borderFooter = true

	export let onOK: () => void = () => {}
	export let onCancel: () => void = () => {}
	export let onClose: () => void = () => {}

	const dispatch = createEventDispatcher()

	let okButtonElement: HTMLButtonElement

	const okAction = async () => {
		if (show !== noShowValue && !okDisabled && !disable) {
			dispatch('ok')
			onOK()
			if (!noCloseOnOK) {
				dispatch('close')
				onClose()
				await tick()
				show = noShowValue
			}
		}
	}

	const cancelAction = async () => {
		if (show !== noShowValue && !disable) {
			dispatch('cancel')
			dispatch('close')
			onCancel()
			onClose()
			await tick()
			show = noShowValue
		}
	}

	const keyDown = (e: KeyboardEvent) => {
		if (show !== noShowValue && !disable) {
			e.stopPropagation()

			switch (e.key) {
				case 'Enter':
					if (!okActionNotOnEnter) {
						if (okButtonElement) {
							okButtonElement.click()
						} else {
							okAction()
							e.preventDefault()
						}
					}
					break
			}
		}
	}

	let dialogElement: HTMLDialogElement

	let isShowing = false
	let x = 0
	let y = 0

	async function changeIsShowing(isShow: unknown, isNoShowValue: unknown) {
		await tick()
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
	let isDialogMouseDown = false

	const doMouseDown = () => isMouseDown = true
	const doMouseUp = () => {
		isMouseDown = false
		setTimeout(() => isDialogMouseDown = false, 100)
	}

	const doMouseMove = (e: MouseEvent) => {
		if (isMouseDown) {
			x += e.movementX
			y += e.movementY
		}
	}

	const dialogMouseDown = () => {
		isDialogMouseDown = true
	}

</script>


<!-- <svelte:window on:IsProcessing={() => disable = true}
               on:NotProcessing={() => disable = false}
               on:mouseup={doMouseUp}
               on:mousemove={doMouseMove}/> -->
<svelte:window on:mouseup={doMouseUp}
               on:mousemove={doMouseMove}/>

<dialog class='bg-white drop-shadow-xl shadow-xl rounded-lg overflow-hidden w-full p-0 max-w-full
			   dark:bg-slate-600 dark:text-white {clazz}'
        class:overflow-y-visible={overflowVisible}
        class:overflow-hidden={!overflowVisible}
        style:transform='translate({x}px,{y}px) scale({isShowing ? 1 : 0.9})'
        on:keydown={keyDown}
        style:max-width={width}
        bind:this={dialogElement}
        on:click={() => {
			if (!isDialogMouseDown) cancelAction()
        }}
        on:close={cancelAction}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class='grid grid-rows-[auto_1fr_auto] max-h-[90vh]'
	     class:overflow-y-visible={overflowVisible}
	     class:overflow-hidden={!overflowVisible}
	     on:mousedown|stopPropagation={dialogMouseDown}
	     on:click|stopPropagation={() => {}}>
		<h4 class='bg-primary-main dark:bg-primary-face text-white py-2 px-4 select-none mb-0 {classHeader}'
		    class:cursor-grab={isMouseDown}
		    on:mousedown={doMouseDown}>
			{#if $$slots.header}
				<div class='grid grid-cols-[1fr_auto]'>
					<slot name='header'/>
					<button class='float-right btnLink text-white !py-0'
					        on:click|stopPropagation={cancelAction}>
						<svg xmlns='http://www.w3.org/2000/svg'
						     height='16'
						     width='12'
						     viewBox='0 0 384 512'>
							<path
								fill='white'
								d='M192 244.7L45.9 98.6 34.6 109.9 180.7 256 34.6 402.1l11.3 11.3L192 267.3 338.1 413.4l11.3-11.3L203.3 256 349.4 109.9 338.1 98.6 192 244.7z'/>
						</svg>
					</button>
				</div>
			{/if}
		</h4>
		<fieldset class='px-4 pb-6'
		          disabled={disable}
		          class:pt-3={!marginForStickyHeader}
		          class:mt-3={marginForStickyHeader}
		          class:overflow-y-auto={!overflowVisible}
		          class:overflow-y-visible={overflowVisible}>
			<ActivityOverlay show={disable}/>
			{#if $$slots.body}
				<slot name='body'/>
			{/if}
		</fieldset>
		{#if !!cancelButton || !!okButton || !!$$slots.leftFooter || !!$$slots.rightFooter}
			<fieldset class='grid grid-cols-[min-content_auto_auto_min-content] border-t-slate-200 dark:border-t-slate-700 px-4 py-2'
			          class:border-t={borderFooter}
			          disabled={disable}>
				<div class='pr-2'>
					{#if !!cancelButton}
						<button type='button'
						        class='btnClean bg-transparent hover:bg-transparent shadow-none text-slate-500 hover:text-slate-700 dark:text-slate-300 pl-0 pt-1'
						        class:whitespace-nowrap={!okButtonWrap}
						        on:click|stopPropagation={cancelAction}>
							{cancelButton}
						</button>
					{/if}
				</div>
				<div>
					<slot name='leftFooter'/>
				</div>
				<div class='text-right'>
					<slot name='rightFooter'/>
				</div>
				<div class='text-right pl-2'>
					{#if !!okButton}
						<button type={okType}
						        class='shadow-none {classButton}'
						        class:whitespace-nowrap={!okButtonWrap}
						        bind:this={okButtonElement}
						        on:click|stopPropagation={okAction}
						        disabled={okDisabled}>
							{okButton}
						</button>
					{/if}
				</div>
			</fieldset>
		{/if}
	</div>
</dialog>

<style>
	/*dialog {
		user-select: none;
		cursor: move;
		position: absolute;
	} */

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
