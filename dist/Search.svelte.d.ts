import { SvelteComponent } from "svelte";
import { type ActionArray } from './useActions';
declare const __propDef: {
    props: {
        [x: string]: any;
        id?: string | undefined | undefined;
        value?: string | undefined;
        use?: ActionArray;
        delayMS?: number | undefined;
        placeholder?: string | undefined;
        bordered?: boolean | undefined;
        element?: HTMLInputElement | undefined;
        onChange?: ((val: string) => void) | undefined;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export type SearchProps = typeof __propDef.props;
export type SearchEvents = typeof __propDef.events;
export type SearchSlots = typeof __propDef.slots;
export default class Search extends SvelteComponent<SearchProps, SearchEvents, SearchSlots> {
}
export {};
