import { SvelteComponent } from "svelte";
import type { ITabHref } from './Definitions';
declare const __propDef: {
    props: {
        tabHrefs?: ITabHref[];
        basePath?: string | undefined;
        storage?: "local" | "session" | null;
        saveKey?: string | null;
        noIDRemember?: boolean;
        noTabAdjustments?: boolean;
        reclickToClose?: boolean;
        bottomMargin?: boolean;
        consoleLogs?: boolean;
        noResolveHidden?: boolean;
        printAllTabs?: boolean;
        rounded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabHrefProps = typeof __propDef.props;
export type TabHrefEvents = typeof __propDef.events;
export type TabHrefSlots = typeof __propDef.slots;
export default class TabHref extends SvelteComponent<TabHrefProps, TabHrefEvents, TabHrefSlots> {
}
export {};
