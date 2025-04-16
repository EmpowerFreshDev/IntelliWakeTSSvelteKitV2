var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { CleanNumberNull, IsEqual, isNullUndefined, ReplaceAll, YYYY_MM_DD_HH_mm_ss } from '@empowerfresh/intelliwake';
import { env } from '$env/dynamic/public';
import { tick } from 'svelte';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { get } from 'svelte/store';
export var KEY_UP_ARROW = 38;
export var KEY_DOWN_ARROW = 40;
export var KEY_LEFT_ARROW = 37;
export var KEY_RIGHT_ARROW = 39;
export var KEY_SPACE = 32;
export var KEY_ENTER = 13;
export var KEY_TAB = 9;
export var KEY_BACKSPACE = 8;
export var KEY_ESCAPE = 27;
export var KEY_STRING_ENTER = 'Enter';
export var KEY_STRING_SPACE = 'Space';
export var KEY_STRING_DOWN_ARROW = 'ArrowDown';
export var KEY_STRING_UP_ARROW = 'ArrowUp';
export var KEY_STRING_LEFT_ARROW = 'ArrowLeft';
export var KEY_STRING_RIGHT_ARROW = 'ArrowRight';
export var KEY_STRING_TAB = 'Tab';
export var KEY_STRING_BACKSPACE = 'Backspace';
export var KEY_STRING_ESCAPE = 'Escape';
export var IsMetaKey = function (e) {
    return e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        [
            'Backspace',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Tab',
            'Escape',
            'Enter'
        ].includes(e.key);
};
export var CaptureGPS = function () {
    return new Promise(function (resolve) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position);
            }, function () {
                resolve(null);
            });
        }
        else {
            resolve(null);
        }
    });
};
export var DownloadBase64Data = function (fileName, base64) {
    var link = document.createElement('a');
    link.href = base64;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
};
export var CopyRefToClipboard = function (ref, tryFormatted) {
    var _a, _b;
    if (tryFormatted === void 0) { tryFormatted = true; }
    if (ref && document.createRange && window.getSelection) {
        var range = document.createRange();
        var sel = window.getSelection();
        if (sel) {
            // unselect any element in the page
            sel.removeAllRanges();
            var elsNoCopy = ref.getElementsByClassName('noCopy');
            for (var _i = 0, elsNoCopy_1 = elsNoCopy; _i < elsNoCopy_1.length; _i++) {
                var el = elsNoCopy_1[_i];
                el.classList.add('noCopyActive');
            }
            var elsOnlyCopy = ref.getElementsByClassName('onlyCopy');
            for (var _c = 0, elsOnlyCopy_1 = elsOnlyCopy; _c < elsOnlyCopy_1.length; _c++) {
                var el = elsOnlyCopy_1[_c];
                el.classList.add('onlyCopyActive');
            }
            // let ths = ref.getElementsByTagName('th') as any[]
            // for (let i = 0; i < ths.length; i++) {
            // 	ths[i].setAttribute('copyuserelect', ths[i].style.userSelect)
            // 	ths[i].style.userSelect = ths[i].classList.contains('noCopy') ? 'none' : 'auto'
            // 	if (ths[i].classList.contains('onlyCopy')) {
            // 		ths[i].setAttribute('copyuserdisplay', ths[i].style.display)
            // 		ths[i].style.display = 'inherit'
            // 	}
            // }
            // let tds = ref.getElementsByTagName('td') as any[]
            // for (let i = 0; i < tds.length; i++) {
            // 	tds[i].setAttribute('copyuserelect', tds[i].style.userSelect)
            // 	tds[i].style.userSelect = tds[i].classList.contains('noCopy') ? 'none' : 'auto'
            // 	if (tds[i].classList.contains('onlyCopy')) {
            // 		tds[i].setAttribute('copyuserdisplay', ths[i].style.display)
            // 		tds[i].style.display = 'inherit'
            // 	}
            // }
            var brs = ref.getElementsByTagName('br');
            for (var i = 0; i < brs.length; i++) {
                brs[i].setAttribute('copyuserdisplay', brs[i].style.display);
                brs[i].style.display = 'none';
            }
            var hrs = ref.getElementsByTagName('hr');
            for (var i = 0; i < hrs.length; i++) {
                hrs[i].setAttribute('copyuserdisplay', hrs[i].style.display);
                hrs[i].style.display = 'none';
            }
            if (tryFormatted) {
                try {
                    range.selectNode(ref);
                    sel.addRange(range);
                }
                catch (e) {
                    range.selectNodeContents(ref);
                    sel.addRange(range);
                }
            }
            else {
                range.selectNodeContents(ref);
                sel.addRange(range);
            }
            document.execCommand('copy');
            sel.removeAllRanges();
            // for (let i = 0; i < ths.length; i++) {
            // 	ths[i].style.userSelect = ths[i].getAttribute('copyuserelect')
            // 	ths[i].removeAttribute('copyuserelect')
            // 	if (ths[i].classList.contains('onlyCopy')) {
            // 		ths[i].style.display = ths[i].getAttribute('display')
            // 		ths[i].removeAttribute('copyuserdisplay')
            // 	}
            // }
            // for (let i = 0; i < tds.length; i++) {
            // 	tds[i].style.userSelect = tds[i].getAttribute('copyuserelect')
            // 	tds[i].removeAttribute('copyuserelect')
            // 	if (tds[i].classList.contains('onlyCopy')) {
            // 		tds[i].style.display = tds[i].getAttribute('display')
            // 		tds[i].removeAttribute('copyuserdisplay')
            // 	}
            // }
            for (var _d = 0, elsNoCopy_2 = elsNoCopy; _d < elsNoCopy_2.length; _d++) {
                var el = elsNoCopy_2[_d];
                el.classList.remove('noCopyActive');
            }
            for (var _e = 0, elsOnlyCopy_2 = elsOnlyCopy; _e < elsOnlyCopy_2.length; _e++) {
                var el = elsOnlyCopy_2[_e];
                el.classList.remove('onlyCopyActive');
            }
            for (var i = 0; i < brs.length; i++) {
                brs[i].style.display = (_a = brs[i].getAttribute('display')) !== null && _a !== void 0 ? _a : '';
                brs[i].removeAttribute('copyuserdisplay');
            }
            for (var i = 0; i < hrs.length; i++) {
                hrs[i].style.display = (_b = hrs[i].getAttribute('display')) !== null && _b !== void 0 ? _b : '';
                hrs[i].removeAttribute('copyuserdisplay');
            }
            return true;
        }
    }
    return false;
};
export var TableIDToExcel = function (tableID, fileName, appendDateTime) {
    if (appendDateTime === void 0) { appendDateTime = true; }
    var downloadName = "".concat(fileName !== null && fileName !== void 0 ? fileName : tableID).concat(appendDateTime ? "-".concat(YYYY_MM_DD_HH_mm_ss('now'), ".xls") : '');
    // const dataType = 'application/vnd.ms-excel'
    var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect === null || tableSelect === void 0 ? void 0 : tableSelect.outerHTML; //.replace(/ /g, '%20')
    tableHTML = ReplaceAll('<br>', ' ', tableHTML);
    var a = document.createElement('a');
    var blob = new Blob([tableHTML], { type: dataType });
    a.href = URL.createObjectURL(blob);
    a.download = downloadName;
    a.click();
};
export var DoIDsMatch = function (a, b) {
    return IsEqual(a, b) || IsEqual(a === null || a === void 0 ? void 0 : a.id, b === null || b === void 0 ? void 0 : b.id);
};
export var IsProd = function () { var _a; return !!((_a = env.VITE_APP_STAGE) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith('prod')); };
/**
 * A Svelte "Use Action" that transfers focus to the current element when the object is added to the DOM
 * Usage: <input use:autoFocus />
 *
 * @param el
 */
export function autoFocus(el) {
    tick().then(function () {
        el.focus();
    });
}
/**
 * A Svelte "Use Action" that scrolls the current component to the bottom when it is added to the DOM
 * Usage: <div use:scrollToBottom />
 *
 * Or, if you need it to rerun, pass it any value as its parameter that, when changed, will re-scroll to bottom
 * Usage: <div use:scrollToBottom={changeValue} />
 *
 * @param el
 * @param _toggleUpdate
 */
export function scrollToBottom(el, _toggleUpdate) {
    var scroll = function () { return el.scroll({
        top: el.scrollHeight
    }); };
    tick().then(function () { return scroll(); });
    return { update: scroll };
}
/**
 * The `upDownArrows` function adds an event listener to an HTMLInputElement that responds to arrow key presses.
 * NOTE: The id of the element must contain the identifier before an underscore to work, as in '1_field_name', '2_field_name', etc.
 * If an up arrow is pressed, the routine finds the Pre ID and sets focus on it, or moves to the end of the list if at the first element.
 * A down arrow behaves similarly, but moves to the start of the list if at the end.
 * If a preID or postID is not provided, the function looks for the pre/post element in the list using `id` of the elements.
 *
 * @param el - The HTMLElement for which the event listener is set.
 * @param prePost - Optional parameter that contains the precedessor (preID) and successor (postID) IDs and the list to traverse.
 * @param prePost.preID - The precedessor ID. This should either be a number, a string, null or defined.
 * @param prePost.postID - The successor ID. This should either be a number, a string, null or defined.
 * @param prePost.list - The list of items to traverse. Each object in the list should contain an id field with a number.
 *
 * @returns An object with a `destroy` method to remove the event listener from the HTMLInputElement.
 *
 * @example
 * Example using a list with the required id column for the function to derive the pre and post element matching the id of the element:
 * const items = [{id: 1}, {id: 2}, {id:3}, {id: 4}]
 * {#each items as item}
 *        <input id='{item.id}_field_name' use:upDownArrows={{list: items}}>
 * {/each}
 *
 * Example with hard-coded preID and postID:
 * <input id='1_field_name' use:upDownArrows={{preID: 4, postID: 2}}>
 * <input id='2_field_name' use:upDownArrows={{preID: 1, postID: 3}}>
 * <input id='3_field_name' use:upDownArrows={{preID: 2, postID: 4}}>
 * <input id='4_field_name' use:upDownArrows={{preID: 3, postID: 1}}>
 */
export function upDownArrows(el, prePost) {
    var lastMove = new Date().valueOf();
    var handleKeyDown = function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (lastMove > new Date().valueOf() - 100) {
            e.preventDefault();
        }
        else {
            switch (e.key) {
                case KEY_STRING_UP_ARROW:
                    {
                        var components = (_a = e.target.id) === null || _a === void 0 ? void 0 : _a.split('_');
                        var currentID_1 = CleanNumberNull(components.shift());
                        if (currentID_1 !== null && components.length) {
                            var preID = prePost === null || prePost === void 0 ? void 0 : prePost.preID;
                            if (!preID) {
                                var listLength = (_c = (_b = prePost === null || prePost === void 0 ? void 0 : prePost.list) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
                                var currentIdx = ((_d = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _d !== void 0 ? _d : []).findIndex(function (item) { return item.id == currentID_1; });
                                if (currentIdx === 0) {
                                    preID = CleanNumberNull((_f = ((_e = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _e !== void 0 ? _e : [])[listLength - 1]) === null || _f === void 0 ? void 0 : _f.id);
                                }
                                else if (currentIdx > 0) {
                                    preID = CleanNumberNull((_h = ((_g = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _g !== void 0 ? _g : [])[currentIdx - 1]) === null || _h === void 0 ? void 0 : _h.id);
                                }
                            }
                            var element = document.getElementById("".concat(preID, "_").concat(components.join('_')));
                            if (element) {
                                lastMove = new Date().valueOf();
                                element === null || element === void 0 ? void 0 : element.focus();
                            }
                        }
                    }
                    e.preventDefault();
                    break;
                case KEY_STRING_DOWN_ARROW:
                    {
                        var components = (_j = e.target.id) === null || _j === void 0 ? void 0 : _j.split('_');
                        var currentID_2 = CleanNumberNull(components.shift());
                        if (currentID_2 !== null && components.length) {
                            var postID = prePost === null || prePost === void 0 ? void 0 : prePost.postID;
                            if (!postID) {
                                var listLength = (_l = (_k = prePost === null || prePost === void 0 ? void 0 : prePost.list) === null || _k === void 0 ? void 0 : _k.length) !== null && _l !== void 0 ? _l : 0;
                                var currentIdx = ((_m = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _m !== void 0 ? _m : []).findIndex(function (item) { return item.id == currentID_2; });
                                if (currentIdx === listLength - 1) {
                                    postID = CleanNumberNull((_p = ((_o = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _o !== void 0 ? _o : [])[0]) === null || _p === void 0 ? void 0 : _p.id);
                                }
                                else if (currentIdx >= 0) {
                                    postID = CleanNumberNull((_r = ((_q = prePost === null || prePost === void 0 ? void 0 : prePost.list) !== null && _q !== void 0 ? _q : [])[currentIdx + 1]) === null || _r === void 0 ? void 0 : _r.id);
                                }
                            }
                            var element = document.getElementById("".concat(postID, "_").concat(components.join('_')));
                            if (element) {
                                lastMove = new Date().valueOf();
                                element === null || element === void 0 ? void 0 : element.focus();
                            }
                        }
                    }
                    e.preventDefault();
                    break;
            }
        }
    };
    el.addEventListener('keydown', handleKeyDown);
    return {
        destroy: function () {
            el.removeEventListener('keydown', handleKeyDown);
        }
    };
}
/**
 * Handles 'keydown' event on an input or select element to enable next/prev field navigation
 * using left or right arrow keys.
 *
 * @export
 * @param {HTMLElement} el - The target input/select element.
 * @param {object} prePost - An optional configuration object.
 * @param {string | null | undefined} prePost.preField - The previous field to navigate to.
 * @param {string | null | undefined} prePost.postField - The next field to navigate to.
 * @param {string[]} prePost.fieldList - List of fields for navigation.
 *
 * @returns {object} An object with 'destroy' method that removes the 'keydown' event listener.
 *
 * @example
 * nextPrevArrows(inputElement, {
 *   preField: '1_field_name',
 *   postField: '3_field_name',
 *   fieldList: ['1_field_name', '2_field_name', '3_field_name']
 * });
 */
export function nextPrevArrows(el, prePost) {
    var lastMove = new Date().valueOf();
    var handleKeyDown = function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (lastMove > new Date().valueOf() - 100) {
            e.preventDefault();
        }
        else {
            switch (e.key) {
                case KEY_STRING_LEFT_ARROW:
                    {
                        var components = (_a = e.target.id) === null || _a === void 0 ? void 0 : _a.split('_');
                        var currentField = components.slice(1).join('_');
                        var currentID = CleanNumberNull(components.shift());
                        if (currentID !== null && !!currentField) {
                            var preField = (_f = (_b = prePost === null || prePost === void 0 ? void 0 : prePost.preField) !== null && _b !== void 0 ? _b : ((_c = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) !== null && _c !== void 0 ? _c : [])[((_e = (_d = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) === null || _d === void 0 ? void 0 : _d.indexOf(currentField)) !== null && _e !== void 0 ? _e : -2) - 1]) !== null && _f !== void 0 ? _f : ((_g = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) !== null && _g !== void 0 ? _g : [])[((_h = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) !== null && _h !== void 0 ? _h : []).length - 1];
                            if (preField) {
                                var element = document.getElementById("".concat(currentID, "_").concat(preField));
                                if (element) {
                                    lastMove = new Date().valueOf();
                                    element === null || element === void 0 ? void 0 : element.focus();
                                }
                            }
                        }
                    }
                    e.preventDefault();
                    break;
                case KEY_STRING_RIGHT_ARROW:
                    {
                        var components = (_j = e.target.id) === null || _j === void 0 ? void 0 : _j.split('_');
                        var currentField = components.slice(1).join('_');
                        var currentID = CleanNumberNull(components.shift());
                        if (currentID !== null && !!currentField) {
                            var postField = (_p = (_k = prePost === null || prePost === void 0 ? void 0 : prePost.postField) !== null && _k !== void 0 ? _k : ((_l = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) !== null && _l !== void 0 ? _l : [])[((_o = (_m = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) === null || _m === void 0 ? void 0 : _m.indexOf(currentField)) !== null && _o !== void 0 ? _o : -2) + 1]) !== null && _p !== void 0 ? _p : ((_q = prePost === null || prePost === void 0 ? void 0 : prePost.fieldList) !== null && _q !== void 0 ? _q : [])[0];
                            if (postField) {
                                var element = document.getElementById("".concat(currentID, "_").concat(postField));
                                if (element) {
                                    lastMove = new Date().valueOf();
                                    element === null || element === void 0 ? void 0 : element.focus();
                                }
                            }
                        }
                    }
                    e.preventDefault();
                    break;
            }
        }
    };
    el.addEventListener('keydown', handleKeyDown);
    return {
        destroy: function () {
            el.removeEventListener('keydown', handleKeyDown);
        }
    };
}
/**
 * A Svelte "Use Action" for a <textarea> object that adds the ability to use 'Alt-Enter' to add a line item
 * Usage <textarea use:textAreaAltEnter />
 *
 * @param el
 */
export function textAreaAltEnter(el) {
    // const handleFocus = async () => {
    // 	await tick()
    // 	el && typeof el.select === 'function' && el.select()
    // }
    var handleKeyUp = function (e) {
        if (!!e.target && e.key === 'Enter' && e.altKey) {
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            var text = e.target.value;
            var before = text.substring(0, start);
            var after = text.substring(end, text.length);
            el.value = (before + '\r\n' + after);
            el.selectionStart = el.selectionEnd = start + 1;
            e.target.blur();
            e.target.focus();
            e.preventDefault();
        }
    };
    var handleKeyDown = function (e) {
        if (!!e.target && !!e.target.form && e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    };
    // el.addEventListener('focus', handleFocus)
    el.addEventListener('keydown', handleKeyDown);
    el.addEventListener('keyup', handleKeyUp);
    return {
        destroy: function () {
            // el.removeEventListener('focus', handleFocus)
            el.removeEventListener('keydown', handleKeyDown);
            el.removeEventListener('keyup', handleKeyUp);
        }
    };
}
export var ErrorMessageStack = function (e) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return ({
        message: (_e = (_c = (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : (_b = e === null || e === void 0 ? void 0 : e.error) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : (_d = e === null || e === void 0 ? void 0 : e.reason) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : 'Unknown message',
        stack: (_k = (_h = (_f = e === null || e === void 0 ? void 0 : e.stack) !== null && _f !== void 0 ? _f : (_g = e === null || e === void 0 ? void 0 : e.error) === null || _g === void 0 ? void 0 : _g.stack) !== null && _h !== void 0 ? _h : (_j = e === null || e === void 0 ? void 0 : e.reason) === null || _j === void 0 ? void 0 : _j.stack) !== null && _k !== void 0 ? _k : 'Unknown stack'
    });
};
/**
 * A Svelte "Use Action" that selects the text in the current element when it comes into focus
 * Usage: <input use:selectOnFocus />
 *
 * @param el
 */
export function selectOnFocus(el) {
    var _this = this;
    var okToSelect = true;
    var handleFocus = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    okToSelect = true;
                    return [4 /*yield*/, tick()
                            .then(function () {
                            return setTimeout(function () {
                                if (okToSelect && el && typeof el.select === 'function') {
                                    el.select();
                                }
                            }, 50);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleBlur = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            okToSelect = false;
            return [2 /*return*/];
        });
    }); };
    el.addEventListener('focus', handleFocus);
    el.addEventListener('blur', handleBlur);
    return {
        destroy: function () {
            el.removeEventListener('focus', handleFocus);
            el.removeEventListener('blur', handleBlur);
        }
    };
}
/**
 * A Svelte "Use Action" that triggers a Forms Submit button when a value is changed on an element
 * Usage: <input use:clickSubmitOnInput />
 *
 * @param el
 */
export function clickSubmitOnChange(el) {
    var _this = this;
    var _a;
    var firing = false;
    var submitButton = (_a = el.querySelector('button[type="submit"]')) !== null && _a !== void 0 ? _a : el.querySelector('button:not([type])');
    var handleChange = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tick()
                        .then(function () {
                        if (!firing) {
                            if (submitButton) {
                                submitButton.click();
                            }
                            else {
                                el.requestSubmit();
                            }
                        }
                        firing = false;
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleKeypress = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            // e.target.dispatchEvent(new Event('input'))
            firing = true;
            if (submitButton) {
                submitButton.click();
            }
            else {
                el.requestSubmit();
            }
        }
    };
    el.addEventListener('change', handleChange);
    el.addEventListener('keypress', handleKeypress);
    return {
        destroy: function () {
            el.removeEventListener('change', handleChange);
            el.removeEventListener('keypress', handleKeypress);
        }
    };
}
/**
 * A Svelte "Use Action" that triggers a Forms Submit button when the focus is lost from the form
 * Usage: <input use:clickSubmitOnFocusOut />
 *
 * @param el
 */
export function clickSubmitOnFocusOut(el) {
    var _this = this;
    var _a;
    var firing = false;
    var submitButton = (_a = el.querySelector('button[type="submit"]')) !== null && _a !== void 0 ? _a : el.querySelector('button:not([type])');
    var handleFocusOut = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tick()
                        .then(function () {
                        if (!firing) {
                            if (submitButton) {
                                submitButton.click();
                            }
                            else {
                                el.requestSubmit();
                            }
                        }
                        firing = false;
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleKeypress = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            // e.target.dispatchEvent(new Event('input'))
            firing = true;
            if (submitButton) {
                submitButton.click();
            }
            else {
                el.requestSubmit();
            }
        }
    };
    el.addEventListener('focusout', handleFocusOut);
    el.addEventListener('keypress', handleKeypress);
    return {
        destroy: function () {
            el.removeEventListener('focusout', handleFocusOut);
            el.removeEventListener('keypress', handleKeypress);
        }
    };
}
/**
 * Sets a search parameter to the current URL. The URL is then updated with the new parameter.
 * If the provided value is null or an empty string, the parameter is removed from the URL.
 *
 * @param key - The key of the search parameter.
 * @param value - The value to set for the search parameter. If null or an empty string, the parameter is removed.
 */
export function setSearchParam(key, value) {
    return __awaiter(this, void 0, void 0, function () {
        var pageURL, url;
        var _a;
        return __generator(this, function (_b) {
            if (browser) {
                pageURL = get(page).url;
                if (pageURL.searchParams.get(key) !== value) {
                    url = new URL(pageURL);
                    if (isNullUndefined(value)) {
                        url.searchParams.delete(key);
                    }
                    else {
                        url.searchParams.set(key, (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : '');
                    }
                    return [2 /*return*/, goto(url.href, { replaceState: true })];
                }
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Checks whether the current device is a mobile or tablet device based on the browsers userAgent.
 *
 * @returns {boolean} True if the device is a mobile or tablet device, false otherwise.
 */
export function IsMobileOrTablet() {
    return browser && /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
/**
 * Downloads a given string as a file with the specified filename.
 *
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} text - The content of the file to be downloaded.
 *
 * @return {void}
 */
export function DownloadString(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
