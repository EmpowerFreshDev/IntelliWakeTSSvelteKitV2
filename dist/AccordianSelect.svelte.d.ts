import { SvelteComponent } from "svelte";
import type { ISpinItem } from './Definitions';
import { type ActionArray } from './useActions';
declare class __sveltets_Render<T> {
    props(): {
        items: ISpinItem<T>[];
        class?: string;
        centered?: boolean;
        height?: string;
        maxHeight?: string;
        minHeight?: string;
        value?: T | null | undefined;
        disabled?: boolean;
        readonly?: boolean;
        name?: string | undefined;
        form?: string | undefined;
        hidden?: boolean;
        use?: ActionArray;
        required?: boolean;
        show?: boolean;
        id?: string;
    };
    events(): {
        keydown: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type AccordianSelectProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type AccordianSelectEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type AccordianSelectSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class AccordianSelect<T> extends SvelteComponent<AccordianSelectProps<T>, AccordianSelectEvents<T>, AccordianSelectSlots<T>> {
}
export {};
