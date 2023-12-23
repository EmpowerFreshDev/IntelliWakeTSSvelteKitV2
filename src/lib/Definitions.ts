import type {Writable} from 'svelte/store'
import {writable} from 'svelte/store'
import {
	DateCompare,
	DateParseTS,
	SearchRow,
	SortCompare,
	SortCompareNull,
	type TDateAny,
	ToArray
} from '@solidbasisventures/intelliwaketsfoundation'
import type {SvelteComponent} from 'svelte'
import type {IconDefinition} from '@fortawesome/free-solid-svg-icons'
import type {IconProps} from 'svelte-awesome/components/Icon.svelte'

export interface IFAProps extends IconProps {
}

export interface IDDAction {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	faProps?: IFAProps
	faPropHidden?: boolean
	active?: boolean
	title?: string
	action?: () => void // e: MouseEvent | PointerEvent | KeyboardEvent
	dividerGroup?: string
	headerGroup?: string
	noCloseMenu?: boolean
	indented?: boolean
	style?: string
	alternateFAProps?: IFAProps
	alternateTitle?: string | null
	alternateAction?: () => void
	alternateNoClose?: boolean
	href?: string
	hrefReplace?: boolean
}

export interface ISpinItem<T> {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	faProps?: IFAProps
	faPropHidden?: boolean
	id: T
	title: string
	dividerGroup?: string
	headerGroup?: string
	indented?: boolean
	style?: string
	classItem?: string | null
}

export type TListGroupItem = {
	title: string
	sub_title?: string
	hover_title?: string
	hidden?: boolean
	faProps?: IFAProps
	icon?: IconDefinition
	color?: string
	href?: string
	strikeThrough?: boolean
	linkClick?: () => void
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	badgeValue?: number | string | null
	badgeColor?: string
	badgeClass?: string | null
	rightText?: string | null
	paneName?: string
	value?: string | null
	key?: string | null
	section?: string
	parent_value?: string | null
	start_date?: string | null
	end_date?: string | null
	disabled?: boolean | null
	feature?: string[] | string | null
	subs?: TListGroupItem[]
	collapsed?: boolean
	dataSvelteKitPreloadData?: 'tap' | 'hover'
	noLinkReplace?: boolean
	bigIcon?: boolean
	itemClass?: string
}

export const MasterDetailSubItemBuild = (item: TListGroupItem,
                                         items: TListGroupItem[],
                                         collapsedValues: (string | null | undefined)[],
                                         options?: {
	                                         start_date?: string | null
	                                         end_date?: string | null
	                                         disabled?: boolean | null,
	                                         search?: string,
	                                         feature?: string | null
	                                         otherFilter?: ((item: TListGroupItem) => boolean)
                                         }): TListGroupItem => {
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
								(
									(!sub_item.start_date || DateCompare(sub_item.start_date, 'IsSameOrBefore', options.end_date, 'day')) &&
									(!sub_item.end_date || DateCompare(sub_item.end_date,
										'IsSameOrAfter',
										options.start_date,
										'day')))
								:
								((options?.disabled ?? null) === null || sub_item.disabled === options?.disabled) :
							((options?.disabled ?? null) === null || sub_item.disabled === options?.disabled)) &&
						(!options?.feature || ToArray(sub_item.feature).includes(options.feature)))))
			.filter(user => !options?.otherFilter || options.otherFilter(user))
	}
}

export interface ITabHref {
	faProps?: IFAProps
	key: string
	title?: string | typeof SvelteComponent
	href?: string
	dataSvelteKitPreloadData?: 'tap' | 'hover'
	isOpen?: boolean
	hidden?: boolean
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	badgeValue?: number | null
	badgeColor?: string
	isInitial?: boolean
	disabled?: boolean
}

export interface ITabItem {
	hidden?: boolean
	faProps?: IFAProps
	key: string
	title?: string | typeof SvelteComponent
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	badgeValue?: number | null
	badgeColor?: string
	pane?: typeof SvelteComponent
}

// Using unknown...may break things
export type TTableCol<T extends Record<string, any> = Record<string, any>> = Partial<Record<keyof T, {
	name: string
	class?: string
	headBodyClass?: string
	hidden?: boolean
	calc?: (val: any, row: T) => string
	title?: (val: any, row: T) => string | undefined
	initialSortAscending?: boolean
	onClick?: (row: T, e: MouseEvent) => void
	onEmptyCol?: keyof T
}>>

const storeActivityOverlay = (): Pick<Writable<number>, 'subscribe'> & {
	show: () => void
	hide: () => void
	reset: () => void
} => {
	const {subscribe, set, update} = writable<number>(0)

	return {
		subscribe,
		show: () => update(prevState => prevState < 0 ? 1 : prevState + 1),
		hide: () => update(prevState => prevState < 2 ? 0 : prevState - 1),
		reset: () => set(0)
	}
}

export const ShowActivityOverlay = storeActivityOverlay()

export interface IMessageBoxStore {
	message: string | null
	messageBody?: string | null
	color?: string
	dismissAt?: TDateAny | null
}

const storeMessageBox = (): Pick<Writable<IMessageBoxStore[]>, 'subscribe'> & {
	show: (message: string | IMessageBoxStore) => void
	hide: (message: (string | null) | (string | null)[]) => void
	reset: () => void
} => {
	const {subscribe, set, update} = writable<IMessageBoxStore[]>([])

	return {
		subscribe,
		show: (message: string | IMessageBoxStore) => update(prevState => [
			...prevState.filter(pS => pS.message !== (typeof message === 'object' ? message.message : message)),
			typeof message === 'object' ?
				{
					...message,
					dismissAt: message.dismissAt === undefined ? DateParseTS('now', {seconds: 3}) : message.dismissAt
				} :
				{message: message, dismissAt: DateParseTS('now', {seconds: 3})}
		]),
		hide: (message: (string | null) | (string | null)[]) => update(prevState => prevState.filter(pS => !ToArray(message).includes(pS.message))),
		reset: () => set([])
	}
}

export const ShowMessageBox = storeMessageBox()

export type TChatBubblePosition = 'Right' | 'Left' | 'Top' | 'Bottom'

export type TDropDownControlPosition = 'Right' | 'Left' | 'Center' | 'CenterForce' | null

export type TDropDownControlDrop = 'Up' | 'Down' | null
