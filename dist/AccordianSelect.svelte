<script>import { RandomString } from "@empowerfresh/intelliwake";
import { browser } from "$app/environment";
import { onDestroy, onMount, tick } from "svelte";
import { useActions } from "./useActions";
export let items;
let clazz = "";
export { clazz as class };
export let centered = false;
export let height = "1.25em";
export let maxHeight = "10em";
export let minHeight = "1.25em";
export let value = void 0;
export let disabled = false;
export let readonly = false;
export let name = void 0;
export let form = void 0;
export let hidden = false;
export let use = [];
export let required = true;
export let show = !value && !disabled && !readonly;
export let id = RandomString(6);
let scroller;
let inputElement;
let wasShowing = false;
let isMoving = false;
let observer;
let finalScroll = setTimeout(() => {
}, 10);
function scrollToItem(itemID) {
  clearTimeout(finalScroll);
  if (browser && show && itemID) {
    const selectedBounding = document.getElementById(`accordianSelect_${id}_${itemID}`)?.getBoundingClientRect();
    if (selectedBounding) {
      scroller.scrollTo({
        top: selectedBounding.top,
        //, scrollerBounding?.top, 1),
        left: 0,
        behavior: "instant"
      });
      finalScroll = setTimeout(() => {
        scroller.scrollTo({
          top: selectedBounding.top,
          //, scrollerBounding?.top, 1),
          left: 0,
          behavior: "instant"
        });
      }, 100);
    }
  }
}
onMount(() => {
  observer = new ResizeObserver(() => {
    if (value) {
      scrollToItem(value);
    }
  });
  observer.observe(scroller);
  scrollToItem(value);
});
onDestroy(() => {
  clearTimeout(finalScroll);
  observer.disconnect();
});
function setItem(itemID) {
  if (show) {
    if (value == itemID) {
      tick().then(() => show = false);
    } else {
      value = itemID;
      tick().then(() => {
        if (inputElement) {
          inputElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
          inputElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
        }
      });
    }
  } else {
    show = !disabled && !readonly;
  }
}
function doShow() {
  if (!show) {
    show = !disabled && !readonly;
  }
}
function doClose() {
  if (show) {
    if (isMoving) {
      setTimeout(() => tick().then(() => isMoving = false), 250);
    } else {
      show = false;
    }
  }
}
$: if (show) {
  wasShowing = true;
} else {
  setTimeout(() => {
    wasShowing = false;
  }, 500);
}
$: value && doClose();
$: if (!value && required) {
  show = !disabled && !readonly;
}
const keyDown = (e) => {
  if (show) {
    e.stopPropagation();
    switch (e.key) {
      case "Escape":
      case "Enter":
        show = !disabled && !readonly;
        e.preventDefault();
        break;
      case "ArrowDown":
        if (items.length) {
          const highlightedIndex = items.findIndex((item) => item.id == value && !item.disabled);
          isMoving = true;
          if (highlightedIndex === -1) {
            value = items.at(items.length - 1)?.id;
          } else if (highlightedIndex >= items.length - 1) {
            value = items.at(0)?.id;
          } else {
            value = items.at(highlightedIndex + 1)?.id;
          }
          tick().then(() => {
            if (inputElement) {
              inputElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
              inputElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
            }
          });
        }
        e.preventDefault();
        break;
      case "ArrowUp":
        if (items.length) {
          const highlightedIndex = items.findIndex((item) => item.id == value && !item.disabled);
          isMoving = true;
          if (highlightedIndex <= 0) {
            value = items.at(items.length - 1)?.id;
          } else {
            value = items.at(highlightedIndex - 1)?.id;
          }
          tick().then(() => {
            if (inputElement) {
              inputElement.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
              inputElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
            }
          });
        }
        e.preventDefault();
        break;
    }
  }
};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class='overflow-hidden inputControl {clazz}'
     {hidden}
     use:useActions={use}
     class:overflow-hidden={!show}
     class:overflow-y-scroll={show}
     style='max-height: {maxHeight}; min-height: {minHeight}'
     bind:this={scroller}
     on:focus={doShow}
     on:keydown={keyDown}
     on:blur={() => show && tick().then(() => {
		 if (!required || value) show = false
     })}
     tabindex={0}>
	{#each items as item (item.id)}
		{@const isSelected = item.id == value}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div class='text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer -mx-2 px-2'
		     id='accordianSelect_{id}_{item.id}'
		     class:transition-all={show || wasShowing}
		     class:hover:bg-slate-100={show && !isSelected}
		     class:dark:hover:bg-slate-500={show && !isSelected}
		     role='listitem'
		     class:text-center={centered}
		     class:bg-primary-main={isSelected && show}
		     class:text-white={isSelected && show}
		     style={`height: ${show ? `calc(${height} + 0.25em)` : isSelected ? height : "0px"};`}
		     on:keydown|preventDefault
		     on:click={() => setItem(item.id)}>
			{item.title}
		</div>
	{/each}
</div>

{#if name}
	<input type='hidden'
	       bind:this={inputElement}
	       {name}
	       {value}
	       {required}
	       {form}/>
{/if}
