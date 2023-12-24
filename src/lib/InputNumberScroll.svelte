<script lang='ts'>
	import {
		ArrayRange,
		CleanNumber,
		CleanNumberNull,
		CountDecimalDigits,
		GreaterNumber,
		IsOn, LeastNumber
	} from '@solidbasisventures/intelliwaketsfoundation'
	import {tick} from 'svelte'
	import DisplayFraction from '$lib/DisplayFraction.svelte'
	import {browser} from '$app/environment'
	import Icon from '$lib/Icon.svelte'

	export let value: number | null | undefined
	export let lowerRange = 0
	export let increment = 1
	export let upperRange = 50
	export let maxDigitsDisplay = 0
	export let offValue: number | null = null
	export let name: string | undefined = undefined
	export let allowManualEntryMode = true
	export let saveManualEntryMode: string | null = null
	export let manualEntryMode = browser && allowManualEntryMode && saveManualEntryMode && IsOn(window.localStorage.getItem(saveManualEntryMode))

	let inputEL: HTMLInputElement

	$: viewMaxDigits = GreaterNumber(maxDigitsDisplay, LeastNumber(CountDecimalDigits(increment), 2))

	let typedValue = CleanNumber(value, 0)

	$: if (!!saveManualEntryMode && allowManualEntryMode && browser) (manualEntryMode ? window.localStorage.setItem(saveManualEntryMode, 'true') : window.localStorage.removeItem(saveManualEntryMode))

	function setValue(numb: number | null) {
		if (value == CleanNumberNull(numb, viewMaxDigits)) {
			value = offValue
		} else {
			value = CleanNumberNull(numb, viewMaxDigits)
		}
		typedValue = CleanNumber(value, 0)
		tick()
			.then(() => {
				inputEL?.dispatchEvent(new Event('change', {bubbles: true}))
			})
	}

	function typeValue(numb: number | null) {
		const valueString = CleanNumber(value, 0).toString()
		if (numb === null) {
			setValue(CleanNumberNull(valueString.substring(0, valueString.length - 1)))
		} else {
			setValue(CleanNumberNull(`${valueString}${numb}`))
		}
	}

	$: quickArray = ArrayRange(upperRange + increment, increment, lowerRange).map(ar => CleanNumberNull(ar, GreaterNumber(maxDigitsDisplay, 2)))
	$: valueExistsInQuickArray = quickArray.some(qa => qa == CleanNumberNull(value, GreaterNumber(maxDigitsDisplay, 2)))

</script>

<div class='grid grid-rows-1 overflow-y-auto'>
	<div>
		{#if manualEntryMode}
			<div class='grid grid-cols-3 p-2 gap-1 mx-auto max-w-[15em]'>
				<input type='number'
				       bind:value={typedValue}
				       step={1}
				       class='col-span-3 !bg-white !border-secondary-main !text-secondary-main text-[2rem] !rounded-full !text-center'/>
				{#each ArrayRange(9, 1) as numberValue (numberValue)}
					<button type='button'
					        class='btnClean aspect-square bg-secondary-main text-white border-white border-2 !shadow-none !drop-shadow-none !rounded-full'
					        on:click={() => typeValue(numberValue + 1)}>
						{numberValue + 1}
					</button>
				{/each}
				<button type='button'
				        class='btnClean aspect-[2] bg-secondary-main text-white border-white border-2 !shadow-none !drop-shadow-none !rounded-full col-span-2'
				        on:click={() => typeValue(0)}>
					0
				</button>
				<button type='button'
				        class='btnClean aspect-square bg-white text-secondary-main border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full'
				        on:click={() => typeValue(null)}>
					<svg xmlns='http://www.w3.org/2000/svg'
					     class='inline-block'
					     height='16'
					     width='18'
					     viewBox='0 0 576 512'>
						<path
							fill='currentColor'
							d='M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>
					</svg>
				</button>
			</div>
		{:else}
			<div class='grid grid-cols-[repeat(auto-fill,minmax(3em,1fr))] p-2 gap-1'>
				{#if !valueExistsInQuickArray && !!value}
					<button type='button'
					        class='btnClean aspect-square bg-secondary-main text-white border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full'
					        on:click={() => setValue(null)}>
						<DisplayFraction value={value}
						                 {maxDigitsDisplay}/>
					</button>
				{/if}
				{#each quickArray as numberValue (numberValue)}
					{@const isSelected = numberValue === CleanNumberNull(value)}
					<button type='button'
					        class='btnClean aspect-square bg-white text-secondary-main border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full'
					        class:!text-white={isSelected}
					        class:!bg-secondary-main={isSelected}
					        on:click={() => setValue(numberValue)}>
						<DisplayFraction value={numberValue}
						                 {maxDigitsDisplay}/>
					</button>
				{/each}
			</div>
		{/if}
		{#if allowManualEntryMode}
			<div class='text-center my-2'>
				<button type='button'
				        class='btnLink'
				        on:click={() => manualEntryMode = !manualEntryMode}>
					Switch to {manualEntryMode ? 'Quick Entry' : 'Manual Entry'}
				</button>
			</div>
		{/if}
	</div>
</div>

{#if name}
	<input type='hidden'
	       bind:this={inputEL}
	       {value}
	       {name}/>
{/if}
