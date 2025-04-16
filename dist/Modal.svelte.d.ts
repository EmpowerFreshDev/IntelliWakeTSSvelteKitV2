import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**  A value equal to the 'noShowValue' or 'false' will have the modal hidden, any other value will show it */ show?: unknown;
        /** The value to compare against to have the modal hidden, default 'false' */ noShowValue?: unknown;
        width?: string;
        cancelButton?: string | false;
        okButton?: string | false;
        okActionNotOnEnter?: boolean;
        okDisabled?: boolean;
        noCloseOnOK?: boolean;
        overflowVisible?: boolean;
        disable?: boolean;
        okType?: "submit" | "button";
        marginForStickyHeader?: boolean;
        okButtonWrap?: boolean;
        class?: string;
        classHeader?: string;
        classButton?: string;
        borderFooter?: boolean;
        noSystemCloseActions?: boolean;
        onOK?: () => void;
        onCancel?: () => void;
        onClose?: () => void;
    };
    events: {
        ok: CustomEvent<any>;
        close: CustomEvent<any>;
        cancel: CustomEvent<any>;
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
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
/**
 * This component presents a modal window using the HTML5 dialog element
 * @param {any} show A property that determines if the modal should be shown or not
 * @param {any} noShowValue A property that, if equal to the show property, will hide the modal, otherwise show the modal
 */
export default class Modal extends SvelteComponent<ModalProps, ModalEvents, ModalSlots> {
}
export {};
