import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: number | null | undefined;
        valueHighlight?: number | undefined;
        lowerRange?: number;
        increment?: number;
        upperRange?: number;
        maxDigitsDisplay?: number;
        offValue?: number | null;
        name?: string | undefined;
        allowManualEntryMode?: boolean;
        saveManualEntryMode?: string | null;
        readonly?: boolean;
        manualEntryMode?: boolean | "" | null;
        /**
             * Maximum number of digits allowed for manual entry.
             *
             * @type {number | null}
             */ maxManualEntryDigits?: number | null;
        displayPercent?: boolean;
        center?: boolean;
        buttonClassOff?: string;
        buttonClassOn?: string;
        buttonClassHighlightOn?: string;
        buttonClassHighlightOff?: string;
        displayQualifier?: string;
        onChange?: (val: number | null) => void;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type InputNumberScrollProps = typeof __propDef.props;
export type InputNumberScrollEvents = typeof __propDef.events;
export type InputNumberScrollSlots = typeof __propDef.slots;
export default class InputNumberScroll extends SvelteComponent<InputNumberScrollProps, InputNumberScrollEvents, InputNumberScrollSlots> {
}
export {};
