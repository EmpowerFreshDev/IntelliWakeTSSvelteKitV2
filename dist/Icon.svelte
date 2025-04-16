<script>import { onMount } from "svelte";
import { CleanNumber } from "@empowerfresh/intelliwake";
let clazz = "";
export { clazz as class };
export let id = "";
export let style = "";
export let icon = void 0;
export let title = void 0;
export let size = "";
export let color = "";
export let fw = false;
export let pull = "";
export let scale = 1;
export let translateX = 0;
export let translateY = 0;
export let rotate = 0;
export let flip = false;
export let spin = false;
export let pulse = false;
export let primaryColor = "";
export let secondaryColor = "";
export let primaryOpacity = 1;
export let secondaryOpacity = 0.4;
export let swapOpacity = false;
export function setCustomSize(element, size2) {
  if (size2 && size2 !== "lg" && size2 !== "sm" && size2 !== "xs") {
    element.style.fontSize = size2.replace("x", "em");
  }
}
export function getTransform(scale2, translateX2, translateY2, rotate2, flip2, translateTimes = 1, translateUnit = "", rotateUnit = "deg") {
  let flipX = 1;
  let flipY = 1;
  if (flip2) {
    if (flip2 == "horizontal") {
      flipX = -1;
    } else if (flip2 == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  let output = `translate(${CleanNumber(translateX2) * translateTimes}${translateUnit},${CleanNumber(translateY2) * translateTimes}${translateUnit}) scale(${flipX * CleanNumber(scale2, 2)},${flipY * CleanNumber(scale2, 2)})`;
  if (rotate2) {
    output += ` rotate(${rotate2}${rotateUnit})`;
  }
  return output;
}
let i;
let transform;
let svgElement;
onMount(() => {
  setCustomSize(svgElement, size);
});
$: i = icon && icon.icon || [0, 0, "", [], ""];
$: transform = getTransform(scale, translateX, translateY, CleanNumber(rotate), flip, 512);
</script>

<style>
	:global(.svelte-fa-base) {
		height: 1em;
		overflow: visible;
		transform-origin: center;
		vertical-align: -.125em;
	}

	:global(.svelte-fa-fw) {
		text-align: center;
		width: 1.25em;
	}

	.svelte-fa-pull-left {
		float: left;
	}

	.svelte-fa-pull-right {
		float: right;
	}

	.svelte-fa-size-lg {
		font-size: 1.33333em;
		line-height: .75em;
		vertical-align: -.225em;
	}

	.svelte-fa-size-sm {
		font-size: .875em;
	}

	.svelte-fa-size-xs {
		font-size: .75em;
	}

	.spin {
		animation: spin 2s 0s infinite linear;
	}

	.pulse {
		animation: spin 1s infinite steps(8);
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

{#if !!icon && i[4]}
	<svg
		id={id || undefined}
		bind:this={svgElement}
		class='svelte-fa svelte-fa-base {clazz}'
		class:pulse
		class:svelte-fa-size-lg={size === 'lg'}
		class:svelte-fa-size-sm={size === 'sm'}
		class:svelte-fa-size-xs={size === 'xs'}
		class:svelte-fa-fw={fw}
		class:svelte-fa-pull-left={pull === 'left'}
		class:svelte-fa-pull-right={pull === 'right'}
		class:spin
		style={style !== '' ? style : null}
		viewBox='0 0 {i[0]} {i[1]}'
		aria-hidden='true'
		role='img'
		xmlns='http://www.w3.org/2000/svg'
	>
		{#if title}
			<title>{title}</title>
		{/if}
		<g
			transform='translate({i[0] / 2} {i[1] / 2})'
			transform-origin='{i[0] / 4} 0'
		>
			<g {transform}>
				{#if typeof i[4] == 'string'}
					<path
						d={i[4]}
						fill={color || primaryColor || 'currentColor'}
						transform='translate({i[0] / -2} {i[1] / -2})'
					/>
				{:else}
					<!-- Duotone icons -->
					<path
						d={i[4][0]}
						fill={secondaryColor || color || 'currentColor'}
						fill-opacity={swapOpacity != false ? primaryOpacity : secondaryOpacity}
						transform='translate({i[0] / -2} {i[1] / -2})'
					/>
					<path
						d={i[4][1]}
						fill={primaryColor || color || 'currentColor'}
						fill-opacity={swapOpacity != false ? secondaryOpacity : primaryOpacity}
						transform='translate({i[0] / -2} {i[1] / -2})'
					/>
				{/if}
			</g>
		</g>
	</svg>
{/if}
