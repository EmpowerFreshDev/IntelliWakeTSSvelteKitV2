<script>
	import SpinControl from "$lib/SpinControl.svelte";
	import {ArrayRange, ToDigits} from "@solidbasisventures/intelliwaketsfoundation";
</script>

<div class='grid grid-cols-3 p-12'>
	<SpinControl
		items={ArrayRange(100).map(item => ({
			id: item,
			title: 'Item ' + ToDigits(item)
			})
        )}
	             value={33}/>
</div>
