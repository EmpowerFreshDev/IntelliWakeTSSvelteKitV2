import { SvelteComponent } from "svelte";
import type { TChatBubblePosition } from './Definitions';
declare const __propDef: {
    props: {
        /** The position of the pointer on the chat bubble */ pointerPosition?: TChatBubblePosition;
        shadow?: boolean;
        borderWidth?: number;
        pointerHeight?: number;
        pointerWidthRatio?: number;
        borderRadius?: string;
        backgroundColor?: string;
        borderColor?: string;
        lrPad?: string;
        tbPad?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ChatBubbleProps = typeof __propDef.props;
export type ChatBubbleEvents = typeof __propDef.events;
export type ChatBubbleSlots = typeof __propDef.slots;
/** This is a Svelte component that shows a bubble with a pointer on one side. */
export default class ChatBubble extends SvelteComponent<ChatBubbleProps, ChatBubbleEvents, ChatBubbleSlots> {
}
export {};
