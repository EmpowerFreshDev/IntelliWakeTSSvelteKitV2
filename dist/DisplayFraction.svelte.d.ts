import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: number | null | undefined;
        onNullUndefined?: "Zero" | "Dash" | "Blank";
        onBlank?: "Zero" | "Dash" | "Blank";
        maxDigitsDisplay?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DisplayFractionProps = typeof __propDef.props;
export type DisplayFractionEvents = typeof __propDef.events;
export type DisplayFractionSlots = typeof __propDef.slots;
export default class DisplayFraction extends SvelteComponent<DisplayFractionProps, DisplayFractionEvents, DisplayFractionSlots> {
}
export {};
