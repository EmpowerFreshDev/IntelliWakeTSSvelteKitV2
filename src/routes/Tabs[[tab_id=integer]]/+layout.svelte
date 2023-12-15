<script lang='ts'>
	import TabHref from '$lib/TabHref.svelte'
	import {page} from '$app/stores'
	import type {ITabHref} from '$lib'
	import Switch from '$lib/Switch.svelte'
	import {browser} from '$app/environment'
	import {faCircleArrowRight, faCircleCheck} from "@fortawesome/free-solid-svg-icons";

	let hideThree = false
	let rounded = false

	$: tabHrefs = [
		{
			key: 'One',
			faProps: {icon: faCircleCheck}
		},
		{
			key: 'Two',
			faProps: {icon: faCircleArrowRight}

		},
		{
			key: 'Three',
			hidden: hideThree
		}
	] satisfies ITabHref[]

</script>

<div class='grid grid-rows-[auto_auto_1fr]'>
	<div>
		<h1>Tab Testor {!browser ? '' : $page.params.tab_id ?? ''}</h1>
		<div class='text-center' on:change={() => console.log('Change Occurred')}>
			<Switch bind:checked={hideThree}>
				Hide 3
			</Switch>
			<Switch bind:checked={rounded}>
				Rounded
			</Switch>
		</div>
	</div>

	<TabHref basePath='Tabs{!browser ? "" : $page.params.tab_id ?? ""}'
	         consoleLogs
	         {tabHrefs}
		{rounded}/>

	<slot/>

</div>
