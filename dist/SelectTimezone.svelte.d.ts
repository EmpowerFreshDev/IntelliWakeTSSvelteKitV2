import { SvelteComponent } from "svelte";
import { type TDateAny } from '@empowerfresh/intelliwake';
declare const __propDef: {
    props: {
        value?: string | null;
        id?: string | undefined;
        name?: string | undefined;
        timezoneList?: "AmericaCommon" | "America" | "All";
        hideIANA?: boolean;
        forDate?: TDateAny;
        showPrefix?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SelectTimezoneProps = typeof __propDef.props;
export type SelectTimezoneEvents = typeof __propDef.events;
export type SelectTimezoneSlots = typeof __propDef.slots;
export default class SelectTimezone extends SvelteComponent<SelectTimezoneProps, SelectTimezoneEvents, SelectTimezoneSlots> {
}
export {};
