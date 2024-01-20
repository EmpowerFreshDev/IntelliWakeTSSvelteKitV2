<script lang='ts'>
	import type {ISpinItem} from '$lib/Definitions'
	import {isNullUndefined, RandomString} from '@solidbasisventures/intelliwaketsfoundation'
	import {browser} from '$app/environment'
	import {onDestroy, onMount, tick} from 'svelte'
	import {type ActionArray, useActions} from '$lib/useActions'

	type T = $$Generic

	export let items: ISpinItem<T>[]
	let clazz = ''
	export {clazz as class}
	export let centered = false
	export let height = '1.25em'
	export let maxHeight = '10em'
	export let value: T | null | undefined = undefined
	export let disabled = false
	export let readonly = false
	export let name: string | undefined = undefined
	export let form: string | undefined = undefined
	export let hidden = false
	export let use: ActionArray = []
	export let show = !value

	export let id = RandomString(6)

	let scroller: HTMLDivElement
	let wasShowing = false

	let observer: ResizeObserver

	function scrollToItem(itemID: T | null | undefined, animated: boolean) {
		if (browser && show && itemID) {
			const selectedBounding = document.getElementById(`accordianSelect_${id}_${itemID}`)?.getBoundingClientRect()
			if (selectedBounding) {
				const scrollerBounding = scroller.getBoundingClientRect()
				scroller.scrollTo({
					top: selectedBounding.top - scrollerBounding.y - 1,
					left: 0,
					behavior: animated ? 'smooth' : 'instant'
				})
			}
		}
	}

	onMount(() => {
		observer = new ResizeObserver(() => {
			if (value) {
				scrollToItem(value, false)
			}
		})
		observer.observe(scroller)
		scrollToItem(value, false)
	})

	onDestroy(() => {
		observer.disconnect()
	})

	function setItem(itemID: T) {
		if (!disabled && !readonly) {
			if (!show) {
				show = true
				if (value) {
					setTimeout(() => {
						scrollToItem(value, false)
					}, 150)
				}
			} else if (show && value == itemID) {
				show = false
			} else {
				value = itemID
			}
		}
	}

	$: if (show) {
		wasShowing = true
		scrollToItem(value, !disabled && !readonly)
	} else {
		setTimeout(() => {
			wasShowing = false
		}, 250)
	}

	$: if (!isNullUndefined(value)) {
		show = false
	}

	$: if (isNullUndefined(value)) {
		show = true
	}

</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class='overflow-hidden inputControl {clazz}'
     {hidden}
     use:useActions={use}
     class:overflow-hidden={!show}
     class:overflow-y-scroll={show}
     style='max-height: {maxHeight}; '
     bind:this={scroller}
     on:blur={() => {
		 if (value) show = false
     }}
     tabindex={0}>
	{#each items as item (item.id)}
		{@const isSelected = item.id == value}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div class='text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer -mx-2 px-2'
		     id='accordianSelect_{id}_{item.id}'
		     class:transition-all={show || wasShowing}
		     class:hover:bg-slate-100={show && !isSelected}
		     class:dark:hover:bg-slate-500={show && !isSelected}
		     role='listitem'
		     class:text-center={centered}
		     class:bg-primary-main={isSelected && show}
		     class:text-white={isSelected && show}
		     style={`height: ${(show || isSelected) ? height : "0px"};`}
		     on:keydown|preventDefault
		     on:click={() => setItem(item.id)}>
			{item.title}
		</div>
	{/each}
</div>

{#if name}
	<input type='hidden'
	       {name}
	       {value}
	       {form}/>
{/if}
