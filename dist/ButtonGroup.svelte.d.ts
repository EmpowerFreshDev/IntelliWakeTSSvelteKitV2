import { SvelteComponent } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        [x: string]: any;
        value?: T | null | undefined;
        options: (string | {
            key: T;
            name: string;
            disabled?: boolean;
            hidden?: boolean;
        })[];
        class?: string | undefined;
        name?: string | undefined | undefined;
        readonly?: boolean | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type ButtonGroupProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type ButtonGroupEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type ButtonGroupSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class ButtonGroup<T> extends SvelteComponent<ButtonGroupProps<T>, ButtonGroupEvents<T>, ButtonGroupSlots<T>> {
}
export {};
