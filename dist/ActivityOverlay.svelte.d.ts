import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        show?: boolean;
        allowCancelAfterSeconds?: number | null;
        size?: string;
        position?: "fixed" | "absolute";
        zIndex?: number;
        onManualClose?: () => void;
    };
    events: {
        ManualClose: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ActivityOverlayProps = typeof __propDef.props;
export type ActivityOverlayEvents = typeof __propDef.events;
export type ActivityOverlaySlots = typeof __propDef.slots;
export default class ActivityOverlay extends SvelteComponent<ActivityOverlayProps, ActivityOverlayEvents, ActivityOverlaySlots> {
}
export {};
