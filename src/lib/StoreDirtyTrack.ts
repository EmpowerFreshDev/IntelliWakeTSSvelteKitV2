import {writable} from 'svelte/store'

export interface IDirtyTrack {
	dirtyIDs: string[]
	pendingRequest: URL | string | null
}

const initialDirtyTrack: IDirtyTrack = {
	dirtyIDs: [],
	pendingRequest: null
}
export const StoreDirtyTrack = writable<IDirtyTrack>(initialDirtyTrack)
