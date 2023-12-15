<script lang='ts'>
    import {page} from '$app/stores'
    import Switch from "$lib/Switch.svelte";
</script>

<div>
    <h1>Item {$page.params.item_id}</h1>
    <div>
        <Switch checked={true}>
            On
        </Switch>
        <Switch checked={false}>
            Off
        </Switch>
    </div>
</div>
