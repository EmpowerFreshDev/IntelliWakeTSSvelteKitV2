<script lang='ts'>
    import InputNumberScroll from '$lib/InputNumberScroll.svelte'
    import DisplayFraction from '$lib/DisplayFraction.svelte'

    let value = 1.25
</script>

<div class='grid grid-cols-3 overflow-hidden'>
    <div>
        <input type='number' step={0.25} bind:value/>
    </div>
    <InputNumberScroll bind:value lowerRange={0} upperRange={20} increment={1/3} saveManualEntryMode="TestMEM"/>
    <div>
        <DisplayFraction {value}/>
    </div>
</div>
