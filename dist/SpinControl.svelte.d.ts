import { SvelteComponent } from "svelte";
import type { ISpinItem } from './Definitions';
import { type ActionArray } from './useActions';
declare class __sveltets_Render<T> {
    props(): {
        items: ISpinItem<T>[];
        centered?: boolean;
        height?: string;
        value?: T | undefined;
        disabled?: boolean;
        readonly?: boolean;
        name?: string | undefined;
        form?: string | undefined;
        hidden?: boolean;
        use?: ActionArray;
        id?: string;
    };
    events(): {
        keydown: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type SpinControlProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type SpinControlEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type SpinControlSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class SpinControl<T> extends SvelteComponent<SpinControlProps<T>, SpinControlEvents<T>, SpinControlSlots<T>> {
}
export {};
