<script lang='ts'>
	import {DeepEqual, SearchRows} from '@empowerfresh/intelliwake'
	import DropDownControl from '$lib/DropDownControl.svelte'
	import {onMount, tick} from 'svelte'
	import {ShowMessageBox} from '$lib/Definitions'
	import DisplayHTML from '$lib/DisplayHTML.svelte'
	import {type ActionArray, useActions} from '$lib/useActions'

	// eslint-disable-next-line no-undef
	type T = $$Generic<{
		name?: string | null,
		id?: string | number | null
	} & Record<string, any>>

	export let show = false
	export let use: ActionArray = []
	export let possibles: T[]
	export let selected: T[] = []
	export let selectedIDs: (number | string)[] | undefined = undefined
	export let created: T[] = []
	export let existing: T[] = []
	export let name: string | null = null
	export let placeholder = ''
	export let disabled = false
	export let readonly = false
	export let required = false
	export let invalid = false
	export let isMulti = true
	export let allowClearAll = true
	export let createPrefix = 'Create:'
	export let create: undefined | ((value: string) => T | null) = undefined
	export let createValid: undefined | ((value: string) => boolean | string) = undefined
	export let displayValue: ((item: T) => string | number) = (item: T) => item.name ?? item.id ?? ''
	export let idValue: ((item: T) => any) = (item: T) => item.id ?? displayValue(item)
	/** Compute the value of the "key" in the "each" statements to make them unique */
	export let keyValue: ((item: T, idx?: number) => any) = (item: T) => idValue(item)
	export let inputValue: ((item: T) => any) = (item: T) => idValue(item)
	export let sameSize = true
	export let resizeTS = 1
	export let autoFocus = false
	export let zIndex = 50
	export let bodyClass = ''
	export let parentDivElement: HTMLDivElement | null = null
	export let form: string | undefined = undefined

	let searchValue = ''
	let selectedIndex = 0
	let elInput: HTMLInputElement | null = null
	let initialPass = true

	$: disable = disabled || readonly

	async function resizeDD() {
		await tick()
		resizeTS = new Date().valueOf()
	}

	async function doAdd(item: T | null | undefined) {
		if (!disable) {
			if (item) {
				selected = [...selected, item]
				searchValue = ''
				await tick()
				if (elInput) elInput.focus()
			}
		}
	}

	async function doClear(item: T) {
		if (!disable) {
			selected = selected.filter(s => !DeepEqual(idValue(s), idValue(item)))
			if (elInput) {
				await tick()
				elInput.focus()
			}
		}
	}

	async function doClearAll() {
		if (!disable) {
			if (allowClearAll) {
				selected = []
				await tick()
			}
			if (elInput) {
				await tick()
				elInput.focus()
			}
		}
	}

	async function doCreate() {
		if (!disable) {
			if (searchValue && create) {
				if (!createValid) {
					doAdd(create(searchValue))
				} else {
					const valid = createValid(searchValue)
					if (valid === true) {
						doAdd(create(searchValue))
					} else if (typeof valid === 'string') {
						ShowMessageBox.show(valid)
					}
				}
			}
		}
	}

	$: listItems = SearchRows(possibles.filter(poss => !selected.some(sel => DeepEqual(idValue(sel), idValue(poss)))), searchValue)
		.map(item => ({
			display: displayValue(item),
			id: idValue(item),
			item
		}))

	function setSelectedIDs(sels: T[]) {
		if (!initialPass && selectedIDs && (selectedIDs.length !== sels.length || !sels.every(sel => selectedIDs?.some(selID => selID === idValue(sel))))) {
			selectedIDs = sels.map(sel => idValue(sel))
		}
	}

	$: setSelectedIDs(selected)

	function setSelected(selIDs: (string | number)[] | undefined, poss: T[]) {
		if (selIDs && (selIDs.length !== selected.length || !selected.every(sel => selIDs?.some(selID => selID === idValue(sel))))) {
			selected = poss.filter(po => selIDs.some(selID => selID == idValue(po)))
		}
	}

	$: setSelected(selectedIDs, possibles)

	function onKeyPress(e: KeyboardEvent) {
		if (!disable) {
			switch (e.key) {
				case 'Enter':
					if (show) {
						if (selectedIndex === -1) {
							doCreate()
						} else {
							doAdd(listItems[selectedIndex]?.item)
						}
						e.stopPropagation()
						e.preventDefault()
					}
					break
				case 'Backspace':
					if (!searchValue) selected = selected.slice(0, -1)
					break
				case 'ArrowDown':
					if (!show) {
						show = true
					} else if (selectedIndex < listItems.length - 1) {
						selectedIndex++
					} else {
						selectedIndex = ((create && searchValue) ? -1 : 0)
					}
					break
				case 'ArrowUp':
					if (!show) {
						show = true
					} else if (selectedIndex > ((create && searchValue) ? -1 : 0)) {
						selectedIndex--
					} else {
						selectedIndex = listItems.length - 1
					}
					break
			}
		}
	}

	$: disable && (show = !disable)

	$: searchValue, (selectedIndex = (create && searchValue) ? -1 : 0)

	$: selectedIndex >= listItems.length && (selectedIndex = listItems.length - 1)

	$: created = selected.filter(sel => !possibles.some(pos => DeepEqual(idValue(pos), idValue(sel))))

	$: existing = selected.filter(sel => possibles.some(pos => DeepEqual(idValue(pos), idValue(sel))))

	$: showInvalid = (required && (invalid || !selected.length))

	$: selected.length && resizeDD()

	onMount(() => {
		setTimeout(() => {
			if (autoFocus && elInput) {
				elInput.focus()
			}
			initialPass = false
		}, 200)
	})

</script>

<DropDownControl controlClass='block w-full'
                 toggleClass='block w-full'
                 on:focusin={() => {
                      show = true
                  }}
                 on:focusout={() => {
                     setTimeout(() => {
                         if (!!parentDivElement && !parentDivElement.contains(document.activeElement)) {
                             show = false
                         }
                         }, 250)
                 }}
                 index={-1}
                 bind:show
                 bind:parentDivElement
                 {bodyClass}
                 {sameSize}
                 {resizeTS}
                 {zIndex}>
	<div class='inputControl relative box-border grid grid-cols-[1fr_auto] !p-0 overflow-hidden
	            text-[85%]'
			 id="MultiSelectInput"
	     role='button'
	     tabindex={-1}
	     class:invalid={showInvalid}
	     on:keypress
	     on:click|stopPropagation
	     slot='toggle'>
		<div class='items-center cursor-default flex flex-wrap justify-start relative transition-all overflow-hidden min-h-[2em]'>
			{#each selected as selectedItem (keyValue(selectedItem, possibles.indexOf(poss => DeepEqual(idValue(poss), idValue(selectedItem)))))}
				<div class='flex min-w-0 rounded box-border overflow-hidden m-1'
				     class:bg-slate-300={!disable}>
					<div class='overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0 box-border select-none'>
						<DisplayHTML value={displayValue(selectedItem)}/>
					</div>
					{#if !disable}
						<button type='button'
						        class='btnClean flex items-center pr-1 box-border cursor-pointer hover:bg-slate-200'
						        tabindex={-1}
						        on:click|stopPropagation={() => doClear(selectedItem)}>
							<svg class='inline-block'
							     height='14'
							     width='14'
							     opacity='0.25'
							     viewBox='0 0 20 20'
							     aria-hidden='true'
							     focusable='false'>
								<path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
							</svg>
						</button>
					{/if}
				</div>
			{/each}
			{#if !disable && (isMulti || !selected.length)}
				<input type='text'
				       use:useActions={use}
				       tabindex={0}
				       {placeholder}
				       bind:this={elInput}
				       bind:value={searchValue}
				       class='noFormat flex flex-grow m-1 ring-0 focus:ring-0 outline-0 focus:outline-0 min-w-[3em] w-[3em]'
				       on:keydown={onKeyPress}/>
			{/if}
		</div>

		{#if disable}
			<div/>
		{:else}
			<div>
				{#if allowClearAll && selected.length}
					<button type='button'
					        class='btnClean h-full flex justify-center items-center hover:bg-slate-100 cursor-pointer group'
					        tabindex={-1}
					        on:click|stopPropagation={doClearAll}>
						<svg class='opacity-25 group-hover:!opacity-25'
						     class:!opacity-0={!show}
						     height='20'
						     width='20'
						     viewBox='0 0 20 20'
						     aria-hidden='true'
						     focusable='false'>
							<path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>
	<div slot='body'
	     role='button'
	     on:keypress
	     on:click|stopPropagation
	     tabindex={-1}>
		{#if show}
			{#if !listItems.length && !(searchValue && create)}
				<div class='px-2 py-1'>No items found</div>
			{:else}
				{#if searchValue && create}
					<button type='button'
					        class='btnClean w-full px-2 py-1 cursor-pointer hover:bg-slate-200 text-left'
					        tabindex={-1}
					        class:bg-slate-100={selectedIndex === -1}
					        on:click={doCreate}>
						{createPrefix} {searchValue}
					</button>
				{/if}
				{#each listItems as listItem, idx (keyValue(listItem, idx))}
					<button type='button'
					        class='btnClean w-full px-2 py-1 cursor-pointer hover:bg-slate-200 text-left'
					        on:click={() => doAdd(listItem.item)}
					        tabindex={-1}
					        class:bg-slate-100={selectedIndex === idx}>
						<DisplayHTML value={listItem.display}/>
					</button>
				{/each}
			{/if}
		{/if}
	</div>
</DropDownControl>

{#if name}
	{#each selected as item}
		<input type='hidden'
		       {name}
		       {form}
		       value={inputValue(item)}/>
	{/each}
{/if}
