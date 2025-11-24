import { SvelteComponent } from "svelte";
import type { TDropDownControlDrop, TDropDownControlPosition } from './Definitions';
declare const __propDef: {
    props: {
        show?: boolean;
        manualShowHide?: boolean;
        allowOutsideClose?: boolean;
        position?: TDropDownControlPosition;
        drop?: TDropDownControlDrop;
        sameSize?: boolean;
        controlClass?: string;
        toggleClass?: string;
        bodyClass?: string;
        noScroll?: boolean;
        fullBlock?: boolean;
        bubble?: boolean;
        verbose?: boolean;
        resizeTS?: number;
        elFocus?: HTMLElement | null;
        zIndex?: number;
        openingDown?: boolean;
        disabled?: boolean;
        index?: number;
        parentDivElement?: HTMLDivElement | null;
        hidden?: boolean;
    };
    events: {
        blur: FocusEvent;
        keydown: KeyboardEvent;
        keypress: KeyboardEvent;
        focusin: FocusEvent;
        focusout: FocusEvent;
        keyup: KeyboardEvent;
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        toggle: {};
        body: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DropDownControlProps = typeof __propDef.props;
export type DropDownControlEvents = typeof __propDef.events;
export type DropDownControlSlots = typeof __propDef.slots;
export default class DropDownControl extends SvelteComponent<DropDownControlProps, DropDownControlEvents, DropDownControlSlots> {
}
export {};
