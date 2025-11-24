import { SvelteComponent } from "svelte";
import { type ActionArray } from './useActions';
declare class __sveltets_Render<T extends {
    name?: string | null;
    id?: string | number | null;
} & Record<string, any>> {
    props(): {
        show?: boolean;
        use?: ActionArray;
        possibles: T[];
        selected?: T[] | undefined;
        selectedIDs?: (number | string)[] | undefined;
        created?: T[] | undefined;
        existing?: T[] | undefined;
        name?: string | null;
        placeholder?: string;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        invalid?: boolean;
        isMulti?: boolean;
        allowClearAll?: boolean;
        createPrefix?: string;
        create?: ((value: string) => T | null) | undefined;
        createValid?: ((value: string) => boolean | string) | undefined;
        displayValue?: ((item: T) => string | number) | undefined;
        idValue?: ((item: T) => any) | undefined;
        /** Compute the value of the "key" in the "each" statements to make them unique */ keyValue?: ((item: T, idx?: number) => any) | undefined;
        inputValue?: ((item: T) => any) | undefined;
        sameSize?: boolean;
        resizeTS?: number;
        autoFocus?: boolean;
        zIndex?: number;
        bodyClass?: string;
        parentDivElement?: HTMLDivElement | null;
        form?: string | undefined;
    };
    events(): {
        keypress: KeyboardEvent;
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type MultiSelectProps<T extends {
    name?: string | null;
    id?: string | number | null;
} & Record<string, any>> = ReturnType<__sveltets_Render<T>['props']>;
export type MultiSelectEvents<T extends {
    name?: string | null;
    id?: string | number | null;
} & Record<string, any>> = ReturnType<__sveltets_Render<T>['events']>;
export type MultiSelectSlots<T extends {
    name?: string | null;
    id?: string | number | null;
} & Record<string, any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class MultiSelect<T extends {
    name?: string | null;
    id?: string | number | null;
} & Record<string, any>> extends SvelteComponent<MultiSelectProps<T>, MultiSelectEvents<T>, MultiSelectSlots<T>> {
}
export {};
