<script lang='ts'>
    import InputNumberScroll from '$lib/InputNumberScroll.svelte'
    import DisplayFraction from '$lib/DisplayFraction.svelte'
    import Switch from '$lib/Switch.svelte'

    let value = 1.25

    let readonly = false
</script>

<div class='grid grid-cols-3 overflow-hidden'>
    <div>
        <input type='number' step={0.25} bind:value/>
	    <Switch bind:checked={readonly}>
		    Read Only
	    </Switch>
	    <button type='button' on:click={() => value++}>
		    +1
	    </button>
    </div>
    <InputNumberScroll bind:value lowerRange={0} upperRange={20} increment={1/3} saveManualEntryMode="TestMEM" {readonly}/>
    <div>
        <DisplayFraction {value}/>
    </div>
</div>
