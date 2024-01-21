<script lang='ts'>
	import {
		ArrayRange,
		CleanNumber,
		CleanNumberNull,
		CountDecimalDigits,
		GreaterNumber,
		IsOn,
		LeastNumber
	} from '@solidbasisventures/intelliwaketsfoundation'
	import {tick} from 'svelte'
	import DisplayFraction from '$lib/DisplayFraction.svelte'
	import {browser} from '$app/environment'
	import Icon from '$lib/Icon.svelte'
	import {faBackspace} from '@fortawesome/free-solid-svg-icons'

	export let value: number | null | undefined
	export let lowerRange = 0
	export let increment = 1
	export let upperRange = 50
	export let maxDigitsDisplay = 0
	export let offValue: number | null = null
	export let name: string | undefined = undefined
	export let allowManualEntryMode = true
	export let saveManualEntryMode: string | null = null
	export let readonly = false
	export let manualEntryMode = browser && allowManualEntryMode && saveManualEntryMode && IsOn(window.localStorage.getItem(saveManualEntryMode))

	let inputEL: HTMLInputElement

	$: viewMaxDigits = GreaterNumber(maxDigitsDisplay, LeastNumber(CountDecimalDigits(increment), 2))

	let typedValue = CleanNumber(value, 0)
	$: typedValue = CleanNumber(value, 0)

	$: if (!!saveManualEntryMode && allowManualEntryMode && browser) (manualEntryMode ? window.localStorage.setItem(saveManualEntryMode, 'true') : window.localStorage.removeItem(saveManualEntryMode))

	function setValue(numb: number | null) {
		if (!readonly) {
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
	}

	function typeValue(numb: number | null) {
		if (!readonly) {
			const valueString = CleanNumber(value, 0).toString()
			if (numb === null) {
				setValue(CleanNumberNull(valueString.substring(0, valueString.length - 1)))
			} else {
				setValue(CleanNumberNull(`${valueString}${numb}`))
			}
		}
	}

	$: quickArray = ArrayRange(upperRange + increment, increment, lowerRange).map(ar => CleanNumberNull(ar, GreaterNumber(maxDigitsDisplay, 2)))
	$: valueExistsInQuickArray = quickArray.some(qa => qa == CleanNumberNull(value, GreaterNumber(maxDigitsDisplay, 2)))

</script>

<div class='grid grid-rows-1 overflow-y-auto'>
	{#if readonly}
		<h1 class='text-center p-4'>
			<DisplayFraction value={value}
			                 {maxDigitsDisplay}/>
		</h1>
	{:else}
		<div>
			{#if manualEntryMode}
				<div class='grid grid-cols-3 p-2 gap-1 mx-auto max-w-[15em]'>
					<input type='number'
					       bind:value={typedValue}
					       {readonly}
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
						<Icon icon={faBackspace}
						      class='inline-block'/>
					</button>
				</div>
			{:else}
				<div class='grid grid-cols-[repeat(auto-fill,minmax(2.25em,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(3em,1fr))] p-2 gap-1'>
					{#if !valueExistsInQuickArray && !!value}
						<button type='button'
						        class='btnClean aspect-square bg-secondary-main text-white border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full max-lg:text-sm'
						        on:click={() => setValue(null)}>
							<DisplayFraction value={value}
							                 {maxDigitsDisplay}/>
						</button>
					{/if}
					{#each quickArray as numberValue (numberValue)}
						{@const isSelected = numberValue === CleanNumberNull(value)}
						<button type='button'
						        class='btnClean aspect-square bg-white text-secondary-main border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full max-lg:text-sm'
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
				<div class='text-center my-2 max-lg:text-sm'>
					<button type='button'
					        class='btnLink'
					        on:click={() => manualEntryMode = !manualEntryMode}>
						Switch to {manualEntryMode ? 'Quick Entry' : 'Manual Entry'}
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

{#if name}
	<input type='hidden'
	       bind:this={inputEL}
	       {value}
	       {name}/>
{/if}
