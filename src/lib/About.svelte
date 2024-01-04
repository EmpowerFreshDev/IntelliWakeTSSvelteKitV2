<script lang='ts'>
	import AboutBullets from './AboutBullets.svelte'
	import type {TAbout} from './AboutData'
	import {DateOnlyNull} from '@solidbasisventures/intelliwaketsfoundation'

	export let abouts: TAbout[]
</script>

<div class='p-4 mx-auto max-w-[40rem] overflow-y-auto'>
	{#each abouts.filter(about => !about.hidden || (typeof about.hidden === 'function' && !about.hidden())) as about}
		<h2 class='text-center'>v{about.version} - {about.title}</h2>
		{#if about.description}
			<div class='text-slate-400'>
				<small><i>{@html about.description}</i></small>
			</div>
		{/if}
		<div class='mx-2'>
			{#each about.minors.filter(minor => !minor.hidden || (typeof minor.hidden === 'function' && !minor.hidden())) as minor}
				<div class='border rounded overflow-hidden my-2 bg-white'>
					<div class='bg-slate-200 px-3 font-bold text-primary-main'>
						{about.version}.{minor.minor} - {minor.title}
						<span class='float-right font-thin text-sm'>{DateOnlyNull(minor.date, {formatLocale: true}) ?? ''}</span>
					</div>
					<div class='mb-2 mx-2 mt-2 text-sm'>
						<AboutBullets bullets={minor.bullets}/>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
