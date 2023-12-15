<script lang='ts'>
	import About from '$lib/About.svelte'
	import {abouts} from './AboutData.js'
</script>

<div class='p-4 mx-auto max-w-[35rem] overflow-y-auto'>
	<h1 class='text-center'>IntelliWake SvelteKit 1 Library</h1>
	<p class='text-center mb-4'>
		v...
	</p>

	<About {abouts}/>
</div>
