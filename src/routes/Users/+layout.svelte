<script lang='ts'>
	import MasterDetailLayout from '$lib/MasterDetailLayout.svelte'
	import type {TListGroupItem} from '$lib'
	import {SearchRows} from '@empowerfresh/intelliwake'
	import Search from '$lib/Search.svelte'

	let search = ''

	$: listItems = SearchRows([
		{
			title: 'User Angie',
			value: '1',
			href: 'User1'
		},
		{
			title: 'User Bob',
			value: '2',
			parent_value: '1',
			href: 'User2'
		},
		{
			title: 'User Christy',
			value: '3',
			parent_value: '1',
			href: 'User3'
		}
	], search) satisfies TListGroupItem[]

</script>

<MasterDetailLayout pageRoute='Users'
                    {listItems}>
	<div slot='header'>
		<h1 class='text-center mx-2'>
			Users
		</h1>
		<div class='p-1'>
			<Search bind:value={search}
			        placeholder='Search'/>
		</div>
	</div>
	<svelte:fragment slot='page'>
		<slot/>
	</svelte:fragment>
</MasterDetailLayout>
