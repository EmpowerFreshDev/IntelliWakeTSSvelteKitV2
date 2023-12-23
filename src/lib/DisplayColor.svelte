<script lang='ts'>
	import Fa from 'svelte-fa/src/fa.svelte'
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
	<Fa class='drop-shadow'
	    icon={faCircle}
	    {scale}
	    style={!hasColor ? 'color: transparent' : DisplayColorStyle(hue, saturation, lightness, {prefix: 'color: '})}/>
{:else if showNoColorSymbol || forceNoColorSymbol}
	<Fa icon={faCircleXmark}
	    {scale}
		style='color: grey'/>
{/if}
