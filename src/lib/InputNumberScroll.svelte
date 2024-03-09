<script lang='ts'>
	import {
		ArrayRange,
		CleanNumber,
		CleanNumberNull,
		CountDecimalDigits,
		GreaterNumber,
		IsOn,
		LeastNumber,
		ToDigitsMax,
		ToPercent
	} from '@solidbasisventures/intelliwaketsfoundation'
	import {createEventDispatcher, tick} from 'svelte'
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
	/**
	 * Maximum number of digits allowed for manual entry.
	 *
	 * @type {number | null}
	 */
	export let maxManualEntryDigits: number | null = null
	export let displayPercent = false
	export let center = false

	let inputEL: HTMLInputElement

	const dispatch = createEventDispatcher()

	$: viewMaxDigits = GreaterNumber(maxDigitsDisplay, LeastNumber(CountDecimalDigits(increment), 2))

	let typedValue = CleanNumber(value, 0)
	$: typedValue = CleanNumber(value, 0)

	$: if (!!saveManualEntryMode && allowManualEntryMode && browser) (manualEntryMode ? window.localStorage.setItem(saveManualEntryMode, 'true') : window.localStorage.removeItem(saveManualEntryMode))

	function setValue(numb: number | null, doNotNull: boolean) {
		if (!readonly) {
			if (!doNotNull && value == CleanNumberNull(numb, viewMaxDigits)) {
				value = offValue
			} else {
				value = CleanNumberNull(numb, viewMaxDigits)
			}
			typedValue = CleanNumber(value, 0)
			tick()
				.then(() => {
					if (inputEL) {
						inputEL?.dispatchEvent(new Event('change', {bubbles: true}))
					} else {
						dispatch('change', value)
					}
				})
		}
	}

	function typeValue(numb: number | null) {
		if (!readonly) {
			const valueString = CleanNumber(value, 0).toString()
			if (numb === null) {
				setValue(CleanNumberNull(valueString.substring(0, valueString.length - 1)), false)
			} else {
				setValue(CleanNumberNull(!maxManualEntryDigits ? `${valueString}${numb}` : `${valueString}${numb}`.slice(maxManualEntryDigits * -1)), true)
			}
		}
	}

	$: quickArray = ArrayRange(upperRange + increment, increment, lowerRange).map(ar => CleanNumberNull(ar, GreaterNumber(maxDigitsDisplay, 2)))
	$: valueExistsInQuickArray = quickArray.some(qa => qa == CleanNumberNull(value, GreaterNumber(maxDigitsDisplay, 2)))

</script>

<div class='grid grid-rows-1 overflow-y-auto'>
	{#if readonly}
		<h1 class='text-center p-4'>
			{#if displayPercent}
				{ToPercent(value, 0)}
			{:else}
				<DisplayFraction value={value}
				                 {maxDigitsDisplay}/>
			{/if}
		</h1>
	{:else}
		<div>
			{#if manualEntryMode && allowManualEntryMode}
				<div class='grid grid-cols-3 p-2 gap-1 mx-auto max-w-[15em]'>
					<div class='col-span-3 bg-white border-2 border-secondary-main text-secondary-main text-[2rem] rounded-full text-center'>
						{ToDigitsMax(typedValue, maxDigitsDisplay)}
					</div>
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
				<div class='p-2 gap-1 flex flex-row flex-wrap'
				     class:justify-center={center}
				     class:[&_button]:w-[2.25em]={quickArray.length > 10}
				     class:lg:[&_button]:w-[3em]={quickArray.length > 10}
				     class:[&_button]:w-[3em]={quickArray.length <= 10}
				     class:lg:[&_button]:w-[4em]={quickArray.length <= 10}>
					{#if !valueExistsInQuickArray && !!value}
						<button type='button'
						        class='btnClean aspect-square bg-secondary-main text-white border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full max-lg:text-sm'
						        on:click={() => setValue(null, false)}>
							{#if displayPercent}
								{ToPercent(value, 0)}
							{:else}
								<DisplayFraction value={value}
								                 {maxDigitsDisplay}/>
							{/if}
						</button>
					{/if}
					{#each quickArray as numberValue (numberValue)}
						{@const isSelected = numberValue === CleanNumberNull(value)}
						<button type='button'
						        class='btnClean aspect-square bg-white text-secondary-main border-secondary-main border-2 !shadow-none !drop-shadow-none !rounded-full max-lg:text-sm'
						        class:!text-white={isSelected}
						        class:!bg-secondary-main={isSelected}
						        on:click={() => setValue(numberValue, false)}>
							{#if displayPercent}
								{ToPercent(numberValue, 0)}
							{:else}
								<DisplayFraction value={numberValue}
								                 {maxDigitsDisplay}/>
							{/if}
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
