import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        hue?: number | null;
        saturation?: number | null;
        lightness?: number | null;
        scale?: number;
        allowInvisible?: boolean;
        showNoColorSymbol?: boolean;
        forceNoColorSymbol?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DisplayColorProps = typeof __propDef.props;
export type DisplayColorEvents = typeof __propDef.events;
export type DisplayColorSlots = typeof __propDef.slots;
export default class DisplayColor extends SvelteComponent<DisplayColorProps, DisplayColorEvents, DisplayColorSlots> {
}
export {};
