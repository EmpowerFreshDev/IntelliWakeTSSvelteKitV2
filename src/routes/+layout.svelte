<script lang='ts'>
	import '../tailwind.pcss'
	import {onMount} from 'svelte'
	import MasterDetailLayout from '$lib/MasterDetailLayout.svelte'
	import {browser} from '$app/environment'
	import {faAtom, faCloudSun, faCog, faMoon, faPercent, faSun, faUsers} from '@fortawesome/free-solid-svg-icons'
	import Icon from '$lib/Icon.svelte'
	import ActivityOverlay from '$lib/ActivityOverlay.svelte'
	import MessageBoxes from '$lib/MessageBoxes.svelte'
	import {navigating, page} from '$app/stores'
	import DropDown from '$lib/DropDown.svelte'
	import {SearchRows} from '@solidbasisventures/intelliwaketsfoundation'
	import Search from '$lib/Search.svelte'
	import {ShowActivityOverlay, type TListGroupItem} from '$lib/Definitions'
	import Switch from '$lib/Switch.svelte'
	import {IsMobileOrTablet} from '$lib/Functions'

	let rounded = false

	let search = !browser ? '' : window.localStorage.MainSearch ?? ''
	$: browser && (window.localStorage.MainSearch = search)

	function updateDarkMode() {
		if (localStorage.theme === 'dark' || (localStorage.theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	onMount(() => {
		const darkMode = matchMedia('(prefers-color-scheme: dark)')
		darkMode.addEventListener('change', updateDarkMode)
		return () => darkMode.removeEventListener('change', updateDarkMode)
	})

	$: listItems = SearchRows([
		{
			title: 'Header'
		},
		{
			title: 'About'
		},
		{
			section: 'A Section',
			href: 'Test',
			title: 'Test of a longer description',
			badgeValue: 5
		},
		{
			section: 'A Section',
			title: 'Accordians'
		},
		{
			section: 'A Section',
			title: 'Spinner'
		},
		{
			section: 'A Section',
			title: 'Multi'
		},
		{
			section: 'A Section',
			title: 'Multi Inside'
		},
		{
			section: 'A Section',
			title: 'Scrolling'
		},
		{
			section: 'A Section',
			title: 'Up Down'
		},
		{
			section: 'A Section',
			title: 'Scroll To Bottom'
		},
		{
			section: 'A Section',
			title: 'Tabs',
			href: `Tabs${!browser ? '' : $page.params.tab_id ?? ''}`

		},
		{
			section: 'A Section',
			title: 'Tabs Old'
		},
		{
			section: 'B Section',
			title: 'Modal',
			rightText: 'Right'
		},
		{
			section: 'B Section',
			title: 'Drop Down Frame',
			sub_title: 'Sub Title DDF',
			icon: faCog,
			bigIcon: rounded
		},
		{
			section: 'B Section',
			title: 'DD Bubble Frame',
			href: 'DropDownBubbleFrame',
			badgeValue: 450,
			badgeColor: 'var(--red-color)'
		},
		{
			section: 'B Section',
			title: 'Chat Bubble'
		},
		{
			title: 'Hidden',
			hidden: true
		},
		{
			title: 'Users',
			icon: faUsers
		},
		{
			title: 'Blur',
			icon: faAtom
		},
		{
			title: 'Fractions',
			icon: faPercent
		}
	], search) satisfies TListGroupItem[]

	$: forceActivityOverlay = $ShowActivityOverlay > 0

	let delayShowNavigating = setTimeout(() => {
	}, 100)
	let showNavigating = false

	function changeNavigating(nav: boolean) {
		clearTimeout(delayShowNavigating)
		if (!nav) {
			showNavigating = false
		} else {
			delayShowNavigating = setTimeout(() => {
				showNavigating = nav
			}, 500)
		}
	}

	$: changeNavigating(!!$navigating)

	$: showActivityOverlay = forceActivityOverlay || showNavigating

	let toggle = false
</script>

<svelte:head>
	<script>
		if (document) {
			if (localStorage.theme === 'dark' || (localStorage.theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	</script>
</svelte:head>

<MasterDetailLayout pageRoute=''
                    mdHideMaster={false}
                    {listItems}
                    {rounded}>
	<div slot='header'>
		<h1 class='text-center mx-2 !text-secondary-main'>
			Test Page
		</h1>
		<Search bind:value={search}/>
		<Switch bind:checked={rounded}>Toggle Rounded Mode</Switch>
		<button
			on:click={()=>toggle = !toggle}>
			toggle enable dropdown
		</button>
		<div class='text-center my-4'>
			<DropDown buttonTitle='DrowDown'
			          disabled='{toggle}'
			          position='Center'
			          ddActions={[
				{title: 'One or another of these items should shrink', action: () => console.info(1), alternateAction: () => console.info('A'), alternateTitle: 'A'},
				{title: 'Two', action: () => console.info(2), active: true, alternateAction: () => console.info('B'), alternateTitle: 'B', alternateNoClose: true}
			]}/>
		</div>
	</div>
	<div slot='empty'
	     class='text-red-500 text-center'>
		No results for {search ?? ''}
	</div>
	<div slot='footer'>
		<div class='buttonGroup w-[8em] mx-auto text-sm bg-white dark:bg-slate-400'>
			<button class:active={browser && localStorage.theme === 'light'}
			        on:click={() => {
					localStorage.theme = 'light'
					window.location.reload()
				}}>
				<Icon icon={faSun}
				      swapOpacity/>
			</button>
			<button class:active={browser && localStorage.theme === 'dark'}
			        on:click={() => {
					localStorage.theme = 'dark'
					window.location.reload()
				}}>
				<Icon icon={faMoon}/>
			</button>
			<button class:active={browser && localStorage.theme === undefined}
			        on:click={() => {
					localStorage.removeItem('theme')
					window.location.reload()
				}}>
				<Icon icon={faCloudSun}/>
			</button>
		</div>
		<div class='text-center text-sm'>
			{#if IsMobileOrTablet()}
				Mobile or Tablet
			{:else}
				Desktop
			{/if}
		</div>
	</div>
	<svelte:fragment slot='page'>
		<slot/>
	</svelte:fragment>
</MasterDetailLayout>

<ActivityOverlay bind:show={showActivityOverlay}/>

<div class='pointer-events-none z-50 fixed left-0 right-0 bottom-0 align-bottom'>
	<MessageBoxes/>
</div>
