import { SvelteComponent } from "svelte";
declare class __sveltets_Render<T extends Record<string, any>> {
    props(): {
        data?: T[] | undefined;
        cols: Partial<Record<keyof T, {
            name: string;
            class?: string;
            headBodyClass?: string;
            hidden?: boolean;
            calc?: ((val: any, row: T) => string) | undefined;
            title?: ((val: any, row: T) => string | undefined) | undefined;
            initialSortAscending?: boolean;
            onClick?: ((row: T, e: MouseEvent) => void) | undefined;
            onEmptyCol?: keyof T | undefined;
        }>>;
        selectedIDs?: number[] | null;
        selectColumn?: string;
        rememberKey?: string | null;
        defaultSort?: string | null;
        limit?: number | null;
        limits?: number[];
        copyButton?: boolean;
        buttonClass?: string;
        page?: number;
        showPageItems?: number;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type TableProps<T extends Record<string, any>> = ReturnType<__sveltets_Render<T>['props']>;
export type TableEvents<T extends Record<string, any>> = ReturnType<__sveltets_Render<T>['events']>;
export type TableSlots<T extends Record<string, any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Table<T extends Record<string, any>> extends SvelteComponent<TableProps<T>, TableEvents<T>, TableSlots<T>> {
}
export {};
