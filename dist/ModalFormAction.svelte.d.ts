import { SvelteComponent } from "svelte";
import type { TEnhanceOptions } from './FormEnhance';
declare const __propDef: {
    props: {
        action: string;
        formEnhance?: TEnhanceOptions | null | undefined;
        show?: unknown;
        noShowValue?: unknown;
        width?: string;
        cancelButton?: string | false;
        okButton?: string | false;
        okDisabled?: boolean;
        noCloseOnOK?: boolean;
        overflowVisible?: boolean;
        disable?: boolean;
        marginForStickyHeader?: boolean;
        okButtonWrap?: boolean;
        class?: string;
        classHeader?: string;
        classButton?: string;
        borderFooter?: boolean;
        onCancel?: () => void;
        onClose?: () => void;
    };
    events: {
        cancel: CustomEvent<any>;
        close: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        body: {};
        leftFooter: {};
        rightFooter: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ModalFormActionProps = typeof __propDef.props;
export type ModalFormActionEvents = typeof __propDef.events;
export type ModalFormActionSlots = typeof __propDef.slots;
export default class ModalFormAction extends SvelteComponent<ModalFormActionProps, ModalFormActionEvents, ModalFormActionSlots> {
}
export {};
