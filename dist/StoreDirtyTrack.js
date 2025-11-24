import { writable } from 'svelte/store';
const initialDirtyTrack = {
    dirtyIDs: [],
    pendingRequest: null
};
export const StoreDirtyTrack = writable(initialDirtyTrack);
