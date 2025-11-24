import { SvelteComponent } from "svelte";
import type { PathAnalyzer } from './PathAnalyzer';
import { type TFindIsActive } from '@solidbasisventures/intelliwaketsfoundation';
import type { TListGroupItem } from './Definitions';
declare const __propDef: {
    props: {
        listItems?: TListGroupItem[];
        emptyListMessage?: string | null;
        subsExist?: boolean;
        topValue?: string | null;
        active?: TFindIsActive;
        indentLevel?: number;
        collapsedValues?: string[];
        collapsedSections?: string[];
        rememberKey?: string | null;
        pathAnalyzer?: PathAnalyzer | null | undefined;
        wrapText?: boolean;
        ellipses?: boolean;
        noLinkReplace?: boolean;
        rounded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        empty: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ListGroupItemsProps = typeof __propDef.props;
export type ListGroupItemsEvents = typeof __propDef.events;
export type ListGroupItemsSlots = typeof __propDef.slots;
export default class ListGroupItems extends SvelteComponent<ListGroupItemsProps, ListGroupItemsEvents, ListGroupItemsSlots> {
}
export {};
