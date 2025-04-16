import { SvelteComponent } from "svelte";
import { type ActionArray } from './useActions';
declare const __propDef: {
    props: {
        id?: string | undefined;
        use?: ActionArray;
        checked?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        name?: string | undefined;
        form?: string | undefined;
        value?: unknown | undefined;
        offValue?: unknown | undefined;
        hidden?: boolean;
        displayCheckInverse?: boolean;
        class?: string;
        onCheck?: (val: boolean) => void;
    };
    events: {
        check: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SwitchProps = typeof __propDef.props;
export type SwitchEvents = typeof __propDef.events;
export type SwitchSlots = typeof __propDef.slots;
export default class Switch extends SvelteComponent<SwitchProps, SwitchEvents, SwitchSlots> {
}
export {};
