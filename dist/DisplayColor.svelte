<script>import Icon from "./Icon.svelte";
import { faCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { DisplayColorStyle } from "./DisplayColorStyle";
export let hue = null;
export let saturation = null;
export let lightness = null;
export let scale = 1;
export let allowInvisible = false;
export let showNoColorSymbol = false;
export let forceNoColorSymbol = false;
$: hasColor = hue != null && saturation != null && lightness != null;
</script>

{#if (hasColor || allowInvisible) && !forceNoColorSymbol}
	<Icon class='drop-shadow'
	    icon={faCircle}
	    {scale}
	    style={!hasColor ? 'color: transparent' : DisplayColorStyle(hue, saturation, lightness, {prefix: 'color: '})}/>
{:else if showNoColorSymbol || forceNoColorSymbol}
	<Icon icon={faCircleXmark}
	    {scale}
		style='color: grey'/>
{/if}
