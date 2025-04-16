var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { writable } from 'svelte/store';
import { DateCompare, DateParseTS, SearchRow, SortCompare, SortCompareNull, ToArray } from '@empowerfresh/intelliwake';
export var MasterDetailSubItemBuild = function (item, items, collapsedValues, options) {
    return __assign(__assign({}, item), { collapsed: (collapsedValues !== null && collapsedValues !== void 0 ? collapsedValues : []).includes(item.value), subs: items
            .filter(function (sub_item) { return !!sub_item.parent_value && sub_item.parent_value === item.value; })
            .sort(function (a, b) {
            var _a, _b;
            return (_b = (_a = SortCompareNull(!b.disabled, !a.disabled)) !== null && _a !== void 0 ? _a : SortCompareNull(a.title, b.title)) !== null && _b !== void 0 ? _b : SortCompare(a.value, b.value);
        })
            .map(function (sub_item) { return MasterDetailSubItemBuild(sub_item, items, collapsedValues, options); })
            .filter(function (sub_item) {
            var _a, _b, _c, _d;
            return SearchRow(sub_item, (_a = options === null || options === void 0 ? void 0 : options.search) !== null && _a !== void 0 ? _a : '') &&
                (!!((_b = sub_item.subs) !== null && _b !== void 0 ? _b : []).length ||
                    (((options === null || options === void 0 ? void 0 : options.disabled) === undefined ?
                        (!!(options === null || options === void 0 ? void 0 : options.start_date) && !!(options === null || options === void 0 ? void 0 : options.end_date)) ?
                            ((!sub_item.start_date || DateCompare(sub_item.start_date, 'IsSameOrBefore', options.end_date, 'day')) &&
                                (!sub_item.end_date || DateCompare(sub_item.end_date, 'IsSameOrAfter', options.start_date, 'day')))
                            :
                                (((_c = options === null || options === void 0 ? void 0 : options.disabled) !== null && _c !== void 0 ? _c : null) === null || sub_item.disabled === (options === null || options === void 0 ? void 0 : options.disabled)) :
                        (((_d = options === null || options === void 0 ? void 0 : options.disabled) !== null && _d !== void 0 ? _d : null) === null || sub_item.disabled === (options === null || options === void 0 ? void 0 : options.disabled))) &&
                        (!(options === null || options === void 0 ? void 0 : options.feature) || ToArray(sub_item.feature).includes(options.feature))));
        })
            .filter(function (user) { return !(options === null || options === void 0 ? void 0 : options.otherFilter) || options.otherFilter(user); }) });
};
var storeActivityOverlay = function () {
    var _a = writable(0), subscribe = _a.subscribe, set = _a.set, update = _a.update;
    return {
        subscribe: subscribe,
        show: function () { return update(function (prevState) { return prevState < 0 ? 1 : prevState + 1; }); },
        hide: function () { return update(function (prevState) { return prevState < 2 ? 0 : prevState - 1; }); },
        reset: function () { return set(0); }
    };
};
export var ShowActivityOverlay = storeActivityOverlay();
var storeMessageBox = function () {
    var _a = writable([]), subscribe = _a.subscribe, set = _a.set, update = _a.update;
    return {
        subscribe: subscribe,
        show: function (message) { return update(function (prevState) { return __spreadArray(__spreadArray([], prevState.filter(function (pS) { return pS.message !== (typeof message === 'object' ? message.message : message); }), true), [
            typeof message === 'object' ? __assign(__assign({}, message), { dismissAt: message.dismissAt === undefined ? DateParseTS('now', { seconds: 3 }) : message.dismissAt }) :
                { message: message, dismissAt: DateParseTS('now', { seconds: 3 }) }
        ], false); }); },
        hide: function (message) { return update(function (prevState) { return prevState.filter(function (pS) { return !ToArray(message).includes(pS.message); }); }); },
        reset: function () { return set([]); }
    };
};
export var ShowMessageBox = storeMessageBox();
