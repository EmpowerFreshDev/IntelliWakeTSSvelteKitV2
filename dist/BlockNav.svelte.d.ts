import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        when?: boolean;
        id?: string;
        forceNav?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BlockNavProps = typeof __propDef.props;
export type BlockNavEvents = typeof __propDef.events;
export type BlockNavSlots = typeof __propDef.slots;
export default class BlockNav extends SvelteComponent<BlockNavProps, BlockNavEvents, BlockNavSlots> {
}
export {};
