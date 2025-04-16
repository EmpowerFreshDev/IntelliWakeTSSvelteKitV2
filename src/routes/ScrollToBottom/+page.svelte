<script lang='ts'>
	import {scrollToBottom} from '$lib'
	import {ArrayRange} from '@empowerfresh/intelliwake'

	let range = 100
</script>

<div>
	<div class='mx-auto mt-4 w-24'>
		<input type='number'
		       bind:value={range}/>
	</div>

	<div class='mx-auto mt-4 w-24 h-24 bg-green-300 overflow-y-auto'
	     use:scrollToBottom={range}>
		{#each ArrayRange(range) as item}
			<p>Item {item + 1}</p>
		{/each}
	</div>
</div>
