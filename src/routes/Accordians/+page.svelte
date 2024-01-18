<script lang='ts'>
	import type {ISpinItem} from '$lib'
	import AccordianSelect from '$lib/AccordianSelect.svelte'

	const items: ISpinItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
		.map(numb => ({
			id: numb,
			title: `Item: ${numb}`
		}))

	let value: number | null = null
</script>

<div class='p-12'>
	<p>
		{value ?? '(Null)'}
	</p>
	<div>
		<AccordianSelect {items}
		                 bind:value
		class='w-fit'/>
	</div>
	<div>
		<input type='text'
		       bind:value={value}/>
	</div>
	<div>
		<AccordianSelect {items}
		                 bind:value
		class='w-fit'/>
	</div>
</div>
