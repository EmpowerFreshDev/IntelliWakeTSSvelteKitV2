<script lang='ts'>
	import {page} from '$app/stores'
	import ListGroupItems from './ListGroupItems.svelte'
	import {quintOut} from 'svelte/easing'
	import {fly} from 'svelte/transition'
	import {browser} from '$app/environment'
	import type {TListGroupItem} from '$lib/Definitions'
	import type {TFindIsActive} from '@empowerfresh/intelliwake'
	import {PathAnalyzer} from '$lib/PathAnalyzer'

	export let pageRoute: string
	export let listItems: TListGroupItem[] | null = null
	export let emptyListMessage: string | null = null
	export let masterXVisible = false
	export let active: TFindIsActive = true
	export let animate = true
	export let mdClass = ''
	export let masterClass = ''
	export let mdHideMaster = false
	export let wrapText = false
	export let ellipses = false
	export let noLinkReplace = false
	export let rounded = false
	export let showAllPrint = false
	export let smallScreenWidth = 767 // 1024

	$: pathAnalyzer = browser ? new PathAnalyzer($page, pageRoute) : null

	let innerWidth: number | undefined = undefined
	let smallScreen = false

	const SetIsSmallScreen = (width: number | undefined, smallScreenPixels: number) => {
		if (width) {
			const isSmallScreen = width < smallScreenPixels
			if (smallScreen !== isSmallScreen) smallScreen = isSmallScreen
		}
	}
	$: browser && SetIsSmallScreen(innerWidth, smallScreenWidth)
</script>

<svelte:window bind:innerWidth={innerWidth}/>

{#if pathAnalyzer && innerWidth}
	<div class='absolute inset-0 print:relative grid grid-cols-1 md:grid-cols-[auto_1fr] print:md:block {mdClass}'>
		{#if !smallScreen || !pathAnalyzer.activePageSlug}
			{#if mdHideMaster && !smallScreen}
				<div class='w-0'></div>
			{:else}
				<div class='relative md:border-r grid grid-rows-[auto_1fr_auto] max-md:h-full overflow-hidden print:!overflow-visible {masterClass}'
				     transition:fly|local={!animate ? undefined : {duration: 300, x: -100, opacity: 0, easing: quintOut}}
				     class:sm:overflow-x-visible={masterXVisible}
				     class:overflow-hidden={!masterXVisible}
				     class:print:!hidden={!showAllPrint && !!pathAnalyzer.activePageSlug}>
					<div>
						<slot name='header'/>
					</div>

					<slot name='list'/>

					{#if listItems !== null}
						<div class='overflow-y-auto print:overflow-visible'>
							<ListGroupItems {pathAnalyzer}
							                {emptyListMessage}
							                {active}
							                {listItems}
							                {wrapText}
							                {ellipses}
							                {noLinkReplace}
							                {rounded}>
								<slot name='empty'
								      slot='empty'/>
							</ListGroupItems>
						</div>
					{/if}

					<div>
						<slot name='footer'/>
					</div>
				</div>
			{/if}
		{/if}

		{#if !smallScreen || !!pathAnalyzer.activePageSlug}
			<div class='relative grid grid-rows-1 md:relative overflow-hidden print:overflow-visible max-md:h-full max-md:w-full'
			     transition:fly|local={!animate ? undefined : {duration: 300, x: 100, opacity: 0, easing: quintOut}}>
				<slot name='page'/>
			</div>
		{/if}
	</div>
{/if}
