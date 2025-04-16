<script>import { selectOnFocus } from "./Functions";
import { useActions } from "./useActions";
import { createEventDispatcher } from "svelte";
export let id = void 0;
export let value = "";
export let use = [];
export let delayMS = 500;
export let placeholder = "Search";
export let bordered = false;
export let element = void 0;
export let onChange = () => {
};
const dispatch = createEventDispatcher();
let nowValue;
const setNowValue = (loadValue) => {
  if (nowValue === void 0 || nowValue !== loadValue) {
    nowValue = loadValue;
  }
};
$: setNowValue(value);
let delayTimeout = setTimeout(() => 0, 100);
const triggerChange = (nextValue, delay) => {
  clearTimeout(delayTimeout);
  delayTimeout = setTimeout(() => {
    if (value !== nextValue) {
      value = nextValue ?? "";
      dispatch("change", value);
      onChange(value);
    }
  }, delay);
};
$: !!delayMS && triggerChange(nowValue, delayMS);
const keypress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    triggerChange(nowValue, 1);
  }
};
</script>

<input type='search'
       {id}
       use:useActions={use}
       use:selectOnFocus
       bind:this={element}
       {placeholder}
       bind:value={nowValue}
       class:!border-transparent={!bordered}
       class:print:hidden={!value}
       {...$$restProps}
       on:keydown={keypress}
       on:blur={() => triggerChange(nowValue, 1)}/>
