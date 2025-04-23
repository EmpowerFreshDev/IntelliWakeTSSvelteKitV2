import { writable } from 'svelte/store';
import { DateCompare, DateParseTS, SearchRow, SortCompare, SortCompareNull, ToArray } from '@empowerfresh/intelliwake';
export const MasterDetailSubItemBuild = (item, items, collapsedValues, options) => {
    return {
        ...item,
        collapsed: (collapsedValues ?? []).includes(item.value),
        subs: items
            .filter(sub_item => !!sub_item.parent_value && sub_item.parent_value === item.value)
            .sort((a, b) => SortCompareNull(!b.disabled, !a.disabled) ??
            SortCompareNull(a.title, b.title) ??
            SortCompare(a.value, b.value))
            .map(sub_item => MasterDetailSubItemBuild(sub_item, items, collapsedValues, options))
            .filter(sub_item => SearchRow(sub_item, options?.search ?? '') &&
            (!!(sub_item.subs ?? []).length ||
                ((options?.disabled === undefined ?
                    (!!options?.start_date && !!options?.end_date) ?
                        ((!sub_item.start_date || DateCompare(sub_item.start_date, 'IsSameOrBefore', options.end_date, 'day')) &&
                            (!sub_item.end_date || DateCompare(sub_item.end_date, 'IsSameOrAfter', options.start_date, 'day')))
                        :
                            ((options?.disabled ?? null) === null || sub_item.disabled === options?.disabled) :
                    ((options?.disabled ?? null) === null || sub_item.disabled === options?.disabled)) &&
                    (!options?.feature || ToArray(sub_item.feature).includes(options.feature)))))
            .filter(user => !options?.otherFilter || options.otherFilter(user))
    };
};
const storeActivityOverlay = () => {
    const { subscribe, set, update } = writable(0);
    return {
        subscribe,
        show: () => update(prevState => prevState < 0 ? 1 : prevState + 1),
        hide: () => update(prevState => prevState < 2 ? 0 : prevState - 1),
        reset: () => set(0)
    };
};
export const ShowActivityOverlay = storeActivityOverlay();
const storeMessageBox = () => {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        show: (message) => update(prevState => [
            ...prevState.filter(pS => pS.message !== (typeof message === 'object' ? message.message : message)),
            typeof message === 'object' ?
                {
                    ...message,
                    dismissAt: message.dismissAt === undefined ? DateParseTS('now', { seconds: 3 }) : message.dismissAt
                } :
                { message: message, dismissAt: DateParseTS('now', { seconds: 3 }) }
        ]),
        hide: (message) => update(prevState => prevState.filter(pS => !ToArray(message).includes(pS.message))),
        reset: () => set([])
    };
};
export const ShowMessageBox = storeMessageBox();
