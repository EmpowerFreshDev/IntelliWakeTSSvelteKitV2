import { SvelteComponent } from "svelte";
import type { ITabItem } from './Definitions';
declare const __propDef: {
    props: {
        tabItems?: ITabItem[];
        currentKey?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabProps = typeof __propDef.props;
export type TabEvents = typeof __propDef.events;
export type TabSlots = typeof __propDef.slots;
export default class Tab extends SvelteComponent<TabProps, TabEvents, TabSlots> {
}
export {};
