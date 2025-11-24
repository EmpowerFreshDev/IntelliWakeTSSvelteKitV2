import type { Writable } from 'svelte/store';
import { type TDateAny } from '@solidbasisventures/intelliwaketsfoundation';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
export interface IFAProps {
    icon: IconDefinition;
    size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
    color?: string;
    fw?: boolean;
    pull?: 'left' | 'right';
    scale?: number;
    translateX?: number;
    translateY?: number;
    rotate?: string;
    flip?: boolean;
    spin?: boolean;
    pulse?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    primaryOpacity?: number;
    secondaryOpacity?: number;
    swapOpacity?: boolean;
    title?: string;
}
export interface IDDAction {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    faProps?: IFAProps;
    faPropHidden?: boolean;
    active?: boolean;
    title?: string;
    action?: () => void;
    dividerGroup?: string;
    headerGroup?: string;
    noCloseMenu?: boolean;
    indented?: boolean;
    style?: string;
    alternateFAProps?: IFAProps;
    alternateTitle?: string | null;
    alternateAction?: () => void;
    alternateNoClose?: boolean;
    href?: string;
    hrefReplace?: boolean;
}
export interface ISpinItem<T = number> {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    faProps?: IFAProps;
    faPropHidden?: boolean;
    id: T;
    title: string;
    dividerGroup?: string;
    headerGroup?: string;
    indented?: boolean;
    style?: string;
    classItem?: string | null;
}
export type TListGroupItem = {
    title: string;
    sub_title?: string;
    hover_title?: string;
    hidden?: boolean;
    faProps?: IFAProps;
    icon?: IconDefinition;
    color?: string;
    href?: string;
    strikeThrough?: boolean;
    linkClick?: () => void;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    badgeValue?: number | string | null;
    badgeColor?: string;
    badgeClass?: string | null;
    rightText?: string | null;
    paneName?: string;
    value?: string | null;
    key?: string | null;
    section?: string;
    parent_value?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    disabled?: boolean | null;
    feature?: string[] | string | null;
    subs?: TListGroupItem[];
    collapsed?: boolean;
    dataSvelteKitPreloadData?: 'tap' | 'hover';
    noLinkReplace?: boolean;
    bigIcon?: boolean;
    itemClass?: string;
};
export declare const MasterDetailSubItemBuild: (item: TListGroupItem, items: TListGroupItem[], collapsedValues: (string | null | undefined)[], options?: {
    start_date?: string | null;
    end_date?: string | null;
    disabled?: boolean | null;
    search?: string;
    feature?: string | null;
    otherFilter?: ((item: TListGroupItem) => boolean);
}) => TListGroupItem;
export interface ITabHref {
    faProps?: IFAProps;
    key: string;
    title?: string;
    href?: string;
    dataSvelteKitPreloadData?: 'tap' | 'hover';
    isOpen?: boolean;
    hidden?: boolean;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    badgeValue?: number | null;
    badgeColor?: string;
    isInitial?: boolean;
    disabled?: boolean;
}
export interface ITabItem {
    hidden?: boolean;
    faProps?: IFAProps;
    key: string;
    title?: string;
    /** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
    badgeValue?: number | null;
    badgeColor?: string;
}
export type TTableCol<T extends Record<string, any> = Record<string, any>> = Partial<Record<keyof T, {
    name: string;
    class?: string;
    headBodyClass?: string;
    hidden?: boolean;
    calc?: (val: any, row: T) => string;
    title?: (val: any, row: T) => string | undefined;
    initialSortAscending?: boolean;
    onClick?: (row: T, e: MouseEvent) => void;
    onEmptyCol?: keyof T;
}>>;
export declare const ShowActivityOverlay: Pick<Writable<number>, "subscribe"> & {
    show: () => void;
    hide: () => void;
    reset: () => void;
};
export interface IMessageBoxStore {
    message: string | null;
    messageBody?: string | null;
    color?: string;
    dismissAt?: TDateAny | null;
}
export declare const ShowMessageBox: Pick<Writable<IMessageBoxStore[]>, "subscribe"> & {
    show: (message: string | IMessageBoxStore) => void;
    hide: (message: (string | null) | (string | null)[]) => void;
    reset: () => void;
};
export type TChatBubblePosition = 'Right' | 'Left' | 'Top' | 'Bottom';
export type TDropDownControlPosition = 'Right' | 'Left' | 'Center' | 'CenterForce' | null;
export type TDropDownControlDrop = 'Up' | 'Down' | null;
