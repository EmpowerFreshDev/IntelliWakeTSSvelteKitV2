<script>import { ToArray } from "@solidbasisventures/intelliwaketsfoundation";
export let bullets;
$: structuredBullets = ToArray(bullets).reduce(
  (result, bullet) => bullet === null ? result : typeof bullet === "string" || Array.isArray(bullet) ? { ...result, stringBullets: [...result.stringBullets.filter((sb) => sb !== null), bullet] } : { ...result, objectBullets: [...result.objectBullets, bullet] },
  { stringBullets: [], objectBullets: [] }
);
</script>

{#if bullets?.length}
	<ul>
		{#each structuredBullets.stringBullets as bullet}
			{#if Array.isArray(bullet)}
				<svelte:self bullets={bullet} />
			{:else}
				<li>{@html bullet}</li>
			{/if}
		{/each}
	</ul>
	{#each structuredBullets.objectBullets as objectBullet}
		{#each Object.keys(objectBullet) as key}
			<h4 style='font-weight: normal;'>{key}</h4>
			<svelte:self bullets={objectBullet[key]} />
		{/each}
	{/each}
{/if}

<style>
    ul {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    list-style-type: disc
}
</style>
