export declare const KEY_UP_ARROW = 38;
export declare const KEY_DOWN_ARROW = 40;
export declare const KEY_LEFT_ARROW = 37;
export declare const KEY_RIGHT_ARROW = 39;
export declare const KEY_SPACE = 32;
export declare const KEY_ENTER = 13;
export declare const KEY_TAB = 9;
export declare const KEY_BACKSPACE = 8;
export declare const KEY_ESCAPE = 27;
export declare const KEY_STRING_ENTER = "Enter";
export declare const KEY_STRING_SPACE = "Space";
export declare const KEY_STRING_DOWN_ARROW = "ArrowDown";
export declare const KEY_STRING_UP_ARROW = "ArrowUp";
export declare const KEY_STRING_LEFT_ARROW = "ArrowLeft";
export declare const KEY_STRING_RIGHT_ARROW = "ArrowRight";
export declare const KEY_STRING_TAB = "Tab";
export declare const KEY_STRING_BACKSPACE = "Backspace";
export declare const KEY_STRING_ESCAPE = "Escape";
export declare const IsMetaKey: (e: KeyboardEvent) => boolean;
export declare const CaptureGPS: () => Promise<GeolocationPosition | null>;
export declare const DownloadBase64Data: (fileName: string, base64: string) => void;
export declare const CopyRefToClipboard: (ref: HTMLElement, tryFormatted?: boolean) => boolean;
export declare const TableIDToExcel: (tableID: string, fileName?: string, appendDateTime?: boolean) => void;
export declare const DoIDsMatch: (a: any, b: any) => boolean;
export declare const IsProd: () => boolean;
/**
 * A Svelte "Use Action" that transfers focus to the current element when the object is added to the DOM
 * Usage: <input use:autoFocus />
 *
 * @param el
 */
export declare function autoFocus(el: HTMLElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void;
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
export declare function scrollToBottom(el: HTMLElement, _toggleUpdate?: any): {
    update: () => void;
};
/**
 * Type representing options for Up/Down Arrow operations.
 *
 * @typedef {Object} TUpDownArrowOptions
 * @property {number|string|null|undefined} preID - The preID which can have data type as number, string, null or undefined.
 * @property {number|string|null|undefined} postID - The postID which can have data type as number, string, null or undefined.
 * @property {Array.<{id: number} & Record<string, any>>} list - A list consisting of objects where each object has an 'id' of number type and a Record of any other properties with 'any' data type.
 */
export type TUpDownArrowOptions = {
    preID?: number | string | null | undefined;
    postID?: number | string | null | undefined;
    list?: ({
        id: number;
    } & Record<string, any>)[];
};
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
export declare function upDownArrows(el: HTMLElement, prePost?: TUpDownArrowOptions): {
    destroy(): void;
};
/**
 * Type representing options for Next/Previous Arrow operations.
 *
 * @typedef {Object} TNextPrevArrosOptions
 * @property {string|null|undefined} preField - The preField which can have type as string, null or undefined.
 * @property {string|null|undefined} postField - The postField which can have type as string, null or undefined.
 * @property {Array.<string>} fieldList - An array of strings, representing fieldList.
 */
export type TNextPrevArrowsOptions = {
    preField?: string | null | undefined;
    postField?: string | null | undefined;
    fieldList?: string[];
};
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
export declare function nextPrevArrows(el: HTMLElement, prePost?: TNextPrevArrowsOptions): {
    destroy(): void;
};
/**
 * A Svelte "Use Action" for a <textarea> object that adds the ability to use 'Alt-Enter' to add a line item
 * Usage <textarea use:textAreaAltEnter />
 *
 * @param el
 */
export declare function textAreaAltEnter(el: HTMLTextAreaElement): {
    destroy(): void;
};
export type TErrorMessageStack = {
    message: string;
    stack: string;
};
export declare const ErrorMessageStack: (e: any) => TErrorMessageStack;
/**
 * A Svelte "Use Action" that selects the text in the current element when it comes into focus
 * Usage: <input use:selectOnFocus />
 *
 * @param el
 */
export declare function selectOnFocus(el: HTMLInputElement | HTMLTextAreaElement): {
    destroy(): void;
};
/**
 * A Svelte "Use Action" that triggers a Forms Submit button when a value is changed on an element
 * Usage: <input use:clickSubmitOnInput />
 *
 * @param el
 */
export declare function clickSubmitOnChange(el: HTMLElement): {
    destroy(): void;
};
/**
 * A Svelte "Use Action" that triggers a Forms Submit button when the focus is lost from the form
 * Usage: <input use:clickSubmitOnFocusOut />
 *
 * @param el
 */
export declare function clickSubmitOnFocusOut(el: HTMLElement): {
    destroy(): void;
};
/**
 * Sets a search parameter to the current URL. The URL is then updated with the new parameter.
 * If the provided value is null or an empty string, the parameter is removed from the URL.
 *
 * @param key - The key of the search parameter.
 * @param value - The value to set for the search parameter. If null or an empty string, the parameter is removed.
 */
export declare function setSearchParam(key: string, value: string | number | null | undefined): Promise<void>;
/**
 * Checks whether the current device is a mobile or tablet device based on the browsers userAgent.
 *
 * @returns {boolean} True if the device is a mobile or tablet device, false otherwise.
 */
export declare function IsMobileOrTablet(): boolean;
/**
 * Downloads a given string as a file with the specified filename.
 *
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} text - The content of the file to be downloaded.
 *
 * @return {void}
 */
export declare function DownloadString(filename: string, text: string): void;
