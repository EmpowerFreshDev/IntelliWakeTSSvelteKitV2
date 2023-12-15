<script lang="ts">

</script>

<div class="overflow-y-auto">
    <div class="grid grid-cols-3">
        {#each [1, 2, 3] as item}
            <div on:blur={() => console.log('Div Blur', item)}
                 on:focusout={() => console.log('Div FO', item)}>
                {#each [1, 2, 3] as inp}
                    <input on:blur={() => console.log('Input Blur', item, inp)}
                           on:focusout={() => console.log('Input FO', item, inp)}/>
                {/each}
            </div>
        {/each}
    </div>
</div>
