<script lang='ts'>
	import SlideDown from '$lib/SlideDown.svelte'
	import Switch from '$lib/Switch.svelte'
	import type {IDDAction, TListGroupItem} from '$lib/index.js'
	import {ShowActivityOverlay, ShowMessageBox} from '$lib/Definitions.js'
	import ListGroupItems from '$lib/ListGroupItems.svelte'
	import {SampleSysuserData} from '../SampleSysuserData.js'
	import DisplayColor from '$lib/DisplayColor.svelte'
	import CheckBox from '$lib/CheckBox.svelte'
	import {page} from '$app/stores'
	import {setSearchParam} from '$lib/index.js'
	import {browser} from '$app/environment'

	let showActivityOverlay = false

	// For testing the chekcmark below
	let checked = false

	let ddActions: IDDAction[] = [
		{
			title: 'Test',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		},
		{
			title: 'This is a long title',
			action: () => {
			}
		}
	]

	let disabled = false

	$: listItems = SampleSysuserData.map<TListGroupItem>((sysuser) => ({
		value: sysuser.id.toString(),
		title: sysuser.name,
		href: `Sysuser${sysuser.id}`,
		hidden: !sysuser.is_active,
		strikeThrough: !sysuser.is_active,
		parent_value: sysuser.manager_sysuser_id?.toString() ?? null
	}))

	$: console.info(listItems)

	function doTestMessage() {
		ShowMessageBox.show('Test Message Box')
	}

	function doTestOverlay() {
		ShowActivityOverlay.show()
		setTimeout(() => ShowActivityOverlay.hide(), 2000)
	}

	let active: boolean | null = true

	let inputFoo: HTMLInputElement
</script>

<div class='absolute inset-0 p-8 bg-slate-800'>
	<div>
		<button on:click={() => (active = true)}>True</button>
		<button on:click={() => (active = false)}>False</button>
		<button on:click={() => (active = null)}>Null</button>
		<ListGroupItems {listItems}
		                {active}/>
	</div>
	<div>
		<SlideDown buttonTitle='Testing'
		           {ddActions}/>
	</div>
	<div>
		<input type='text'/>
	</div>
	<div>
		<Switch {disabled}
		        on:check={(val) => console.info(val)}>On/Off
		</Switch>
	</div>
	<div>
		<Switch bind:checked={disabled}>Disabled</Switch>
	</div>
	<div>
		<DisplayColor showNoColorSymbol={true}
		              scale={5}/>
	</div>
	<div>
		<button on:click={doTestMessage}>Test Message</button>
	</div>
	<div>
		<button on:click={doTestOverlay}>Test Overlay</button>
	</div>
	<div class='md:hidden'>
		<a href='/'
		   data-sveltekit-preload-data='tap'>Back</a>
	</div>

	<div class='m-4 w-fit h-fit'>
		<!-- <CheckBox {checked} click={e => console.info(e)}/> -->
		<CheckBox
			bind:checked={checked}
      click={() => console.info(checked)}
      label="Test Label"
			name="test"
			stopPropagation={false}
		/>

		<CheckBox label="Radial Checkbox" radial/>
		<!-- <CheckBox/> -->
	</div>
	<div>
		Foo: {!browser ? '' : $page.url.searchParams.get('Foo')}
	</div>
	<div>
		<input type='text'
		       value={!browser ? '' : $page.url.searchParams.get('Foo')}
		       bind:this={inputFoo}/>
		<button type='button' on:click={() => setSearchParam('Foo', inputFoo?.value)}>
			Set Foo
		</button>
	</div>
</div>
