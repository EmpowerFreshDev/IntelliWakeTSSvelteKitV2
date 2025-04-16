import {
	CleanNumberNull,
	IsEqual,
	isNullUndefined,
	ReplaceAll,
	YYYY_MM_DD_HH_mm_ss
} from '@empowerfresh/intelliwake'
import {env} from '$env/dynamic/public'
import {tick} from 'svelte'
import {goto} from '$app/navigation'
import {browser} from '$app/environment'
import {page} from '$app/stores'
import {get} from 'svelte/store'

export const KEY_UP_ARROW = 38
export const KEY_DOWN_ARROW = 40
export const KEY_LEFT_ARROW = 37
export const KEY_RIGHT_ARROW = 39
export const KEY_SPACE = 32
export const KEY_ENTER = 13
export const KEY_TAB = 9
export const KEY_BACKSPACE = 8
export const KEY_ESCAPE = 27

export const KEY_STRING_ENTER = 'Enter'
export const KEY_STRING_SPACE = 'Space'
export const KEY_STRING_DOWN_ARROW = 'ArrowDown'
export const KEY_STRING_UP_ARROW = 'ArrowUp'
export const KEY_STRING_LEFT_ARROW = 'ArrowLeft'
export const KEY_STRING_RIGHT_ARROW = 'ArrowRight'
export const KEY_STRING_TAB = 'Tab'
export const KEY_STRING_BACKSPACE = 'Backspace'
export const KEY_STRING_ESCAPE = 'Escape'

export const IsMetaKey = (e: KeyboardEvent): boolean =>
	e.ctrlKey ||
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
	].includes(e.key)

export const CaptureGPS = (): Promise<GeolocationPosition | null> => {
	return new Promise(resolve => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					resolve(position)
				},
				function () {
					resolve(null)
				}
			)
		} else {
			resolve(null)
		}
	})
}

export const DownloadBase64Data = (fileName: string, base64: string) => {
	const link = document.createElement('a')
	link.href = base64
	link.setAttribute('download', fileName)
	document.body.appendChild(link)
	link.click()
}

export const CopyRefToClipboard = (ref: HTMLElement, tryFormatted = true): boolean => {
	if (ref && document.createRange && window.getSelection) {
		const range = document.createRange()
		const sel = window.getSelection()
		if (sel) {
			// unselect any element in the page
			sel.removeAllRanges()

			const elsNoCopy = ref.getElementsByClassName('noCopy')
			for (const el of elsNoCopy) {
				el.classList.add('noCopyActive')
			}

			const elsOnlyCopy = ref.getElementsByClassName('onlyCopy')
			for (const el of elsOnlyCopy) {
				el.classList.add('onlyCopyActive')
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
			const brs = ref.getElementsByTagName('br')
			for (let i = 0; i < brs.length; i++) {
				brs[i].setAttribute('copyuserdisplay', brs[i].style.display)
				brs[i].style.display = 'none'
			}
			const hrs = ref.getElementsByTagName('hr')
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].setAttribute('copyuserdisplay', hrs[i].style.display)
				hrs[i].style.display = 'none'
			}

			if (tryFormatted) {
				try {
					range.selectNode(ref)
					sel.addRange(range)
				} catch (e) {
					range.selectNodeContents(ref)
					sel.addRange(range)
				}
			} else {
				range.selectNodeContents(ref)
				sel.addRange(range)
			}

			document.execCommand('copy')

			sel.removeAllRanges()

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
			for (const el of elsNoCopy) {
				el.classList.remove('noCopyActive')
			}

			for (const el of elsOnlyCopy) {
				el.classList.remove('onlyCopyActive')
			}

			for (let i = 0; i < brs.length; i++) {
				brs[i].style.display = brs[i].getAttribute('display') ?? ''
				brs[i].removeAttribute('copyuserdisplay')
			}
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].style.display = hrs[i].getAttribute('display') ?? ''
				hrs[i].removeAttribute('copyuserdisplay')
			}

			return true
		}
	}
	return false
}

export const TableIDToExcel = (
	tableID: string,
	fileName?: string,
	appendDateTime = true
) => {
	const downloadName = `${fileName ?? tableID}${
		appendDateTime ? `-${YYYY_MM_DD_HH_mm_ss('now')}.xls` : ''
	}`
	// const dataType = 'application/vnd.ms-excel'
	const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const tableSelect = document.getElementById(tableID)

	let tableHTML = tableSelect?.outerHTML //.replace(/ /g, '%20')

	tableHTML = ReplaceAll('<br>', ' ', tableHTML)

	const a = document.createElement('a')
	const blob = new Blob([tableHTML as any], {type: dataType})
	a.href = URL.createObjectURL(blob)
	a.download = downloadName
	a.click()
}

export const DoIDsMatch = (a: any, b: any): boolean =>
	IsEqual(a, b) || IsEqual(a?.id, b?.id)

export const IsProd = () => !!(env as any).VITE_APP_STAGE?.toLowerCase().startsWith('prod')

/**
 * A Svelte "Use Action" that transfers focus to the current element when the object is added to the DOM
 * Usage: <input use:autoFocus />
 *
 * @param el
 */
export function autoFocus(el: HTMLElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
	tick().then(() => {
		el.focus()
	})
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
export function scrollToBottom(el: HTMLElement, _toggleUpdate?: any) {
	const scroll = () => el.scroll({
		top: el.scrollHeight
	})
	tick().then(() => scroll())

	return {update: scroll}
}

/**
 * Type representing options for Up/Down Arrow operations.
 *
 * @typedef {Object} TUpDownArrowOptions
 * @property {number|string|null|undefined} preID - The preID which can have data type as number, string, null or undefined.
 * @property {number|string|null|undefined} postID - The postID which can have data type as number, string, null or undefined.
 * @property {Array.<{id: number} & Record<string, any>>} list - A list consisting of objects where each object has an 'id' of number type and a Record of any other properties with 'any' data type.
 */
export type TUpDownArrowOptions = {
	preID?: number | string | null | undefined,
	postID?: number | string | null | undefined,
	list?: ({
		id: number
	} & Record<string, any>)[]
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
export function upDownArrows(el: HTMLElement, prePost?: TUpDownArrowOptions) {
	let lastMove = new Date().valueOf()

	const handleKeyDown = (e: any) => {
		if (lastMove > new Date().valueOf() - 100) {
			e.preventDefault()
		} else {
			switch (e.key) {
				case KEY_STRING_UP_ARROW: {
					const components = e.target.id?.split('_')
					const currentID = CleanNumberNull(components.shift())
					if (currentID !== null && components.length) {
						let preID = prePost?.preID
						if (!preID) {
							const listLength = prePost?.list?.length ?? 0
							const currentIdx = (prePost?.list ?? []).findIndex(item => item.id == currentID)
							if (currentIdx === 0) {
								preID = CleanNumberNull((prePost?.list ?? [])[listLength - 1]?.id)
							} else if (currentIdx > 0) {
								preID = CleanNumberNull((prePost?.list ?? [])[currentIdx - 1]?.id)
							}
						}
						const element = document.getElementById(`${preID}_${components.join('_')}`)
						if (element) {
							lastMove = new Date().valueOf()
							element?.focus()
						}
					}
				}
					e.preventDefault()
					break
				case KEY_STRING_DOWN_ARROW: {
					const components = e.target.id?.split('_')
					const currentID = CleanNumberNull(components.shift())
					if (currentID !== null && components.length) {
						let postID = prePost?.postID
						if (!postID) {
							const listLength = prePost?.list?.length ?? 0
							const currentIdx = (prePost?.list ?? []).findIndex(item => item.id == currentID)
							if (currentIdx === listLength - 1) {
								postID = CleanNumberNull((prePost?.list ?? [])[0]?.id)
							} else if (currentIdx >= 0) {
								postID = CleanNumberNull((prePost?.list ?? [])[currentIdx + 1]?.id)
							}
						}
						const element = document.getElementById(`${postID}_${components.join('_')}`)
						if (element) {
							lastMove = new Date().valueOf()
							element?.focus()
						}
					}
				}
					e.preventDefault()
					break
			}
		}
	}

	el.addEventListener('keydown', handleKeyDown)

	return {
		destroy() {
			el.removeEventListener('keydown', handleKeyDown)
		}
	}
}

/**
 * Type representing options for Next/Previous Arrow operations.
 *
 * @typedef {Object} TNextPrevArrosOptions
 * @property {string|null|undefined} preField - The preField which can have type as string, null or undefined.
 * @property {string|null|undefined} postField - The postField which can have type as string, null or undefined.
 * @property {Array.<string>} fieldList - An array of strings, representing fieldList.
 */
export type TNextPrevArrowsOptions = {
	preField?: string | null | undefined,
	postField?: string | null | undefined,
	fieldList?: string[]
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
export function nextPrevArrows(el: HTMLElement, prePost?: TNextPrevArrowsOptions) {
	let lastMove = new Date().valueOf()

	const handleKeyDown = (e: any) => {
		if (lastMove > new Date().valueOf() - 100) {
			e.preventDefault()
		} else {
			switch (e.key) {
				case KEY_STRING_LEFT_ARROW: {
					const components = e.target.id?.split('_')
					const currentField = components.slice(1).join('_')
					const currentID = CleanNumberNull(components.shift())
					if (currentID !== null && !!currentField) {
						const preField = prePost?.preField ?? (prePost?.fieldList ?? [])[(prePost?.fieldList?.indexOf(currentField) ?? -2) - 1] ?? (prePost?.fieldList ?? [])[(prePost?.fieldList ?? []).length - 1]
						if (preField) {
							const element = document.getElementById(`${currentID}_${preField}`)
							if (element) {
								lastMove = new Date().valueOf()
								element?.focus()
							}
						}
					}
				}
					e.preventDefault()
					break
				case KEY_STRING_RIGHT_ARROW: {
					const components = e.target.id?.split('_')
					const currentField = components.slice(1).join('_')
					const currentID = CleanNumberNull(components.shift())
					if (currentID !== null && !!currentField) {
						const postField = prePost?.postField ?? (prePost?.fieldList ?? [])[(prePost?.fieldList?.indexOf(currentField) ?? -2) + 1] ?? (prePost?.fieldList ?? [])[0]
						if (postField) {
							const element = document.getElementById(`${currentID}_${postField}`)
							if (element) {
								lastMove = new Date().valueOf()
								element?.focus()
							}
						}
					}
				}
					e.preventDefault()
					break
			}
		}
	}

	el.addEventListener('keydown', handleKeyDown)

	return {
		destroy() {
			el.removeEventListener('keydown', handleKeyDown)
		}
	}
}

/**
 * A Svelte "Use Action" for a <textarea> object that adds the ability to use 'Alt-Enter' to add a line item
 * Usage <textarea use:textAreaAltEnter />
 *
 * @param el
 */
export function textAreaAltEnter(el: HTMLTextAreaElement) {
	// const handleFocus = async () => {
	// 	await tick()
	// 	el && typeof el.select === 'function' && el.select()
	// }

	const handleKeyUp = (e: any) => {
		if (!!e.target && e.key === 'Enter' && e.altKey) {
			const start = e.target.selectionStart
			const end = e.target.selectionEnd
			const text = e.target.value
			const before = text.substring(0, start)
			const after = text.substring(end, text.length)
			el.value = (before + '\r\n' + after)
			el.selectionStart = el.selectionEnd = start + 1
			e.target.blur()
			e.target.focus()
			e.preventDefault()
		}
	}

	const handleKeyDown = (e: any) => {
		if (!!e.target && !!e.target.form && e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
			e.preventDefault()
			e.target.form.dispatchEvent(new Event('submit', {cancelable: true}))
		}
	}

	// el.addEventListener('focus', handleFocus)
	el.addEventListener('keydown', handleKeyDown)
	el.addEventListener('keyup', handleKeyUp)

	return {
		destroy() {
			// el.removeEventListener('focus', handleFocus)
			el.removeEventListener('keydown', handleKeyDown)
			el.removeEventListener('keyup', handleKeyUp)
		}
	}
}

export type TErrorMessageStack = {
	message: string
	stack: string
}
export const ErrorMessageStack = (e: any): TErrorMessageStack => ({
	message: e?.message ?? e?.error?.message ?? e?.reason?.message ?? 'Unknown message',
	stack: e?.stack ?? e?.error?.stack ?? e?.reason?.stack ?? 'Unknown stack'
})


/**
 * A Svelte "Use Action" that selects the text in the current element when it comes into focus
 * Usage: <input use:selectOnFocus />
 *
 * @param el
 */
export function selectOnFocus(el: HTMLInputElement | HTMLTextAreaElement) {
	let okToSelect = true

	const handleFocus = async () => {
		okToSelect = true
		await tick()
			.then(() =>
				setTimeout(() => {
					if (okToSelect && el && typeof el.select === 'function') {
						el.select()
					}
				}, 50)
			)
	}

	const handleBlur = async () => {
		okToSelect = false
	}

	el.addEventListener('focus', handleFocus)
	el.addEventListener('blur', handleBlur)

	return {
		destroy() {
			el.removeEventListener('focus', handleFocus)
			el.removeEventListener('blur', handleBlur)
		}
	}
}

/**
 * A Svelte "Use Action" that triggers a Forms Submit button when a value is changed on an element
 * Usage: <input use:clickSubmitOnInput />
 *
 * @param el
 */
export function clickSubmitOnChange(el: HTMLElement) {
	let firing = false

	const submitButton: HTMLButtonElement | null = el.querySelector('button[type="submit"]') ?? el.querySelector('button:not([type])')

	const handleChange = async () => {
		await tick()
			.then(() => {
					if (!firing) {
						if (submitButton) {
							submitButton.click()
						} else {
							(el as HTMLFormElement).requestSubmit()
						}
					}
					firing = false
				}
			)
	}

	const handleKeypress = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			e.stopPropagation()
			// e.target.dispatchEvent(new Event('input'))
			firing = true
			if (submitButton) {
				submitButton.click()
			} else {
				(el as HTMLFormElement).requestSubmit()
			}
		}
	}

	el.addEventListener('change', handleChange)
	el.addEventListener('keypress', handleKeypress)

	return {
		destroy() {
			el.removeEventListener('change', handleChange)
			el.removeEventListener('keypress', handleKeypress)
		}
	}
}

/**
 * A Svelte "Use Action" that triggers a Forms Submit button when the focus is lost from the form
 * Usage: <input use:clickSubmitOnFocusOut />
 *
 * @param el
 */
export function clickSubmitOnFocusOut(el: HTMLElement) {
	let firing = false

	const submitButton: HTMLButtonElement | null = el.querySelector('button[type="submit"]') ?? el.querySelector('button:not([type])')

	const handleFocusOut = async () => {
		await tick()
			.then(() => {
					if (!firing) {
						if (submitButton) {
							submitButton.click()
						} else {
							(el as HTMLFormElement).requestSubmit()
						}
					}
					firing = false
				}
			)
	}

	const handleKeypress = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			e.stopPropagation()
			// e.target.dispatchEvent(new Event('input'))
			firing = true
			if (submitButton) {
				submitButton.click()
			} else {
				(el as HTMLFormElement).requestSubmit()
			}
		}
	}

	el.addEventListener('focusout', handleFocusOut)
	el.addEventListener('keypress', handleKeypress)

	return {
		destroy() {
			el.removeEventListener('focusout', handleFocusOut)
			el.removeEventListener('keypress', handleKeypress)
		}
	}
}

/**
 * Sets a search parameter to the current URL. The URL is then updated with the new parameter.
 * If the provided value is null or an empty string, the parameter is removed from the URL.
 *
 * @param key - The key of the search parameter.
 * @param value - The value to set for the search parameter. If null or an empty string, the parameter is removed.
 */
export async function setSearchParam(key: string, value: string | number | null | undefined) {
	if (browser) {
		const pageURL = get(page).url
		if (pageURL.searchParams.get(key) !== value) {
			const url = new URL(pageURL)
			if (isNullUndefined(value)) {
				url.searchParams.delete(key)
			} else {
				url.searchParams.set(key, value?.toString() ?? '')
			}
			return goto(url.href, {replaceState: true})
		}
	}
}

/**
 * Checks whether the current device is a mobile or tablet device based on the browsers userAgent.
 *
 * @returns {boolean} True if the device is a mobile or tablet device, false otherwise.
 */
export function IsMobileOrTablet() {
	return browser && /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Downloads a given string as a file with the specified filename.
 *
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} text - The content of the file to be downloaded.
 *
 * @return {void}
 */
export function DownloadString(filename: string, text: string) {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
