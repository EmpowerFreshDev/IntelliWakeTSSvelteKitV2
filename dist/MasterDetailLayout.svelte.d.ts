import { SvelteComponent } from "svelte";
import type { TListGroupItem } from './Definitions';
import type { TFindIsActive } from '@solidbasisventures/intelliwaketsfoundation';
declare const __propDef: {
    props: {
        pageRoute: string;
        listItems?: TListGroupItem[] | null;
        emptyListMessage?: string | null;
        masterXVisible?: boolean;
        active?: TFindIsActive;
        animate?: boolean;
        mdClass?: string;
        masterClass?: string;
        mdHideMaster?: boolean;
        wrapText?: boolean;
        ellipses?: boolean;
        noLinkReplace?: boolean;
        rounded?: boolean;
        showAllPrint?: boolean;
        smallScreenWidth?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        list: {};
        empty: {
            slot: string;
        };
        footer: {};
        page: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MasterDetailLayoutProps = typeof __propDef.props;
export type MasterDetailLayoutEvents = typeof __propDef.events;
export type MasterDetailLayoutSlots = typeof __propDef.slots;
export default class MasterDetailLayout extends SvelteComponent<MasterDetailLayoutProps, MasterDetailLayoutEvents, MasterDetailLayoutSlots> {
}
export {};
