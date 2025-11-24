<script>import AboutBullets from "./AboutBullets.svelte";
import { DateCompare, DateOnly, DateOnlyNull } from "@solidbasisventures/intelliwaketsfoundation";
export let abouts;
export let filterBackAdjustment = void 0;
export let filterBackMinorCount = void 0;
function getAbouts(as, adjustment, minorCount) {
  let minorsCounted = 0;
  return as.reduce((results, about) => {
    if (!(!about.hidden || typeof about.hidden === "function" && !about.hidden())) return results;
    const nextAbout = {
      ...about,
      minors: about.minors.reduce((minorResults, minor) => {
        if (!(!minor.hidden || typeof minor.hidden === "function" && !minor.hidden())) return minorResults;
        minorsCounted++;
        const dateAllowed = !adjustment || !minor.date || DateCompare(DateOnly(minor.date, adjustment), "IsAfter", "now", "day");
        const countAllowed = !minorCount || minorCount >= minorsCounted;
        if (dateAllowed && countAllowed) return [...minorResults, minor];
        if (!!adjustment && !!minorCount && (dateAllowed || countAllowed)) return [...minorResults, minor];
        if (!!adjustment && dateAllowed) return [...minorResults, minor];
        if (!!minorCount && countAllowed) return [...minorResults, minor];
        return minorResults;
      }, [])
    };
    if (!nextAbout.minors.length) return results;
    return [...results, nextAbout];
  }, []);
}
$: useAbouts = getAbouts(abouts, filterBackAdjustment, filterBackMinorCount);
</script>

<div class='p-4 mx-auto max-w-[40rem] overflow-y-auto'>
	{#each useAbouts as about}
		<h2 class='text-center'><span class="font-thin inline-block mr-2">v{about.version}</span> {about.title}</h2>
		{#if about.description}
			<div class='text-slate-400'>
				<small><i>{@html about.description}</i></small>
			</div>
		{/if}
		<div class='mx-2'>
			{#each about.minors as minor}
				<div class='border rounded overflow-hidden my-2 bg-white'>
					<div class='bg-slate-200 px-3 font-bold text-primary-main'>
						<span class="font-thin inline-block mr-1">{about.version}.{minor.minor}</span> {minor.title}
						<span
							class='inline-block float-right font-thin text-slate-400 text-sm'>{DateOnlyNull(minor.date, { formatLocale: true }) ?? ''}</span>
					</div>
					<div class='mb-2 mx-2 mt-2 text-sm'>
						<AboutBullets bullets={minor.bullets} />
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
