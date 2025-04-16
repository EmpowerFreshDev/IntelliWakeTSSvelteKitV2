<script lang='ts'>
	import {RandomString} from '@empowerfresh/intelliwake'
	import Modal from './Modal.svelte'
	import {onDestroy} from 'svelte'
	import {StoreDirtyTrack} from './StoreDirtyTrack'
	import {beforeNavigate, goto} from '$app/navigation'
	import {browser} from "$app/environment";

	export let when = false
	export let id = RandomString(24)
	export let forceNav = false

	const setDirtyState = (isWhen: boolean, isID: string, pendingRequest: string | null) => {
		if (!isWhen && !!pendingRequest) {
			doLeave()
		} else {
			StoreDirtyTrack.update(prevState => ({
				...prevState,
				dirtyIDs: isWhen ? [...prevState.dirtyIDs.filter(dID => dID !== isID), isID] : prevState.dirtyIDs.filter(dID => dID !== isID)
			}))
		}
	}

	$: setDirtyState(when, id, $StoreDirtyTrack.pendingRequest)

	beforeNavigate(({to, cancel}) => {
		if (when && !forceNav) {
			cancel()
			StoreDirtyTrack.update(prevState => ({
				...prevState,
				pendingRequest: to?.url ?? '/'
			}))
		} else {
			StoreDirtyTrack.update(prevState => ({
				...prevState,
				pendingRequest: null
			}))
		}

		forceNav = false
	})

	// const doStay = () => {
	// 	StoreDirtyTrack.update(prevState => ({
	// 		...prevState,
	// 		pendingRequest: null
	// 	}))
	// }

	onDestroy(() => {
		StoreDirtyTrack.update(prevState => ({
			...prevState,
			dirtyIDs: prevState.dirtyIDs.filter(dID => dID !== id),
			pendingRequest: null
		}))
	})

	const doLeave = () => {
		if (browser) {
			const toURL = $StoreDirtyTrack.pendingRequest

			if (toURL) {
				forceNav = true
				goto(toURL)
			}
		}
	}

</script>

<Modal show={!!$StoreDirtyTrack.pendingRequest}
       okButton='Leave'
       on:ok={doLeave}>
	<span slot='header'>Leave without saving?</span>
	<div slot='body'>
		Are you sure you want to leave this page?
	</div>
</Modal>
