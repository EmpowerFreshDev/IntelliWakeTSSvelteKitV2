<script lang='ts'>
	import MasterDetailLayout from '$lib/MasterDetailLayout.svelte'

	$: listItems = [
		{
			title: 'One',
			key: '1',
			href: 'Item1'
		},
		{
			title: 'Two',
			key: '2',
			href: 'Item2'
		}
	]
</script>
<div class='grid grid-rows-[auto_1fr] overflow-hidden'>
	<h1>Tab 2</h1>
	<div class='relative'>

		<MasterDetailLayout pageRoute='TabTwo'
		                    {listItems}
		                    rounded>
			<div slot='header'>
				<h1 class='text-center mx-2 !text-secondary-main'>
					Tab Items
				</h1>
			</div>
			<svelte:fragment slot='page'>
				<slot/>
			</svelte:fragment>
		</MasterDetailLayout>
	</div>
</div>
