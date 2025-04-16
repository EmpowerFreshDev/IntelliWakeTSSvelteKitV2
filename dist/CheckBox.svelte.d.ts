import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /** Whether or not the input is checked */ checked?: boolean;
        /** Allows for styling border */ inputClass?: string;
        /** Allows for styling the indicator box */ indicatorClass?: string;
        /** Changes appearance to radial for single option selections */ radial?: boolean;
        /** Text label for checkbox */ label?: string;
        /** name for form actions */ name?: string;
        /** Allows for firing a input event */ fireInputEvent?: boolean;
        stopPropagation?: boolean;
        preventDefault?: boolean;
        click?: ((e: MouseEvent, checked: boolean) => void);
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type CheckBoxProps = typeof __propDef.props;
export type CheckBoxEvents = typeof __propDef.events;
export type CheckBoxSlots = typeof __propDef.slots;
export default class CheckBox extends SvelteComponent<CheckBoxProps, CheckBoxEvents, CheckBoxSlots> {
}
export {};
