import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        checked?: boolean | undefined;
        disabled?: boolean | undefined;
        name: string | undefined;
        value?: unknown | undefined;
    };
    events: {
        check: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type SwitchOldProps = typeof __propDef.props;
export type SwitchOldEvents = typeof __propDef.events;
export type SwitchOldSlots = typeof __propDef.slots;
export default class SwitchOld extends SvelteComponent<SwitchOldProps, SwitchOldEvents, SwitchOldSlots> {
}
export {};
