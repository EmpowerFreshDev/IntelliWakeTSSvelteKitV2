import { SvelteComponent } from "svelte";
import type { IDDAction, TDropDownControlPosition } from './Definitions';
declare const __propDef: {
    props: {
        show?: boolean;
        position?: TDropDownControlPosition;
        ddActions?: IDDAction[];
        noCaret?: boolean;
        buttonTitle?: string | null;
        buttonClass?: string | undefined;
        controlClass?: string | undefined;
        inputControl?: boolean;
        fullBlock?: boolean;
        bodyClass?: string;
        sameSize?: boolean;
        zIndex?: number;
        openingDown?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        hideEmptyDDActions?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        button: {};
        actions: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DropDownProps = typeof __propDef.props;
export type DropDownEvents = typeof __propDef.events;
export type DropDownSlots = typeof __propDef.slots;
export default class DropDown extends SvelteComponent<DropDownProps, DropDownEvents, DropDownSlots> {
}
export {};
