<script lang='ts'>
	import About from '$lib/About.svelte'
	import { abouts } from './AboutData'
</script>

<div class='p-4 mx-auto max-w-[35rem] overflow-y-auto'>
	<h1 class='text-center'>IntelliWake SvelteKit 2 Library</h1>
	<p class='text-center mb-4'>

	</p>

	<h1>All</h1>
	<About {abouts} />

	<h1>Limit 5 days</h1>
	<About {abouts} filterBackAdjustment={{days: 5}} />

	<h1>Limit 4 minors</h1>
	<About {abouts} filterBackMinorCount={4} />

	<h1>Limit 2 minors</h1>
	<About {abouts} filterBackMinorCount={2} />

	<h1>Limit 5 days / 2 minors</h1>
	<About {abouts} filterBackAdjustment={{days: 5}} filterBackMinorCount={2} />
</div>
