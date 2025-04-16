import { writable } from 'svelte/store';
var initialDirtyTrack = {
    dirtyIDs: [],
    pendingRequest: null
};
export var StoreDirtyTrack = writable(initialDirtyTrack);
