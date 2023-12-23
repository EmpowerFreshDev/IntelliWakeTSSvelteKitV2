<script lang='ts'>
	import Icon from "svelte-awesome"
	import {faCircle, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
	import {DisplayColorStyle} from './DisplayColorStyle'

	export let hue: number | null = null
	export let saturation: number | null = null
	export let lightness: number | null = null
	export let scale = 1
	export let allowInvisible = false
	export let showNoColorSymbol = false
	export let forceNoColorSymbol = false

	$: hasColor = hue != null && saturation != null && lightness != null
</script>

{#if (hasColor || allowInvisible) && !forceNoColorSymbol}
	<Icon class='drop-shadow'
	    data={faCircle}
	    {scale}
	    style={!hasColor ? 'color: transparent' : DisplayColorStyle(hue, saturation, lightness, {prefix: 'color: '})}/>
{:else if showNoColorSymbol || forceNoColorSymbol}
	<Icon data={faCircleXmark}
	    {scale}
		style='color: grey'/>
{/if}
