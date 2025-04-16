import { SvelteComponent } from "svelte";
import type { IDDAction } from './Definitions';
import { type ActionArray } from './useActions';
declare const __propDef: {
    props: {
        ddActions?: IDDAction[];
        use?: ActionArray;
        show?: boolean;
        width?: string;
        maxHeight?: string | null;
        caret?: boolean;
        buttonTitle?: string | null;
        highlightedIndex?: number;
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
export type SlideDownProps = typeof __propDef.props;
export type SlideDownEvents = typeof __propDef.events;
export type SlideDownSlots = typeof __propDef.slots;
export default class SlideDown extends SvelteComponent<SlideDownProps, SlideDownEvents, SlideDownSlots> {
}
export {};
