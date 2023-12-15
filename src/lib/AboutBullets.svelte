<script lang='ts'>
	import type {TAboutBullets, TRawAboutBulletObject, TRawAboutBulletStrings} from './AboutData'
	import {ToArray} from '@solidbasisventures/intelliwaketsfoundation'

	export let bullets: TAboutBullets[]

	$: structuredBullets = ToArray(bullets).reduce<{ stringBullets: TRawAboutBulletStrings[], objectBullets: TRawAboutBulletObject[] }>((result, bullet) => (typeof bullet === 'string' || Array.isArray(bullet)) ?
			{...result, stringBullets: [...result.stringBullets, bullet]} :
			{...result, objectBullets: [...result.objectBullets, bullet]},
		{stringBullets: [], objectBullets: []})
</script>

{#if bullets?.length}
	<ul>
		{#each structuredBullets.stringBullets as bullet}
			{#if Array.isArray(bullet)}
				<svelte:self bullets={bullet}/>
			{:else}
				<li>{@html bullet}</li>
			{/if}
		{/each}
	</ul>
	{#each structuredBullets.objectBullets as objectBullet}
		{#each Object.keys(objectBullet) as key}
			<h4 style='font-weight: normal;'>{key}</h4>
			<svelte:self bullets={objectBullet[key]}/>
		{/each}
	{/each}
{/if}

<style lang='postcss'>
	ul {
		@apply list-disc ml-4 mb-2;
	}
</style>
