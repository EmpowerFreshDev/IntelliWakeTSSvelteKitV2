<script lang='ts'>
	import {
		CleanNumber,
		ExtractWholeDecimal,
		isNullUndefined,
		ToDigitsBlank,
		ToDigitsMax
	} from '@solidbasisventures/intelliwaketsfoundation'

	export let value: number | null | undefined
	export let onNullUndefined: 'Zero' | 'Dash' | 'Blank' = 'Dash'
	export let onBlank: 'Zero' | 'Dash' | 'Blank' = 'Zero'
	export let maxDigitsDisplay = 2

	$: wholeDecimal = ExtractWholeDecimal(value)
	$: cleanDecimal = CleanNumber(wholeDecimal.decimal, 2)
	$: isDisplayableDecimal = [0.25, 0.5, 0.75, 0.33, 0.66, 0.67].includes(cleanDecimal)
	$: numerator = cleanDecimal === 0.75 ? 3 : [0.66, 0.67].includes(cleanDecimal) ? 2 : 1
	$: denominator = [0.25, 0.75].includes(cleanDecimal) ? 4 : [0.33, 0.66, 0.67].includes(cleanDecimal) ? 3 : 2

</script>

{#if isNullUndefined(value)}
	{onNullUndefined === 'Zero' ? '0' : onNullUndefined === 'Dash' ? '-' : ''}
{:else if !CleanNumber(value)}
	{onBlank === 'Zero' ? '0' : onBlank === 'Dash' ? '-' : ''}
{:else}
	{#if isDisplayableDecimal}
		{ToDigitsBlank(wholeDecimal.whole, 0)
		}<sup>{numerator}</sup>/<sub>{denominator}</sub>
	{:else}
		{ToDigitsMax(value, maxDigitsDisplay)}
	{/if}
{/if}
