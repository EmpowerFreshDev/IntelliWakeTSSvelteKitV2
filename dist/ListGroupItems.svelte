<script>import { ToPascalCase } from "@empowerfresh/intelliwake";
import Icon from "./Icon.svelte";
import DisplayHTML from "./DisplayHTML.svelte";
import { KEY_STRING_ENTER, KEY_STRING_SPACE } from "./Functions";
export let listItems = [];
export let emptyListMessage = null;
export let subsExist = false;
export let topValue = null;
export let active = true;
export let indentLevel = 0;
export let collapsedValues = [];
export let collapsedSections = [];
export let rememberKey = null;
export let pathAnalyzer = void 0;
export let wrapText = false;
export let ellipses = false;
export let noLinkReplace = false;
export let rounded = false;
const pathFromItem = (modalItem) => {
  return modalItem.href ?? ToPascalCase((modalItem.title ?? "").toString()) + (modalItem.value ? `:${modalItem.value}` : "");
};
$: useSubsExist = !!subsExist || !!listItems?.some((item) => !!item.parent_value && (active === null || item.hidden !== active));
function shouldShowTopItem(item, useTopValue, useActive, useListItems) {
  const isTopValue = (item.parent_value ?? null) === useTopValue;
  const isShown = useActive === null || useActive === !item.hidden;
  const hasVisibleChild = useListItems.some((listItem) => {
    const hasChild = !!listItem?.parent_value && listItem.parent_value === item.value;
    const isChildShown = useActive === null || useActive === !listItem?.hidden;
    return hasChild && isChildShown;
  });
  return isTopValue && (isShown || hasVisibleChild);
}
$: subItems = (listItems ?? []).filter((item) => !!item && shouldShowTopItem(item, topValue, active, listItems)).map((listItem) => ({
  ...listItem,
  pathFromItem: pathAnalyzer?.open(pathFromItem(listItem)),
  isOpen: !!pathAnalyzer?.isOpen(pathFromItem(listItem)),
  collapsed: !!collapsedValues?.some((val) => val === listItem.value),
  subs: !useSubsExist ? [] : (listItems ?? []).filter((item) => item?.parent_value === listItem?.value && (active === null || item?.hidden !== active)).map((listItemSub) => ({
    ...listItemSub,
    pathFromItem: pathAnalyzer?.open(pathFromItem(listItemSub)),
    isOpen: !!pathAnalyzer?.isOpen(pathFromItem(listItemSub)),
    collapsed: !!collapsedValues?.some((val) => val === listItemSub.value)
  }))
}));
function collapseToggle(value) {
  if (value) {
    if ((collapsedValues ?? []).some((val) => val === value)) {
      collapsedValues = collapsedValues?.filter((val) => val !== value) ?? [];
    } else {
      collapsedValues = [...collapsedValues, value];
    }
  }
}
function getKey(listItem) {
  return listItem.key ?? `${listItem.value ?? "v"}:${listItem.title ?? listItem.paneName ?? "t"}:${listItem.sub_title ?? "st"}:${listItem.badgeValue ?? "bv"}:${listItem.rightText ?? "rt"}}`;
}
function sectionClick(section) {
  if ((collapsedSections ?? []).some((sect) => sect === section)) {
    collapsedSections = collapsedSections.filter((cS) => cS !== section);
  } else {
    collapsedSections = [...collapsedSections ?? [], section];
  }
}
function doKeyExecute(e, doFunction) {
  if ((e.key === KEY_STRING_ENTER || e.key === KEY_STRING_SPACE) && doFunction) {
    doFunction();
  }
}
</script>

<!--<svelte:window on:RouterBack={doRouterBack}/>-->

<ul class='listGroup'
    class:px-2={rounded}
    class:ml-4={!!indentLevel}
    class:max-sm:text-xl={true}
		class:pb-4={rounded}>
	{#if !subItems?.length && (!!emptyListMessage || !!$$slots?.empty)}
		<li class='block w-full select-none text-slate-500 italic p-1 text-sm'>
			<DisplayHTML noLinkReplace
			             value={emptyListMessage}/>
			<slot name='empty'/>
		</li>
	{:else}
		{#each subItems as listItem, idx (getKey(listItem))}
			{#if listItem?.section && listItem.section !== subItems[idx - 1]?.section}
				<li class='block w-full select-none opacity-80 hover:opacity-70 font-bold p-1 cursor-pointer'
				    class:mt-4={rounded}
				    class:overflow-x-hidden={wrapText || ellipses}
				    class:whitespace-nowrap={!wrapText}
				    class:mt-1={idx > 0}
				    class:bg-primary-main={!rounded}
				    class:text-white={!rounded}
				    title={listItem.hover_title}
				    role='menuitem'
				    tabindex={0}
				    on:keydown={e => doKeyExecute(e, () => sectionClick(listItem.section ?? ""))}
				    on:click={() => sectionClick(listItem?.section ?? "")}>
					<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
					             value={listItem.section}/>
				</li>
			{/if}

			{#if !listItem?.section || !(collapsedSections ?? []).some(sect => sect === listItem.section)}
				{@const closedRounded = rounded && !listItem.disabled && !listItem.isOpen}
				{@const openRounded = rounded && !listItem.disabled && listItem.isOpen}

				<li class={`w-full select-none ${listItem.itemClass ?? ''}`}
				    class:overflow-x-hidden={wrapText || ellipses}
				    class:cursor-pointer={!listItem.disabled}
				    class:border-b={!useSubsExist}
				    class:border-gray-200={!useSubsExist}
				    class:dark:border-slate-500={!useSubsExist}
				    class:block={!useSubsExist}
				    class:grid={useSubsExist}
				    class:grid-cols-[2rem_1fr]={useSubsExist}
				    class:line-through={!!listItem.strikeThrough}
				    class:selected={listItem.isOpen}
				    class:disabled={listItem.disabled}

				    class:text-white={!rounded && !listItem.disabled && listItem.isOpen}
				    class:hover:text-white={!rounded && !listItem.disabled}
				    class:bg-primary-main={!rounded && !listItem.disabled && listItem.isOpen}
				    class:hover:bg-primary-main={!rounded && !listItem.disabled && !listItem.isOpen}
				    class:hover:bg-primary-hover={!rounded && !listItem.disabled && listItem.isOpen}

				    class:text-black={openRounded}
				    class:hover:text-black={closedRounded}
				    class:bg-gray-300={openRounded}
				    class:hover:bg-gray-300={closedRounded}
				    class:hover:bg-gray-400={openRounded}
				    class:transition-all={rounded}

				    class:roundedListGroupItem={rounded}
				    class:p-0={rounded}
				    class:border-none={rounded}
				    class:rounded-lg={rounded}

				    title={listItem.hover_title}
				    role='menuitem'
				    tabindex={listItem.pathFromItem && !listItem.linkClick ? -1 : 0}
				    on:keydown={e => doKeyExecute(e, listItem.linkClick)}
				    on:click={listItem.linkClick}>
					{#if useSubsExist}
						<div class='cursor-pointer text-center pt-3'
						     role='button'
						     tabindex={-1}
						     on:keydown|stopPropagation={() => collapseToggle(listItem.value)}
						     on:click|stopPropagation={() => collapseToggle(listItem.value)}>
							{#if (listItem.subs ?? []).length}
								<svg xmlns='http://www.w3.org/2000/svg'
								     class='inline'
								     style='rotate: {listItem.collapsed ? "180" : "0"}deg; vertical-align: 0.125em;'
								     height='16'
								     width='14'
								     viewBox='0 0 512 512'>
									<path
										fill='currentColor'
										d='M224 365.3l22.6-22.6 160-160L429.3 160 384 114.7l-22.6 22.6L224 274.7 86.6 137.4 64 114.7 18.7 160l22.6 22.6 160 160L224 365.3z'/>
								</svg>
							{/if}
						</div>
					{/if}
					{#if listItem.pathFromItem && !listItem.linkClick}
						<a href={listItem.pathFromItem}
						   tabindex={0}
						   data-sveltekit-preload-data={listItem.dataSvelteKitPreloadData ?? "tap"}
						   class='py-2 pr-3 w-full grid grid-cols-[auto,1fr,auto] overflow-x-hidden'
						   class:pl-3={!useSubsExist}>
							<div
								class='inline-block relative'
								class:w-7={(!!listItem.faProps || !!listItem.icon) && !listItem.bigIcon}
								class:w-10={(!!listItem.faProps || !!listItem.icon) && listItem.bigIcon}
							  class:row-span-2={listItem.bigIcon}>
								{#if !!listItem.faProps}
									<Icon fw
									      class={`mr-2 inline-block ${!listItem.bigIcon ? '' : 'ml-2'}`}
									      scale={!listItem.bigIcon ? 1 : 2}
									      {...listItem.faProps}/>
								{/if}
								{#if !!listItem.icon}
									<Icon fw
									      icon={listItem.icon}
									      scale={!listItem.bigIcon ? 1 : 2}
									      class={`mr-2 inline-block top-1/2 -translate-y-1/2 absolute ${!listItem.bigIcon ? '' : 'left-1.5'}`}/>
								{/if}
							</div>
							<div class='overflow-hidden'
							     class:whitespace-nowrap={!wrapText}
							     class:text-ellipsis={!wrapText && ellipses}
							     title={!ellipses ? undefined : listItem.title}>
								<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
								             value={listItem.title}/>
								{#if listItem.sub_title && !rounded}
									<div class='text-sm font-thin'>
										<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
										             value={listItem.sub_title}/>
									</div>
								{/if}
							</div>
							<div class='inline-block'>
								{#if listItem.badgeValue !== undefined && listItem.badgeValue !== null}
									<div class='px-1 rounded-full ml-2 text-sm py-0 min-w-[1em] leading-tight {listItem.badgeClass ?? ""}'
									     class:bg-primary-main={!listItem.isOpen && !rounded}
									     class:text-white={!listItem.isOpen && !rounded}
									     class:bg-white={listItem.isOpen && !rounded}
									     class:text-black={listItem.isOpen && !rounded}
									     class:inline-block={!rounded}
									     class:mt-1={!rounded}
									     class:my-0.5={rounded}
									     class:px-2={rounded}
									     class:h-5={rounded}
									     class:leading-4={rounded}
									     class:py-0.5={rounded}
									     style={listItem.isOpen ? listItem.badgeColor ? `color: ${listItem.badgeColor}` : undefined : listItem.badgeColor ? `background-color: ${listItem.badgeColor}` : undefined}>
										{listItem.badgeValue}
									</div>
								{/if}
								{#if listItem.rightText !== undefined && listItem.rightText !== null}
									<div class='inline-block float-right px-1 ml-2 py-0 mt-0.5 min-w-[1em] leading-tight'>
										{listItem.rightText}
									</div>
								{/if}
							</div>

							<!-- row 2 -->
							<div class:col-span-3={!listItem.bigIcon} class:col-span-2={listItem.bigIcon}>
								{#if listItem.sub_title && rounded}
									<div class='text-sm font-light text-gray-700 text-justify mt-0.5'>
										<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
										             value={listItem.sub_title}/>
									</div>
								{/if}
							</div>
						</a>
					{:else}
						<div class='py-2 px-3 grid grid-cols-[auto,1fr,auto] overflow-hidden'
						     class:pl-3={!useSubsExist}>
							<div
								class='inline-block relative'
								class:w-7={(!!listItem.faProps || !!listItem.icon) && !listItem.bigIcon}
								class:w-10={(!!listItem.faProps || !!listItem.icon) && listItem.bigIcon}>
								{#if !!listItem.faProps}
									<Icon
										fw
										{...listItem.faProps}
										scale={!listItem.bigIcon ? 1 : 2}
										class={`mr-2 inline-block top-1/2 -translate-y-1/2 absolute ${!listItem.bigIcon ? '' : 'ml-2'}`}
									/>
								{/if}
								{#if !!listItem.icon}
									<Icon
										fw
										icon={listItem.icon}
										scale={!listItem.bigIcon ? 1 : 2}
										class={`mr-2 inline-block top-1/2 -translate-y-1/2 absolute ${!listItem.bigIcon ? '' : 'left-1.5'}`}
									/>
								{/if}
							</div>
							<div class='overflow-hidden'
							     class:whitespace-nowrap={!wrapText}
							     class:text-ellipsis={!wrapText && ellipses}
							     title={!ellipses ? undefined : listItem.title}>
								<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
								             value={listItem.title}/>
								{#if listItem.sub_title}
									<div class='text-sm font-thin'>
										<DisplayHTML noLinkReplace={listItem.noLinkReplace ?? noLinkReplace}
										             value={listItem.sub_title}/>
									</div>
								{/if}
							</div>
							{#if listItem.badgeValue !== undefined && listItem.badgeValue !== null}
								<div>
									<div class='px-1 rounded-full ml-2 text-[0.75em] py-0 mt-1 leading-tight {listItem.badgeClass ?? ""}'
									     class:bg-primary-main={!listItem.isOpen}
									     class:text-white={!listItem.isOpen}
									     class:bg-white={listItem.isOpen}
									     class:text-black={listItem.isOpen}
									     style={listItem.isOpen ? listItem.badgeColor ? `color: ${listItem.badgeColor}` : undefined : listItem.badgeColor ? `background-color: ${listItem.badgeColor}` : undefined}>
										{listItem.badgeValue}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</li>
				{#if !listItem.collapsed && !!(listItem.subs ?? []).length}
					<svelte:self listItems={listItems}
					             topValue={listItem.value}
					             {pathAnalyzer}
					             subsExist={useSubsExist}
					             indentLevel={indentLevel + 1}
					             {rememberKey}
					             {active}
					             bind:collapsedValues/>
				{/if}
			{/if}
		{/each}
	{/if}
</ul>
