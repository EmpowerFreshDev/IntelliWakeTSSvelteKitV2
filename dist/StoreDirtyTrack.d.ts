export interface IDirtyTrack {
    dirtyIDs: string[];
    pendingRequest: URL | string | null;
}
export declare const StoreDirtyTrack: import("svelte/store").Writable<IDirtyTrack>;
