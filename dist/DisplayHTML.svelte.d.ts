import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: string | null | undefined;
        anchorClasses?: string;
        /**
             * Use the noLinkReplace property to not try to change a URL into an anchor link
             */ noLinkReplace?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DisplayHtmlProps = typeof __propDef.props;
export type DisplayHtmlEvents = typeof __propDef.events;
export type DisplayHtmlSlots = typeof __propDef.slots;
export default class DisplayHtml extends SvelteComponent<DisplayHtmlProps, DisplayHtmlEvents, DisplayHtmlSlots> {
}
export {};
