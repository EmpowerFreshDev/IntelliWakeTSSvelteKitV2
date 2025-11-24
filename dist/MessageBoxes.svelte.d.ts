import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MessageBoxesProps = typeof __propDef.props;
export type MessageBoxesEvents = typeof __propDef.events;
export type MessageBoxesSlots = typeof __propDef.slots;
export default class MessageBoxes extends SvelteComponent<MessageBoxesProps, MessageBoxesEvents, MessageBoxesSlots> {
}
export {};
