<script lang='ts'>
	import type {TTableCol} from './Definitions'
	import {ShowMessageBox} from './Definitions'
	import {
		CleanNumber,
		DeepEqual,
		initialSortColumn,
		JSONParse,
		PagesForRange,
		SearchRow,
		SelectBetweenIDs,
		SortColumns,
		ToDigits
	} from '@solidbasisventures/intelliwaketsfoundation'
	import Search from './Search.svelte'
	import DropDown from './DropDown.svelte'
	import {CopyRefToClipboard} from './Functions'
	import {faCopy} from '@fortawesome/free-solid-svg-icons'
	import {browser} from '$app/environment'
	import Icon from '$lib/Icon.svelte'

	// eslint-disable-next-line no-undef
	type T = $$Generic<Record<string, any>>

	export let data: T[] = []
	export let cols: TTableCol<T>
	export let selectedIDs: number[] | null = null
	export let selectColumn = 'id'
	export let rememberKey: string | null = null
	export let defaultSort: string | null = null
	export let limit: number | null = null
	export let limits: number[] = [100, 200, 500, 1000, 0]
	export let copyButton = false
	export let buttonClass = ''

	export let page = 1
	export let showPageItems = 3

	let search = (!rememberKey || !browser) ? '' : window.localStorage.getItem(rememberKey + 'Search') ?? ''
	$: !!rememberKey && browser && window.localStorage.setItem(rememberKey + 'Search', search)
	let sort = (!rememberKey || !browser) ? null : window.localStorage.getItem(rememberKey + 'Sort') ?? defaultSort
	$: !!rememberKey && browser && (!sort ? window.localStorage.removeItem(rememberKey + 'Sort') : window.localStorage.setItem(rememberKey + 'Sort', sort))

	let internalSelectedIDs: number[] = (!rememberKey || !browser) ? [] : JSONParse<number[]>(window.localStorage.getItem(`${rememberKey}SelectedIDs`)) ?? []
	$: !!rememberKey && browser && window.localStorage.setItem(`${rememberKey}SelectedIDs`, JSON.stringify(internalSelectedIDs))

	let rowsChecked = 0
	let rowsLowerBound = 0
	let validRowCount = 0

	$: rows = SortColumns(data, {
		...initialSortColumn,
		primarySort: sort ?? Object.keys(cols)[0] ?? ''
	}).reduce((results, dat, idx) => {
		if (!!limit && idx === 0) {
			rowsChecked = 0
			rowsLowerBound = (page - 1) * limit
			validRowCount = 0
		}

		if (!SearchRow(dat, search)) {
			return results
		}

		if (limit) {
			validRowCount++

			if (results.length > limit) {
				return results
			}

			rowsChecked++

			if (rowsChecked < rowsLowerBound) {
				return results
			}
		}

		if (results.some(result => result[selectColumn] === dat[selectColumn])) {
			console.error('Dup removed', dat[selectColumn])
			return results
		}

		return [
			...results, {
				...dat,
				selectedID: !!internalSelectedIDs?.includes(dat[selectColumn])
			}
		]
	}, [])

	$: anySelectedID = rows.some(row => row.selectedID)

	const doToggleSelectedAll = () => {
		if (internalSelectedIDs) {
			if (anySelectedID) {
				internalSelectedIDs = []
			} else {
				internalSelectedIDs = rows.map(row => row[selectColumn])
			}
		}
	}

	let lastSelectedID: null | number = null

	const doToggleSelected = (e: TouchEvent, id: number) => {
		if (internalSelectedIDs) {
			if (e.shiftKey && lastSelectedID !== null) {
				internalSelectedIDs = [...internalSelectedIDs, ...SelectBetweenIDs(rows.map(datum => datum[selectColumn]), lastSelectedID, id)]
					.reduce<number[]>((results, selectedID) => results.includes(selectedID) ? results : [...results, selectedID], [])
			} else {
				if (internalSelectedIDs.includes(id)) {
					internalSelectedIDs = internalSelectedIDs.filter(selectedID => selectedID !== id)
				} else {
					internalSelectedIDs = [...internalSelectedIDs, id]
				}
			}

			lastSelectedID = id
		}
	}

	const setSelectedIDs = (dataRows: any[]) => {
		let newIDs = dataRows.reduce((results, dataRow) => dataRow.selectedID ? [...results, dataRow[selectColumn]] : results, [])

		if (!DeepEqual(newIDs, selectedIDs)) {
			selectedIDs = newIDs
		}
	}
	$: setSelectedIDs(rows)

	$: pageCount = (CleanNumber(validRowCount) > 0) ?
		Math.floor((CleanNumber(validRowCount) + (CleanNumber(limit ?? 200) - 1)) / CleanNumber(limit ?? 200)) : 0


	$: pagesRange = (pageCount ?? 1) <= 1 ? null : PagesForRange(page, pageCount ?? 1, showPageItems)

	let tableRef: HTMLTableElement

	const copyTable = () => {
		if (tableRef) {
			if (CopyRefToClipboard(tableRef)) {
				ShowMessageBox.show('Copied')
			}
		}
	}

</script>

<div class='grid grid-rows-[auto_1fr] overflow-hidden'>
	<div class='grid grid-cols-[1fr_auto_1fr] p-1'>
		<Search bind:value={search}/>
		<div class='inline-block'>
			{#if pagesRange}
				<div class='buttonGroup mx-auto w-fit'>
					{#each pagesRange as pageRange}
						<button class:active={pageRange === page}
						        disabled={!pageRange}
						        on:click={() => {
                            if (pageRange) {
                                page = pageRange
                                }
                        }}>
							{!pageRange ? '...' : ToDigits(pageRange)}
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<div class='text-right'>
			{#if limit !== null}
				<DropDown buttonTitle={`Limit: ${!limit ? 'None' : ToDigits(limit, 0)}`}
				          buttonClass={buttonClass ?? 'btnLink'}
				          position='Right'
				          ddActions={limits.map(lim => ({
                              title: !lim ? 'None' : ToDigits(lim, 0),
                              active: limit === lim,
                              action: () => limit = lim
                          }))}
				/>
			{/if}
			{#if copyButton}
				<button class='btnLink'
				        on:click={copyTable}>
					<Icon icon={faCopy}/>
				</button>
			{/if}
		</div>
	</div>
	<div class='overflow-y-auto'>
		<table class='table tableSticky tableBordered'
		       bind:this={tableRef}>
			<thead>
			<tr>
				{#if internalSelectedIDs}
					<th class='w-6'>
						<input type='checkbox'
						       class='cursor-pointer'
						       checked={anySelectedID}
						       on:click={doToggleSelectedAll}/>
					</th>
				{/if}
				{#each Object.keys(cols) as col (col)}
					{#if !cols[col].hidden}
						<th class={cols[col].headBodyClass}>{cols[col].name}</th>
					{/if}
				{/each}
			</tr>
			</thead>
			<tbody>
			{#if rows.length === 0}
				<tr>
					<td colspan={Object.keys(cols).filter(col => !cols[col].hidden).length + (internalSelectedIDs ? 1 : 0)}
					    class='text-slate-400 italic'>None
					</td>
				</tr>
			{:else}
				{#each rows as row (row[selectColumn])}
					<tr>
						{#if internalSelectedIDs}
							<th class='w-6'>
								<input type='checkbox'
								       class='cursor-pointer'
								       checked={row.selectedID}
								       on:click={e => doToggleSelected(e, row[selectColumn])}/>
							</th>
						{/if}
						{#each Object.keys(cols) as col (col)}
							{#if !cols[col].hidden}
								<td class={`${cols[col].class ?? ''} ${cols[col].headBodyClass ?? ''}`.trim()}
								    title={!cols[col].title ? undefined : cols[col].title(row[col], row)}>
									{#if cols[col].onClick}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<span class='text-primary-main cursor-pointer hover:underline'
										      role='button'
										      tabindex={-1}
										      on:click={e => cols[col].onClick(row, e)}>
									{cols[col].calc ? cols[col].calc(row[col], row) : row[col] ? row[col] : cols[col].onEmptyCol ? row[cols[col].onEmptyCol] : ''}
										</span>
									{:else}
										{cols[col].calc ? cols[col].calc(row[col], row) : row[col] ? row[col] : cols[col].onEmptyCol ? row[cols[col].onEmptyCol] : ''}
									{/if}
								</td>
							{/if}
						{/each}
					</tr>
				{/each}
			{/if}
			</tbody>
		</table>
	</div>
</div>
