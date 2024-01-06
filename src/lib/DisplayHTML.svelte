<script lang='ts'>
    import {IncludesHTML, ReplaceLinks, TextToHTML} from '@solidbasisventures/intelliwaketsfoundation'

    export let value: string | null | undefined
    export let anchorClasses = ''
    /**
     * Use the noLinkReplace property to not try to change a URL into an anchor link
     */
    export let noLinkReplace = false

    $: valueLink = ((noLinkReplace ? (value ?? '') : ReplaceLinks(TextToHTML((value ?? '').toString()), anchorClasses)) ?? '').toString()

    $: isHTML = IncludesHTML((valueLink ?? '').toString())
</script>
{#if valueLink}
    {#if isHTML}
        <!--    eslint-disable-next-line svelte/no-at-html-tags-->
        {@html valueLink}
    {:else}
        {valueLink}
    {/if}
{/if}
