<script lang='ts'>
	import InputNumberScroll from '$lib/InputNumberScroll.svelte'
	import DisplayFraction from '$lib/DisplayFraction.svelte'
	import Switch from '$lib/Switch.svelte'
	import ButtonGroup from '$lib/ButtonGroup.svelte'
	import {CleanNumberNull} from '@solidbasisventures/intelliwaketsfoundation'

	let value = 1.25
	let valueHighlight = 30

	let readonly = false
</script>

<div class='grid grid-cols-3 overflow-hidden'>
	<div>
		<input type='number'
		       step={0.25}
		       bind:value/>
		<Switch bind:checked={readonly}>
			Read Only
		</Switch>
		<button type='button'
		        on:click={() => value++}>
			+1
		</button>
		<input type='number'
		       bind:value={valueHighlight}/>
	</div>
	<InputNumberScroll bind:value
	                   valueHighlight={CleanNumberNull(valueHighlight) === null ? undefined : valueHighlight}
	                   lowerRange={0}
	                   upperRange={20}
	                   increment={1/3}
	                   saveManualEntryMode='TestMEM'
	                   buttonClassHighlightOff='font-bold border-4'
	                   {readonly}/>
	<div>
		<DisplayFraction {value}/>
		<ButtonGroup class='mx-auto w-fit'
		             bind:value
		             options={[
			{key: 1, name: 'One'},
			{key: 2, name: 'Two'},
			{key: 3, name: 'Three'},
			{key: 4, name: 'Four', disabled: true},
			{key: 5, name: 'Five', hidden: true},
			{key: 6, name: 'Six'}
	    ]}/>
	</div>
</div>
