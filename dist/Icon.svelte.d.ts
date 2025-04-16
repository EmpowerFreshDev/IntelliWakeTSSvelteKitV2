import { SvelteComponent } from "svelte";
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
declare const __propDef: {
    props: {
        class?: string;
        id?: string;
        style?: string;
        icon?: IconDefinition | null | undefined;
        title?: string | undefined;
        size?: string;
        color?: string;
        fw?: boolean;
        pull?: string;
        scale?: number;
        translateX?: number;
        translateY?: number;
        rotate?: string | number | undefined;
        flip?: "horizontal" | "vertical" | "both" | boolean;
        spin?: boolean;
        pulse?: boolean;
        primaryColor?: string;
        secondaryColor?: string;
        primaryOpacity?: number;
        secondaryOpacity?: number;
        swapOpacity?: boolean;
        setCustomSize?: (element: SVGElement, size: string) => void;
        getTransform?: (scale: number, translateX: number, translateY: number, rotate: number, flip: "horizontal" | "vertical" | "both" | boolean, translateTimes?: number, translateUnit?: string, rotateUnit?: string) => string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponent<IconProps, IconEvents, IconSlots> {
    get setCustomSize(): (element: SVGElement, size: string) => void;
    get getTransform(): (scale: number, translateX: number, translateY: number, rotate: number, flip: "horizontal" | "vertical" | "both" | boolean, translateTimes?: number, translateUnit?: string, rotateUnit?: string) => string;
}
export {};
