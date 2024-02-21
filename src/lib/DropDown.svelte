<script lang='ts'>
	import DropDownControl from '$lib/DropDownControl.svelte'
	import {tick} from 'svelte'
	import type {IDDAction, TDropDownControlPosition} from './Definitions'
	import {goto} from '$app/navigation'
	import Icon from '$lib/Icon.svelte'

	export let show = false
	export let position: TDropDownControlPosition = null
	export let ddActions: IDDAction[] = []
	export let noCaret = false
	export let buttonTitle: string | null = null
	export let buttonClass: string | undefined = undefined
	export let controlClass: string | undefined = undefined
	export let inputControl = false
	export let fullBlock = false
	export let bodyClass = ''
	export let sameSize = false
	export let zIndex = 40
	export let openingDown = true
	export let disabled = false
	export let hidden = false

	const refs: HTMLElement[] = []

	let keystrokeSelectIndex: number | null = null

	let visibleDDActions: IDDAction[]
	$: visibleDDActions = ddActions
		.filter(ddAction => !ddAction.hidden)
		.map((ddAction, idx) => ({
			...ddAction,
			active: (keystrokeSelectIndex === null) ? ddAction.active : (idx === keystrokeSelectIndex)
		}))

	function setKeystrokeSelectIndex(idx: number | null) {
		keystrokeSelectIndex = idx
	}

	$: show, setKeystrokeSelectIndex(null)

	const keyDownButton = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				if (!show) {
					e.stopPropagation()
					e.preventDefault()
					show = true
				}
				break
		}
	}

	const keyDownMenu = (e: KeyboardEvent) => {
		if (show && visibleDDActions.length) {
			switch (e.key) {
				case 'ArrowDown':
					e.stopPropagation()
					e.preventDefault()

					if (keystrokeSelectIndex === null) {
						keystrokeSelectIndex = (visibleDDActions.findIndex(act => act.active) ?? -1) + 1
					} else if (keystrokeSelectIndex >= visibleDDActions.length - 1) {
						keystrokeSelectIndex = 0
					} else {
						keystrokeSelectIndex++
					}

					if (keystrokeSelectIndex >= visibleDDActions.length) {
						keystrokeSelectIndex = 0
					}

					break
				case 'ArrowUp':
					e.stopPropagation()
					e.preventDefault()

					if (keystrokeSelectIndex === null) {
						keystrokeSelectIndex = (visibleDDActions.findIndex(act => act.active) ?? (visibleDDActions.length - 1)) - 1
					} else if (!keystrokeSelectIndex) {
						keystrokeSelectIndex = visibleDDActions.length - 1
					} else {
						keystrokeSelectIndex--
					}

					if (keystrokeSelectIndex < 0) {
						keystrokeSelectIndex = visibleDDActions.length - 1
					}

					break
				case 'Tab':
					show = false

					break
				case 'Enter':
					if (show && keystrokeSelectIndex !== null) {
						const ddAction = visibleDDActions[keystrokeSelectIndex]
						if (ddAction && ddAction.action) {
							e.stopPropagation()
							e.preventDefault()

							ddAction.action()
							if (!ddAction.noCloseMenu) {
								show = false
							}
						} else if (ddAction && ddAction.href) {
							e.stopPropagation()
							e.preventDefault()

							if (!ddAction.noCloseMenu) {
								show = false
							}
							goto(ddAction.href, {replaceState: ddAction.hrefReplace})
						}
					}
					break
				default:
					if (e.key.match(/^[0-9a-z]+$/)) {
						const idx = visibleDDActions.findIndex(act => (act.title ?? '').toLowerCase().startsWith(e.key.toLowerCase()))
						if (idx > -1) {
							e.stopPropagation()
							e.preventDefault()

							keystrokeSelectIndex = idx
						}
					}
					break
			}
		}
	}

	const performAction = (ddAction: IDDAction) => {
		if (show && !ddAction.disabled) {
			if (ddAction.action) {
				ddAction.action()
				if (!ddAction.noCloseMenu) {
					show = false
				}
			} else if (ddAction.href) {
				if (!ddAction.noCloseMenu) {
					show = false
				}
				goto(ddAction.href, {replaceState: ddAction.hrefReplace})
			}
		}
	}

	const performAlternateAction = (ddAction: IDDAction) => {
		if (show && !ddAction.disabled && !!ddAction.alternateAction) {
			ddAction.alternateAction()
			if (!ddAction.alternateNoClose) {
				show = false
			}
		}
	}

	const scrollToActive = async () => {
		await tick()

		const idx = ddActions.findIndex((ddAction) => !ddAction.hidden && ddAction.active)

		if (idx >= 0 && !!refs[idx]) {
			refs[idx].scrollIntoView()
		}
	}

	$: show, scrollToActive()

	$: indentsExist = ddActions.some((ddAction) => ddAction.active && ddAction.indented)

</script>

<DropDownControl bind:show
                 bind:position
                 {fullBlock}
                 {controlClass}
                 {bodyClass}
                 {sameSize}
                 {zIndex}
                 {hidden}
                 bind:openingDown
                 toggleClass={controlClass}
                 on:keydown={keyDownMenu}
                 bind:disabled>
	<button
		{disabled}
		type='button'
		slot='toggle'
		class:inline-block={!fullBlock}
		class:w-full={fullBlock}
		class:text-left={fullBlock}
		class:noOutline={true}
		class={buttonClass ?? ''}
		class:btnClean={inputControl}
		class:inputControl
		aria-expanded={show}
		aria-haspopup='true'
		on:keydown={keyDownButton}
		tabindex={0}>
		<slot name='button'/>
		{buttonTitle ?? ''}
		{#if !noCaret}
			<svg
				class='-mr-1 h-5 w-5 mt-0.5 inline-block float-right'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 20 20'
				fill='currentColor'
				aria-hidden='true'
				style={openingDown ? 'rotate: 0deg;' : 'rotate: 180deg;'}
			>
				<path
					fill-rule='evenodd'
					d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
					clip-rule='evenodd'
				/>
			</svg>
		{/if}
	</button>
	<svelte:fragment slot='body'>
		<slot name='actions'/>
		{#each visibleDDActions as ddAction, i (ddAction)}
			{@const isDisabled = ddAction.disabled || (!ddAction.action && !ddAction.href)}
			{#if !!ddAction.header}
				<div
					role='menuitem'
					tabindex='-1'
					class='px-2 py-2 whitespace-nowrap font-bold rounded-none'
				>
					{ddAction.title}
				</div>
			{:else if !!ddAction.divider}
				<hr/>
			{:else}
				{#if !!ddAction.dividerGroup && i > 0 && visibleDDActions[i - 1].dividerGroup !== ddAction.dividerGroup}
					<hr/>
				{/if}
				{#if !!ddAction.headerGroup && (i === 0 || visibleDDActions[i - 1].headerGroup !== ddAction.headerGroup)}
					<div
						role='menuitem'
						tabindex='-1'
						class='px-2 py-2 whitespace-nowrap font-bold rounded-none'
					>
						{ddAction.headerGroup}
					</div>
				{/if}
				<div
					role='menuitem'
					class='group rounded-none overflow-hidden grid grid-cols-[1fr,auto]'
					class:pl-6={ddAction.indented}
					class:font-bold={indentsExist && !ddAction.indented}
					class:text-slate-300={isDisabled}
					class:cursor-pointer={!isDisabled}
					class:text-white={ddAction.active}
					class:bg-primary-main={ddAction.active}
					bind:this={refs[i]}>
					<div
						tabindex={-1}
						role='button'
						class='px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap'
						on:click={() => performAction(ddAction)}
						on:keypress={() => performAction(ddAction)}
						class:group-hover:bg-primary-main={ddAction.active}
						class:group-hover:!bg-slate-100={!isDisabled}
						class:group-hover:!text-primary-main={!isDisabled}
						class:group-hover:dark:bg-slate-700={!isDisabled}>
						{#if ddAction.faProps}
							<Icon {...ddAction.faProps}
							      class='inline-block mr-1'
							      fw/>
						{/if}
						{ddAction.title ?? ''}
					</div>
					{#if ddAction.alternateAction}
						<div on:click|stopPropagation={() => performAlternateAction(ddAction)}
						     on:keypress|stopPropagation={() => performAlternateAction(ddAction)}
						     tabindex={-1}
						     role='button'
						     class='px-4 py-2'
						     class:group-hover:bg-primary-main={ddAction.active}
						     class:group-hover:!bg-slate-100={!isDisabled}
						     class:group-hover:!text-primary-main={!isDisabled}
						     class:group-hover:dark:bg-slate-700={!isDisabled}>
							{#if ddAction.alternateFAProps}
								<Icon {...ddAction.alternateFAProps}
								      class='inline-block mx-1'
								      fw/>
							{/if}
							{ddAction.alternateTitle ?? ''}
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	</svelte:fragment>
</DropDownControl>
