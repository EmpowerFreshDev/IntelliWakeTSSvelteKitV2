<script lang='ts'>
	import Table from '$lib/Table.svelte'
	import {ToDigits} from '@solidbasisventures/intelliwaketsfoundation'

	const tableData = [
		{id: 1, name: 'Name One'},
		{id: 2, name: 'Name Two'}
	]
</script>

<div class='grid grid-rows-[auto_1fr]'>
	<h1>Tab 1</h1>

	<div class='w-[20em]'>
		<Table data={tableData}
		       limit={200}
		       copyButton
		       cols={{id: {name: 'Identifier', calc: (val) => ToDigits(val)},
		           name: {name: 'Item Name', title: (val) => val}}}/>
	</div>
</div>
