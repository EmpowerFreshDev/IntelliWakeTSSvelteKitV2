<script lang='ts'>
	import type {ISpinItem} from '$lib/Definitions'
	import {isNullUndefined, RandomString} from '@solidbasisventures/intelliwaketsfoundation'
	import {browser} from '$app/environment'
	import {onMount} from 'svelte'
	import {type ActionArray, useActions} from '$lib/useActions'

	type T = $$Generic

	export let items: ISpinItem<T>[]
	let clazz = ''
	export {clazz as class}
	export let centered = true
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

	function scrollToItem(itemID: T | null | undefined, animated: boolean) {
		if (browser && itemID) {
			const selectedBounding = document.getElementById(`accordianSelect_${id}_${itemID}`)?.getBoundingClientRect()
			if (selectedBounding) {
				const top = selectedBounding.top
				scroller.scrollTo({
					top,
					left: 0,
					behavior: animated ? 'smooth' : 'instant'
				})
			}
		}
	}

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

	onMount(async () => {
		scrollToItem(value, false)
	})

</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class='overflow-hidden inputControl {clazz}'
     {hidden}
     use:useActions={use}
     class:overflow-hidden={!show}
     class:overflow-y-scroll={show}
     style='max-height: {maxHeight}; min-height: {height};'
     bind:this={scroller}
     tabindex={0}>
	{#each items as item (item.id)}
		{@const isSelected = item.id == value}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div class='text-ellipsis whitespace-nowrap overflow-hidden px-1 cursor-pointer'
		     id='accordianSelect_{id}_{item.id}'
		     class:transition-all={show || wasShowing}
		     class:hover:bg-slate-100={show}
		     class:dark:hover:bg-slate-500={show}
		     role='listitem'
		     class:text-center={centered}
		     class:font-bold={isSelected && show}
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
