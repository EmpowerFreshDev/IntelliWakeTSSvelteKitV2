<script lang='ts'>
	import {SampleSysuserData} from '../SampleSysuserData'
	import {type TListGroupItem} from '$lib/Definitions'
	import ListGroupItems from '$lib/ListGroupItems.svelte'

	$: listItems = SampleSysuserData.map<TListGroupItem>((sysuser) => ({
		value: sysuser.id.toString(),
		title: sysuser.name,
		href: `Sysuser${sysuser.id}`,
		hidden: !sysuser.is_active,
		strikeThrough: !sysuser.is_active,
		parent_value: sysuser.manager_sysuser_id?.toString() ?? undefined
	}))

	let active: boolean | null = true

	console.log(listItems, active)
</script>

<div class='absolute inset-0 p-8 bg-slate-800'>
	<div>
		<button on:click={() => (active = true)}>True</button>
		<button on:click={() => (active = false)}>False</button>
		<button on:click={() => (active = null)}>Null</button>
		<ListGroupItems {listItems}/>

	</div>
</div>
