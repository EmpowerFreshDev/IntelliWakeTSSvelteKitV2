<script lang='ts'>
	import DropDownControl from "$lib/DropDownControl.svelte"
	import {ArrayRange} from "@empowerfresh/intelliwake";
	import DropDown from "$lib/DropDown.svelte";
	import {faSun} from "@fortawesome/free-solid-svg-icons";

	let t1 = false
	let t2 = false
	let t3 = false
	let t4 = false
	let t5 = false
	let t6 = false
</script>

<div class='h-full grid grid-rows-[auto_1fr]'>
	<h1 class='text-center'>Drop Down Frame</h1>
	<div class='grid grid-rows-3 grid-cols-2'>
		<div class='relative'>
			<DropDownControl bind:show={t1}>
				<button slot='toggle'>Toggle!!
				</button>
				<div slot='body'>
					{#each ArrayRange(100) as aR}
						<p>Body {aR}</p>
					{/each}
				</div>
			</DropDownControl>
			<DropDownControl bind:show={t5}
			                 position='Center'>
				<button slot='toggle'>Toggle {t5 ? 'T' : 'F'}</button>
				<div slot='body'>
					{#each ArrayRange(100) as aR}
						<p>Body {aR}</p>
					{/each}
				</div>
			</DropDownControl>
			<DropDown buttonTitle='Fixed DD'
			               ddActions={[
				{title: 'One', action: () => console.info(1)},
				{title: 'Two', action: () => console.info(2)}
			]}/>
			<DropDown buttonTitle='DDZZ'
			          ddActions={[
				{headerGroup: 'A', title: 'One', action: () => console.info(1), faProps: {icon: faSun}},
				{headerGroup: 'A', title: 'Two', action: () => console.info(2)},
				{headerGroup: 'A', title: 'Three', action: () => console.info(3)},
				{headerGroup: 'A', title: 'Four', action: () => console.info(4)},
				{headerGroup: 'B', title: 'Five', action: () => console.info(5)},
				{headerGroup: 'B', title: 'Size', action: () => console.info(6)},
				{headerGroup: 'B', title: 'Href', href: '/'}
			]}/>
			<DropDown buttonTitle='DDZ'
			          fullBlock
			          ddActions={[
				{title: 'One', action: () => console.info(1)},
				{title: 'Two', action: () => console.info(2)},
				{title: 'Three', action: () => console.info(3), active: true},
				{title: 'Four', action: () => console.info(4)},
				{title: 'Five', action: () => console.info(5)},
				{title: 'Size', action: () => console.info(6)},
			]}/>
		</div>
		<div class='relative'>
			<div class='block-inline absolute top-3 right-10 max-h-[5em] overflow-y-auto'>
				<DropDownControl bind:show={t3}
				                 position='Center'>
					<button slot='toggle'>Toggle
					</button>
					<span slot='body'>
					{#each ArrayRange(100) as aR}
						<p>Body {aR}</p>
					{/each}
			</span>
				</DropDownControl>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
			</div>
		</div>
		<div class='relative'>
			<div class='block-inline absolute top-3 right-10 max-h-[5em] overflow-y-auto'>
				<DropDownControl bind:show={t2}
				                 position='Center'>
					<button slot='toggle'>Toggle 2
					</button>
					<span slot='body'>
					{#each ArrayRange(100) as aR}
						<input type='text'
						       class='w-48'/>
						<p>Body {aR}</p>
					{/each}
			</span>
				</DropDownControl>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
			</div>
		</div>
		<div class='relative'>
		</div>
		<div class='relative'>
			<div class='block-inline absolute top-3 right-10 max-h-[5em] overflow-y-auto'>
				<DropDownControl bind:show={t6}
				                 position='Center'
				                 controlClass='Test'>
					<button slot='toggle'>Toggle 6 {t6 ? 'T' : 'F'}
					</button>
					<span slot='body'>
					{#each ArrayRange(100) as aR}
						<p>Body {aR}</p>
					{/each}
			</span>
				</DropDownControl>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
			</div>
		</div>
		<div class='relative'>
			<div class='block-inline absolute top-3 left-10 max-h-[5em] overflow-y-auto'>
				<DropDownControl bind:show={t4}>
					<button slot='toggle'>Toggle
					</button>
					<span slot='body'>
				<p>Body</p>
				<p>Body</p>
				<p>Body</p>
				<p>Body</p>
				<p>Body</p>
				<p>Body</p>
				<p>Body</p>
			</span>
				</DropDownControl>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
				<p>Here</p>
			</div>
		</div>
		<div class='relative max-w-18 mb-4'>
			<DropDown buttonTitle='DDZ'
			          ddActions={[
				{title: 'One', action: () => console.info(1)},
				{title: 'Two', action: () => console.info(2)},
				{title: 'Three', action: () => console.info(3), active: true},
				{title: 'Four', action: () => console.info(4)},
				{title: 'Five', action: () => console.info(5)},
				{title: 'Size', action: () => console.info(6)},
			]}/>
		</div>
	</div>
</div>
