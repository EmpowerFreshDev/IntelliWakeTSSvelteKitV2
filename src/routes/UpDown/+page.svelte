<script lang='ts'>
    import {ArrayRange} from '@solidbasisventures/intelliwaketsfoundation'
    import {nextPrevArrows, selectOnFocus, upDownArrows} from '$lib'
    import Search from "$lib/Search.svelte";
    import Switch from "$lib/Switch.svelte";

    const values = ArrayRange(50).map(item => ({id: item, name: `Item ${item}`}))

    const fields = ['raw', 'field', 'name']
</script>

<div class='grid grid-rows-[auto_1fr] overflow-hidden'>
    <h1 class='text-center my-4'>Up/Down</h1>
    <div class='grid grid-cols-[repeat(2,20em)] gap-8 justify-around overflow-hidden'>
        <div class='overflow-y-auto'>
            <div class='grid grid-cols-3'>
                {#each ['1', '2', '3'] as id}
                    {#each fields as field}
                        {#if field !== 'field'}
                            <Search id='{id}_{field}_item'
                                    use={[
                                    [upDownArrows, {preID: id === '1' ? 3 : id === '2' ? 1 : 2, postID: id === '1' ? 2 : id === '2' ? 3 : 1}],
                                    [nextPrevArrows, {preField: field === 'raw' ? 'name_item' : field === 'field' ? 'raw_item' : 'field_item', postField: field === 'raw' ? 'field_item' : field === 'field' ? 'name_item' : 'raw_item'}],
                                    selectOnFocus
                                ]}/>
                        {:else}
                            <Switch id='{id}_{field}_item'
                                    use={[
                                    [upDownArrows, {preID: id === '1' ? 3 : id === '2' ? 1 : 2, postID: id === '1' ? 2 : id === '2' ? 3 : 1}],
                                    [nextPrevArrows, {preField: field === 'raw' ? 'name_item' : field === 'field' ? 'raw_item' : 'field_item', postField: field === 'raw' ? 'field_item' : field === 'field' ? 'name_item' : 'raw_item'}]
                                ]}
                            >
                                {id}
                            </Switch>
                        {/if}
                    {/each}
                {/each}
            </div>
        </div>
        <div class='overflow-y-auto'>
            <div class='grid grid-cols-3'>
                {#each values as value}
                    {#each fields as field}
                        <input type='text'
                               id='{value.id}_{field}'
                               use:upDownArrows={{list: values}}
                               use:nextPrevArrows={{fieldList: fields}}
                               use:selectOnFocus/>
                    {/each}
                {/each}
            </div>
        </div>
    </div>
</div>
