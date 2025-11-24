<script>import { RandomString } from "@solidbasisventures/intelliwaketsfoundation";
import { browser } from "$app/environment";
import { onMount } from "svelte";
import { useActions } from "./useActions";
export let items;
export let centered = true;
export let height = "1.5rem";
export let value = items[0];
export let disabled = false;
export let readonly = false;
export let name = void 0;
export let form = void 0;
export let hidden = false;
export let use = [];
export let id = RandomString(6);
let container;
let scroller;
let scrollTimer = setTimeout(() => {
}, 50);
function doScroll() {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const containerBounding = container?.getBoundingClientRect();
    if (containerBounding) {
      const containerCenterY = containerBounding.y + containerBounding.height / 2;
      const spunItem = items.reduce((result, item) => {
        const itemTop = document.getElementById(`spinner_${id}_${item.id}`)?.getBoundingClientRect().top ?? containerCenterY + 1;
        if (itemTop < containerCenterY && (!result || itemTop > result.itemTop)) {
          return { item, itemTop };
        }
        return result;
      }, null);
      if (!disabled && !readonly) {
        if (spunItem && spunItem.item.id !== value) {
          value = spunItem.item.id;
        }
      } else {
        scrollToItem(value, true);
      }
    }
  }, 300);
}
function scrollToItem(itemID, animated) {
  if (browser) {
    const baseBounding = document.getElementById(`spinner_${id}_${items[0].id}`)?.getBoundingClientRect();
    if (baseBounding) {
      const selectedBounding = document.getElementById(`spinner_${id}_${itemID}`)?.getBoundingClientRect();
      if (selectedBounding) {
        const top = selectedBounding.top - baseBounding.top;
        scroller.scrollTo({
          top,
          left: 0,
          behavior: animated ? "smooth" : "instant"
        });
      }
    }
  }
}
function setItem(itemID) {
  if (!disabled && !readonly) {
    value = itemID;
  }
}
$: scrollToItem(value, !disabled && !readonly);
onMount(async () => {
  scrollToItem(value, false);
});
</script>

<div class='overflow-hidden border grid grid-rows-1 relative focus:outline focus:outline-primary-main'
     {hidden}
     bind:this={container}
     use:useActions={use}
     tabindex={0}>
	<div class='absolute left-0 right-0 top-0 pointer-events-none bg-slate-100 opacity-50'
	     style='height: calc(50% - ({height} * 0.5));'></div>
	<div class='absolute left-0 right-0 top-0 pointer-events-none backdrop-blur-[0.5px]'
	     style='height: calc(50% - ({height} * 0.5));'></div>
	<div class='absolute left-0 right-0 bottom-0 pointer-events-none bg-slate-100 opacity-50'
	     style='height: calc(50% - ({height} * 0.5));'></div>
	<div class='absolute left-0 right-0 bottom-0 pointer-events-none backdrop-blur-[0.5px]'
	     style='height: calc(50% - ({height} * 0.5));'></div>
	<div class='overflow-y-scroll snap-mandatory snap-y'
	     bind:this={scroller}
	     on:scroll={doScroll}>
		<div style='height: calc(50% - ({height} * 0.5));'>
		</div>
		{#each items as item (item.id)}
			<div class='text-ellipsis whitespace-nowrap overflow-hidden px-1 snap-center cursor-pointer hover:font-bold'
			     id='spinner_{id}_{item.id}'
			     role='listitem'
			     class:text-center={centered}
			     class:opacity-30={item.id != value}
			     class:font-bold={item.id == value}
			     style='height: {height};'
			     on:keydown|preventDefault
			     on:click={() => setItem(item.id)}>
				{item.title}
			</div>
		{/each}
		<div style='height: calc(50% - ({height} * 0.5));'>
		</div>
	</div>
</div>

{#if name}
	<input type='hidden'
	       {name}
	       {value}
	       {form}/>
{/if}
