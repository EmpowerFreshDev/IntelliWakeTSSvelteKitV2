<script>
	import TabHref from "$lib/TabHref.svelte"
	import {page} from "$app/stores";
	import {clickSubmitOnFocusOut, clickSubmitOnChange, FormEnhance, PathAnalyzer} from "$lib";
	import {browser} from "$app/environment";
	import {enhance} from "$app/forms";
	import Switch from "$lib/Switch.svelte";

	$: pathAnalyzer = !browser ? null : new PathAnalyzer($page, 'TabsOld')

	$: pathAnalyzerOther = !browser ? null : new PathAnalyzer($page, 'Tabs')
</script>
<div class='grid grid-rows-[auto_1fr]'>
	<div>
		<h1>Tab Testor Old</h1>

		<div>
			<form action='?/test'
			      method='POST'
			      use:clickSubmitOnFocusOut
			      use:enhance={() => FormEnhance({
			      message: 'Out Focused'
			      })}>
				<input type='text'
				       name='test_text'/>
				<Switch name='is_active'/>
				<button hidden></button>
			</form>
			<form action='?/test'
			      method='POST'
			      use:clickSubmitOnChange
			      use:enhance={() => FormEnhance({
			      message: 'Changed'
			      })}>
				<input type='text'
				       name='test_text'/>
				<Switch name='is_active'/>
				<button hidden></button>
			</form>
		</div>

		<div>
			<a href='Tabs1'>To 1</a>
		</div>
		<div>
			<a href='Tabs2'>To 2</a>
		</div>

		<TabHref tabHrefs={!pathAnalyzer ? [] : [
		{
			key: 'One',
			href: pathAnalyzer.open('TabOne', false),
			isOpen: pathAnalyzer.activePageSlug === 'TabOne'
		},
		{
			key: 'Two',
			href: pathAnalyzer.open('TabTwo', false),
			isOpen: pathAnalyzer.activePageSlug === 'TabTwo'
		},
		{
			key: 'Three (Testing Disabled)',
			href: pathAnalyzer.open('TabThree', false),
			isOpen: pathAnalyzer.activePageSlug === 'TabThree',
			disabled: true
		}
	]}/>
	</div>

	<slot/>

</div>
