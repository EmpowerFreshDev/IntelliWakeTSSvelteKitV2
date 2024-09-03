<script lang='ts'>
	import {createEventDispatcher, tick} from 'svelte'
	import {type ActionArray, useActions} from './useActions'

	export let id: string | undefined = undefined
	export let use: ActionArray = []
	export let checked = false
	export let disabled = false
	export let readonly = false
	export let name: string | undefined = undefined
	export let form: string | undefined = undefined
	export let value: unknown | undefined = undefined
	export let offValue: unknown | undefined = 'ZZZnoneZZZ'
	export let hidden = false
	export let displayCheckInverse = false
	let clazz = ''
	export {clazz as class}
	export let onCheck: (val: boolean) => void = () => {}

	const dispatch = createEventDispatcher()

	let inputControl: HTMLDivElement

	function getValue(isChecked: boolean) {
		if (value) {
			if (isChecked) {
				return value
			} else {
				return undefined
			}
		} else {
			return isChecked
		}
	}

	let useValue = value

	async function check(checkValue: boolean) {
		if (!disabled && !readonly) {
			useValue = getValue(checkValue)
			if (checkValue !== checked) {
				checked = checkValue
				await tick()
				dispatch('check', checkValue)
				onCheck(checkValue)
				inputControl.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}))
				inputControl.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
			}
		}
	}

	$: check(checked)

	$: displayChecked = displayCheckInverse ? !checked : checked

</script>

<div bind:this={inputControl}
     {id}
     {hidden}
     use:useActions={use}
     class='cursor-pointer mt-1 select-none focus:ring-0 focus:outline-none group {clazz ?? ""}'
     role='button'
     on:click={() => check(!checked)}
     on:keydown={e => e.key === ' ' ? check(!checked) : undefined}
     tabindex={0}>
	<div class='inline-block h-full print:hidden'>
		<div class='items-center'>
			{#if useValue !== undefined}
				<input value={useValue}
				       {form}
				       {name}
				       hidden/>
			{:else if offValue !== 'ZZZnoneZZZ'}
				<input value={offValue}
				       {form}
				       {name}
				       hidden/>
			{/if}
			<div class='group-focus:ring-1 dark:ring-white w-7 h-4 flex items-center bg-gray-300 rounded-full group-focus:ring-primary-main mx-1 px-0.5 transition-all'
			     class:opacity-60={disabled || readonly}
			     class:!bg-primary-main={displayChecked}>
				<div class='bg-white w-3 h-3 rounded-full shadow-md transform transition-all'
				     class:translate-x-3={displayChecked}></div>
			</div>
		</div>
	</div>
	<div class='hidden print:inline-block'>
		{#if displayChecked}
			&checkmark;
		{:else}
			&Square;
		{/if}
	</div>
	{#if $$slots}
		<span class='whitespace-nowrap dark:text-slate-300'><slot/></span>
	{/if}
</div>
