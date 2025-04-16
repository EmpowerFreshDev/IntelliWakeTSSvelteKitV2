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
export type TabHeaderProps = typeof __propDef.props;
export type TabHeaderEvents = typeof __propDef.events;
export type TabHeaderSlots = typeof __propDef.slots;
export default class TabHeader extends SvelteComponent<TabHeaderProps, TabHeaderEvents, TabHeaderSlots> {
}
export {};
