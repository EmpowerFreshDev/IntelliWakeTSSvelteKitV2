<script lang='ts'>
	import {createEventDispatcher} from 'svelte'
	import {RandomString} from '@empowerfresh/intelliwake'

	export let checked = false
	export let disabled = false
	export let name: string | undefined
	export let value: unknown | undefined = undefined

	$: internalChecked = checked

	const dispatch = createEventDispatcher()

	const check = (checkValue: boolean) => {
		if (checkValue !== checked) {
			checked = checkValue
			dispatch('check', checkValue)
		}
	}

	$: check(internalChecked)

	let labelClass: string
	$: labelClass = `inline-flex items-center relative ${$$props.class ?? ''}`.trim()

	const randomID = RandomString(8)

	let useValue: boolean | undefined = !!value ?? checked

	function setUseValue(useChecked: boolean, ) {
		if (value) {
			if (useChecked) {
				useValue = !!value
			} else {
				useValue = undefined
			}
		} else {
			useValue = useChecked
		}
	}

</script>

<div>
	<label class={labelClass}
	       class:cursor-pointer={!disabled}
	       for={randomID}>
		<input {name}
		       value={useValue}
		       hidden/>
		<input id={randomID}
		       type='checkbox'
		       {disabled}
		       readonly={disabled}
		       class='peer sr-only block px-1
        border rounded
        placeholder-slate-300
        focus:ring-0 focus:outline-0 focus:outline-transparent
        dark:bg-white dark:text-black dark:border-black dark:placeholder-slate-400
        disabled:bg-slate-100'
		       on:change={() => setUseValue(!internalChecked)}
		       bind:checked={internalChecked}>
		<span class='bg-gray-400 border-2 border-gray-400 h-4 w-7 rounded-full
		after:content-[""] after:absolute after:top-1.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition after:shadow-sm
		peer-checked:after:translate-x-[100%] peer-checked:after:border-white peer-checked:after:dark:border-slate-400
		after:dark:bg-white
		peer-checked:bg-primary-main peer-checked:border-primary-main
		dark:peer-checked:bg-primary-lighter dark:peer-checked:border-primary-lighter'></span>
		{#if $$slots}
			<span class='ml-1.5 whitespace-nowrap dark:text-slate-300'><slot/></span>
		{/if}
	</label>
</div>
