<script lang="ts">
	import type {ITabHref} from './Definitions'
	import Fa from 'svelte-fa/src/fa.svelte'
	import {page} from '$app/stores'
	import {PathAnalyzer} from './PathAnalyzer'
	import {browser} from '$app/environment'
	import {afterNavigate, goto} from '$app/navigation'
	import {CoalesceFalsey, ReplaceAll} from '@solidbasisventures/intelliwaketsfoundation'
	import {tick} from 'svelte'

	export let tabHrefs: ITabHref[] = []
	export let basePath: string | undefined = undefined
	export let storage: 'local' | 'session' | null = 'session'
	export let saveKey: string | null = null
	export let noIDRemember = false
	export let noTabAdjustments = false
	export let reclickToClose = false
	export let bottomMargin = true
	export let consoleLogs = false
	export let noResolveHidden = false
	export let printAllTabs = false
	export let rounded = false

	$: tabPrefix = noTabAdjustments ? '' : 'Tab'

	$: noDigitsBasePath = (basePath ?? '').replace(/\d+/g, '')
	$: basePathDigits = (basePath ?? '').match(/\d+/g)?.join('') ?? ''

	$: pathAnalyzer = (basePath && browser) ? new PathAnalyzer($page, basePath) : null

	function getSlug(tabItem: ITabHref | null | undefined): string | null | undefined {
		return !tabItem ? null : (tabItem.href ?? `${tabPrefix}${ReplaceAll(' ', '', tabItem.key)}`)
	}

	$: visibleItems = tabHrefs
		.filter(tabItem => !tabItem.hidden)
		.map(tabItem => ({
			...tabItem,
			isOpen: !!(tabItem.isOpen ?? (pathAnalyzer?.activePageSlug === getSlug(tabItem))),
			href: !pathAnalyzer ? (getSlug(tabItem) ?? tabItem.key) : (pathAnalyzer?.open(
				getSlug(tabItem) ?? '', reclickToClose) ?? tabItem.key)
		}))

	function getTabSetting() {
		const tabSetting = (storage === null || !browser) ? null : storage === 'session' ?
			sessionStorage.getItem(saveKey ?? `Tab${noDigitsBasePath}`) :
			localStorage.getItem(saveKey ?? `Tab${noDigitsBasePath}`)

		if (tabSetting?.startsWith('Tab')) return tabSetting

		return null
	}

	function setTabSetting(href: string) {
		if (consoleLogs) {
			console.info('setTabSetting', href)
		}
		if (storage && browser && href && href.toString().startsWith('Tab') && href !== basePath) {
			return storage === 'session' ?
				sessionStorage.setItem(saveKey ?? `Tab${noDigitsBasePath}`, href) :
				localStorage.setItem(saveKey ?? `Tab${noDigitsBasePath}`, href)
		}
	}

	function getIDSetting() {
		return (noIDRemember || !storage) ? undefined : storage === 'session' ?
			sessionStorage.getItem(saveKey ?? `IDTab${noDigitsBasePath}`) :
			localStorage.getItem(saveKey ?? `IDTab${noDigitsBasePath}`)
	}

	function setIDSetting() {
		if (storage && basePathDigits && !noIDRemember) {
			return storage === 'session' ?
				sessionStorage.setItem(saveKey ?? `IDTab${noDigitsBasePath}`, basePathDigits) :
				localStorage.setItem(saveKey ?? `IDTab${noDigitsBasePath}`, basePathDigits)
		}
	}

	async function mountAction() {
		if (browser && pathAnalyzer && storage && pathAnalyzer?.basePath.endsWith(
			`/${basePath}`) && (pathAnalyzer.activePageComponents?.length ?? 0) < 3) {
			await tick()

			if (consoleLogs) console.info('mountAction', pathAnalyzer.activePageSlugs)

			if (!noResolveHidden && pathAnalyzer?.activePageSlug && !visibleItems.some(
				item => getSlug(item)?.includes(pathAnalyzer?.activePageFull ?? '(NoNe)') ?? true)) {
				const toItem = visibleItems.find(item => item.isInitial) ?? visibleItems.find(() => true)
				if (toItem) {
					goto(toItem.href, {replaceState: true})
					return
				}
			}

			let previousID: string | number | null | undefined = null
			let newTab: string | null | undefined = null

			if (!pathAnalyzer?.activePageSlug) {
				if (consoleLogs) {
					console.info(
						getTabSetting(),
						getSlug(tabHrefs.find(tabHref => !tabHref.hidden && tabHref.isInitial)),
						getSlug(tabHrefs.find(tabHref => !tabHref.hidden))
					)
				}

				newTab = CoalesceFalsey(
					getTabSetting(),
					getSlug(tabHrefs.find(tabHref => !tabHref.hidden && tabHref.isInitial)),
					getSlug(tabHrefs.find(tabHref => !tabHref.hidden))
				)


			}

			if (!basePathDigits) {
				previousID = getIDSetting()
			}

			if (previousID) {
				// const newPathAnalyzer = new PathAnalyzer($page, basePath)
				// newPathAnalyzer.base = `${noDigitsBasePath}${previousID}`

				await tick()

				if (consoleLogs) {
					console.info(
						'ID', previousID, 'newTab', newTab, 'slug', pathAnalyzer?.activePageSlug, 'URL',
						pathAnalyzer?.open(newTab ?? '', false),
						pathAnalyzer.basePathReplaced(`${noDigitsBasePath}${previousID}`,
							newTab ?? pathAnalyzer?.activePageSlug ?? ''
						)
					)
				}

				// await goto(pathAnalyzer.basePathReplaced(`${noDigitsBasePath}${previousID}`, newTab ?? pathAnalyzer?.activePageSlug ?? ''), {replaceState: true})
			} else {
				setIDSetting()

				if (newTab) {
					await tick()
					if (consoleLogs) {
						console.info('No ID newTab', newTab, pathAnalyzer?.open(newTab, false))
					}
					await goto(pathAnalyzer?.open(newTab, false), {replaceState: true})
				}
			}
		}
	}

	$: basePath && browser && visibleItems && pathAnalyzer && storage && mountAction()

	afterNavigate(() => {
		if (consoleLogs) console.info('aN', pathAnalyzer?.activePageSlug)
		if (browser && storage && pathAnalyzer && pathAnalyzer?.activePageSlug && pathAnalyzer?.activePageSlug != getTabSetting() && pathAnalyzer?.basePath.endsWith(
			`/${basePath}`)) {
			setTabSetting(pathAnalyzer?.activePageSlug)
		}
	})

</script>

{#key basePath}
	<div
		class="grid mx-auto"
		class:!flex={rounded}
		class:!flex-nowrap={rounded}
		class:my-2={rounded}
		class:mb-2={bottomMargin}
		class:print:block={!printAllTabs}
		style={`grid-template-columns: repeat(${visibleItems.length}, minmax(0, 1fr))`}
	>
		{#each visibleItems as item}
			{#if !rounded}
				<a
					class="text-center border-transparent border-b-4 text-black shadow-none drop-shadow-none
								 rounded-none focus:ring-0 m-2 min-w-[3em] text-ellipsis whitespace-nowrap
								 overflow-hidden hover:bg-transparent hover:border-b-primary-main"
					class:!text-primary-main={item.isOpen}
					class:!border-b-primary-main={item.isOpen}
					class:hover:bg-transparent={item.isOpen}
					class:hover:text-primary-main={item.isOpen}
					class:pointer-events-none={item.disabled}
					class:opacity-75={item.disabled}
					class:print:!hidden={!printAllTabs && !item.isOpen}
					data-sveltekit-preload-data={item.dataSvelteKitPreloadData ?? "tap"}
					href={item.href}
				>
					{#if !!item.faProps}
						<Fa
							{...item.faProps}
							class="inline-block mr-1"
							fw
						/>
					{/if}
					{item.title ?? item.key}
				</a>
			{:else}
				<a
					class="rounded-md text-center px-2.5 text-gray-700 mr-2 last:mr-0 transition-all leading-7"
					class:bg-gray-200={item.isOpen}
					class:text-gray-900={item.isOpen}
					class:font-semibold={item.isOpen}
					href={item.href}
				>
					{#if !!item.faProps}
						<Fa {...item.faProps} class="inline-block mr-1" fw/>
					{/if}
					{item.title ?? item.key}
				</a>
			{/if}
		{/each}
	</div>
{/key}
