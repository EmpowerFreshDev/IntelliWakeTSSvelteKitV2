<script lang='ts'>
	import type { ITabItem } from './Definitions'
	import { DeepEqual, SortCompare } from '@empowerfresh/intelliwake'
	import Icon from '$lib/Icon.svelte'

	export let tabItems: ITabItem[] = []
	export let currentKey: string | undefined = tabItems.find(tabItem => !tabItem.hidden)?.key ?? undefined

	let openedKeys: string[] = []

	$: visibleItems = tabItems.filter(tabItem => !tabItem.hidden)

	const checkKey = (curKey: string | undefined, items: ITabItem[]) => {
		if (items.length === 0) {
			if (curKey) {
				currentKey = undefined
			}
		} else if (!items.some(item => item.key === curKey)) {
			currentKey = tabItems.find(tabItem => !tabItem.hidden)?.key ?? undefined
		}

		const newOpenedKeys = items.filter(item => item.key === curKey || openedKeys.includes(item.key)).map(item => item.key).sort(SortCompare)

		if (!DeepEqual(openedKeys, newOpenedKeys)) openedKeys = newOpenedKeys
	}

	$: checkKey(currentKey, visibleItems)

</script>

<div class='grid mx-auto mb-2'
		 style={`grid-template-columns: repeat(${visibleItems.length}, minmax(0, 1fr))`}>
	{#each visibleItems as item}
		<button
			class='btnClean bg-transparent border-transparent border-b-4 text-black shadow-none drop-shadow-none rounded-none focus:ring-0 m-2 min-w-[3em] text-ellipsis whitespace-nowrap overflow-hidden hover:bg-transparent hover:border-b-primary-main'
			class:!text-primary-main={currentKey === item.key}
			class:!border-b-primary-main={currentKey === item.key}
			class:!hover:bg-transparent={currentKey === item.key}
			class:!hover:text-primary-main={currentKey === item.key}
			on:click={() => currentKey = item.key}>
			{#if !!item.faProps}
				<Icon
					{...item.faProps}
					class='inline-block mr-1'
					fw
				/>
				<span class:hidden={visibleItems.length > 4}
							class:md:inline={visibleItems.length > 4}>{item.title ?? item.key}</span>
			{:else}
				{item.title ?? item.key}
			{/if}
		</button>
	{/each}
</div>
