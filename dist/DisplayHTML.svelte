<script>import { IncludesHTML, ReplaceLinks, TextToHTML } from "@empowerfresh/intelliwake";
export let value;
export let anchorClasses = "";
export let noLinkReplace = false;
$: valueLink = ((noLinkReplace ? value ?? "" : ReplaceLinks(TextToHTML((value ?? "").toString()), anchorClasses)) ?? "").toString();
$: isHTML = IncludesHTML((valueLink ?? "").toString());
</script>

{#if valueLink}
    {#if isHTML}
        {@html valueLink}
    {:else}
        {valueLink}
    {/if}
{/if}
