<script lang='ts'>
	import type {IDDAction} from './Definitions'
	import {tick} from 'svelte'
	import Fa from 'svelte-fa/src/fa.svelte'
	import {slide} from 'svelte/transition'
	import {cubicInOut} from 'svelte/easing'
	import {goto} from '$app/navigation'
	import {type ActionArray, useActions} from '$lib/useActions.js'

	export let ddActions: IDDAction[] = []
	export let use: ActionArray = []
	export let show = false
	export let width = 'auto'
	export let maxHeight: string | null = '60vh'
	export let caret = false
	export let buttonTitle: string | null = null
	export let highlightedIndex = -1

	let doOpen = false

	const refs: HTMLElement[] = []

	let visibleDDActions: IDDAction[]
	$: visibleDDActions = ddActions.filter(ddAction => !ddAction.hidden)

	const closeIfOpen = () => {
		if (show) {
			show = false
		} else if (doOpen) {
			show = true
		}

		doOpen = false
	}

	const clearHighlightedIndex = () => {
		highlightedIndex = -1
	}
	$: !show && clearHighlightedIndex()

	const keyDown = (e: KeyboardEvent) => {
		if (show) {
			e.stopPropagation()

			switch (e.key) {
				case 'Escape':
					closeIfOpen()
					e.preventDefault()
					break
				case 'ArrowDown':
					highlightedIndex = visibleDDActions
						.findIndex((visibleDDAction, idx) => idx > highlightedIndex && !visibleDDAction.disabled && !!visibleDDAction.action)
					if (highlightedIndex < 0) {
						highlightedIndex = visibleDDActions
							.findIndex(visibleDDAction => !visibleDDAction.disabled && !!visibleDDAction.action)
					}
					e.preventDefault()
					break
				case 'ArrowUp':
					highlightedIndex = visibleDDActions
						.reduce<number>((result, visibleDDAction, idx) => idx < highlightedIndex && idx > result && !visibleDDAction.disabled && !!visibleDDAction.action ? idx : result, -1)
					if (highlightedIndex < 0) {
						highlightedIndex = visibleDDActions
							.reduce<number>((result, visibleDDAction, idx) => idx > result && !visibleDDAction.disabled && !!visibleDDAction.action ? idx : result, -1)
					}
					e.preventDefault()
					break
				case 'Enter': {
					const visibleDDAction = visibleDDActions[highlightedIndex ?? -1]
					if (visibleDDAction?.action) {
						visibleDDAction.action()
						if (!visibleDDAction.noCloseMenu) {
							closeIfOpen()
						}
						e.preventDefault()
					} else if (visibleDDAction?.href) {
						if (!visibleDDAction.noCloseMenu) {
							closeIfOpen()
						}
						e.preventDefault()
						goto(visibleDDAction.href, {replaceState: visibleDDAction.hrefReplace})
					}
				}
					break
			}
		}
	}

	const performAction = (e: MouseEvent, ddAction: IDDAction) => {
		if (ddAction.noCloseMenu) {
			e.stopPropagation()
		}
		if (!ddAction.disabled) {
			if (ddAction.action) {
				ddAction.action()
			} else if (ddAction.href) {
				goto(ddAction.href, {replaceState: ddAction.hrefReplace})
			}
		}
	}

	const scrollToActive = async () => {
		await tick()

		const idx = ddActions.findIndex(ddAction => !ddAction.hidden && ddAction.active)

		if (idx >= 0 && !!refs[idx]) {
			refs[idx].scrollIntoView()
		}
	}

	$: !!show && scrollToActive()

	const ddStyle = !maxHeight ? undefined : `max-height: ${maxHeight as string};`

	$: indentsExist = ddActions.some(ddAction => ddAction.active && ddAction.indented)
</script>

<svelte:window on:keydown={keyDown}
               on:click={closeIfOpen}/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='relative min-h-[2rem] transition-all dark:text-white'
     style='width: {width};'
     use:useActions={use}
     hidden={!visibleDDActions.length && !$$slots.actions}>
	<div class='absolute left-0 top-0 right-0 rounded border cursor-pointer w-fit mx-auto
		            select-none bg-transparent transition-all overflow-hidden'
	     class:z-40={show}
	     class:border-transparent={!show}
	     class:dark:border-transparent={!show}
	     class:bg-white={show}
	     class:dark:bg-slate-700={show}
	     class:shadow-lg={show}
	     class:text-black={show}
	     class:dark:text-slate-100={show}
	     class:dark:shadow-none={show}
	     role='button'
	     tabindex={-1}
	     aria-expanded={show}
	     aria-haspopup='true'
	     on:click={() => {if (!show) doOpen = true}}>
		<div class='whitespace-nowrap overflow-ellipsis overflow-hidden w-full px-2 text-center'>
			<slot name='button'/>
			{buttonTitle ?? ''}
			{#if caret}
				<svg class='-mr-1 h-5 w-5 inline-block transition-all'
				     class:rotate-180={show}
				     xmlns='http://www.w3.org/2000/svg'
				     viewBox='0 0 20 20'
				     fill='currentColor'
				     aria-hidden='true'>
					<path fill-rule='evenodd'
					      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
					      clip-rule='evenodd'/>
				</svg>
			{/if}
		</div>
		{#if show}
			<div transition:slide={{easing: cubicInOut, duration: 200}}
			     role='button'
			     tabindex={-1}
			     on:click|stopPropagation={closeIfOpen}>
				<hr class='mx-1'/>
				<div class='overflow-x-hidden pt-1 overflow-y-auto'
				     style={ddStyle}>
					<slot name='actions'/>
					{#each visibleDDActions as ddAction, i}
						{@const isDisabled = ddAction.disabled || (!ddAction.action && !ddAction.href)}
						{#if !!ddAction.header}
							<div role='menuitem'
							     style={ddAction.style}
							     tabindex='-1'
							     class='px-2 py-2 whitespace-nowrap font-bold rounded-none'>
								{ddAction.title}
							</div>
						{:else if !!ddAction.divider}
							<hr/>
						{:else}
							{#if !!ddAction.dividerGroup && (i > 0 && visibleDDActions[i - 1].dividerGroup !== ddAction.dividerGroup)}
								<hr/>
							{/if}
							{#if !!ddAction.headerGroup && (i === 0 || visibleDDActions[i - 1].headerGroup !== ddAction.headerGroup)}
								<div role='menuitem'
								     tabindex='-1'
								     class='px-2 py-2 whitespace-nowrap font-bold rounded-none'>
									{ddAction.headerGroup}
								</div>
							{/if}
							<div role='menuitem'
							     tabindex='-1'
							     class='px-4 py-2 whitespace-nowrap rounded-none'
							     class:pl-6={ddAction.indented}
							     class:font-bold={indentsExist && !ddAction.indented}
							     class:text-slate-300={isDisabled}
							     class:bg-slate-100={i === highlightedIndex}
							     class:dark:bg-slate-600={i === highlightedIndex}
							     class:hover:bg-slate-100={!isDisabled}
							     class:hover:text-primary-main={!isDisabled}
							     class:hover:dark:bg-slate-600={!isDisabled}
							     class:cursor-pointer={!isDisabled}
							     class:text-white={ddAction.active}
							     class:bg-primary-main={ddAction.active}
							     class:hover:bg-primary-main={ddAction.active}
							     style={ddAction.style}
							     on:click={e => performAction(e, ddAction)}
							     bind:this={refs[i]}>
								{#if ddAction.faProps}
									<Fa {...ddAction.faProps}
									    class='inline-block mr-1'
									    fw/>
								{/if}
								{ddAction.title}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
