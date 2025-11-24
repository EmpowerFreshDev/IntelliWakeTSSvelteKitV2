<script>import { DeepEqual, SortCompare } from "@solidbasisventures/intelliwaketsfoundation";
import Icon from "./Icon.svelte";
export let tabItems = [];
export let currentKey = tabItems.find((tabItem) => !tabItem.hidden)?.key ?? void 0;
let openedKeys = [];
$: visibleItems = tabItems.filter((tabItem) => !tabItem.hidden);
const checkKey = (curKey, items) => {
  if (items.length === 0) {
    if (curKey) {
      currentKey = void 0;
    }
  } else if (!items.some((item) => item.key === curKey)) {
    currentKey = tabItems.find((tabItem) => !tabItem.hidden)?.key ?? void 0;
  }
  const newOpenedKeys = items.filter((item) => item.key === curKey || openedKeys.includes(item.key)).map((item) => item.key).sort(SortCompare);
  if (!DeepEqual(openedKeys, newOpenedKeys)) openedKeys = newOpenedKeys;
};
$: checkKey(currentKey, visibleItems);
</script>

<div class='grid grid-rows-[auto_1fr] overflow-hidden'>
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
					<Icon {...item.faProps}
								class='inline-block mr-1'
								fw />
					{#if visibleItems.length > 4}
						{item.title ?? item.key}
					{/if}
				{:else}
					{item.title ?? item.key}
				{/if}
			</button>
		{/each}
	</div>
	{#each visibleItems.filter(item => openedKeys.includes(item.key)) as visibleItem (visibleItem.key)}
		<div class='grid grid-rows-1 overflow-hidden'
				 class:hidden={visibleItem.key !== currentKey}>
			<svelte:component this={visibleItem.pane} />
		</div>
	{/each}
</div>
