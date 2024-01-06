import type {Page} from '@sveltejs/kit'
import {BuildPath, GreaterNumber, ToArray} from '@solidbasisventures/intelliwaketsfoundation'

export type TNavComponent = {
	component: string
	title: string
	link: string
	current: boolean
}

export function PathAnalyzer(page: Page, base?: string) {
	return {
		page: page,
		base: base,

		// /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Test1/Page/~/Sub1/Test2
		get crumbs() {
			return !this.page.params.crumbs ? null : this.page.params.crumbs
		},

		// Only reported crumbs, not all predecessors necessarily if a base component is specified
		get crumbsComponents() {
			return (this.crumbs ?? '').split('/').filter(item => !!item)
		},

		// Full path as received
		get pathName() {
			return this.page.url.pathname
		},

		get pathNameComponents() {
			return (this.pathName ?? '').split('/').filter(item => !!item)
		},

		get activePageComponents() {
			const returnComponents = this.pathNameComponents

			const crumbsComponentsLength = this.crumbsComponents.length

			if (crumbsComponentsLength) {
				for (let i = 0; i < crumbsComponentsLength; i++) {
					returnComponents.shift()
				}
			}

			if (this.base) {
				while (returnComponents.length && [...returnComponents].slice(1).includes(this.base)) {
					returnComponents.shift()
				}
			}

			return returnComponents
		},

		// All components up to and including the current page
		get baseComponents() {
			if (this.base === '') return this.crumbsComponents
			if (this.activePageComponents.length === 1) return this.pathNameComponents
			return this.pathNameComponents.slice(0, (this.activePageComponents.length - 1) * -1)
		},

		// All components before the current page
		get preComponents() {
			return this.pathNameComponents.slice(0, this.activePageComponents.length * -1)
		},

		// All predecessor components
		get predecessorComponents() {
			const components = this.preComponents

			while (components.length && components.includes('~')) {
				components.pop()
			}

			return components
		},

		// All successor components
		get successorComponents() {
			const components = this.preComponents

			while (components.length && components.includes('~')) {
				components.shift()
			}

			return components
		},

		// /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Page/Sub1
		get activePageFull() {
			return BuildPath(...this.activePageComponents)
		},

		// /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Page
		get activePage() {
			return this.activePageComponents[0] ?? ''
		},

		// /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = Sub1
		get activePageSlug() {
			if (this.base === '') return this.activePageComponents[0] ?? null
			return this.activePageComponents[1] ?? null
		},

		get activePageSlugs() {
			if (this.base === '') return BuildPath(...this.activePageComponents ?? null)
			const slugs = BuildPath(...this.activePageComponents?.slice(1) ?? null)
			return !slugs ? null : slugs
		},

		// /Test1/Page/~/Sub1/Test2/Page/Sub1, Page = /Test1/Page/~/Sub1/Test2/Page
		get basePath() {
			return BuildPath('/', ...this.baseComponents)
		},

		basePathReplaced(newBaseComponent: string, slug?: string | string[]): string {
			const newBaseComponents = [...this.baseComponents]
			newBaseComponents.pop()
			return BuildPath('/', ...newBaseComponents, newBaseComponent, ...ToArray(slug ?? ''))
		},

		apiPath(action: string) {
			return BuildPath(this.pathName, action)
		},

		get backPath() {
			if (this.activePageComponents.length <= 1) return BuildPath('/', ...this.predecessorComponents)

			let components = [...this.preComponents, ...this.activePageComponents]

			if (!components[components.length - 1]?.toLowerCase().startsWith('tab')) {
				return BuildPath('/', ...components.slice(0, components.length - 1))
			}

			while (components[components.length - 1]?.toLowerCase().startsWith('tab')) {
				components = components.slice(0, components.length - 2)
			}

			return BuildPath('/', ...components)
		},

		get navComponents() {
			const navs: TNavComponent[] = []

			const activePage = this.activePage
			const pathNameComponents = this.pathNameComponents
			const activePageIndex = this.pathNameComponents.lastIndexOf(activePage)
			const tildeIndex = this.pathNameComponents.indexOf('~')

			// console.info(this.pathname)

			for (let idx = 0; idx < pathNameComponents.length; idx++) {
				const component = pathNameComponents[idx]

				if (component !== '~') {
					const selectedIndex = this.pathNameComponents.lastIndexOf(component)

					let link = ''

					// console.info(component)

					if (selectedIndex >= activePageIndex) {
						const predecessors = tildeIndex <= 0 ? [] : pathNameComponents.slice(0, tildeIndex).filter(item => item !== '~')

						const successors = tildeIndex <= 0 ? this.pathNameComponents.slice(selectedIndex + 1).filter(item => item !== '~') :
							[...this.preComponents.slice(GreaterNumber(tildeIndex, 0), activePageIndex - 1), ...this.pathNameComponents.slice(selectedIndex + 1)].filter(item => item !== '~')

						const actives = this.pathNameComponents.slice(GreaterNumber(activePageIndex - 1, 0), selectedIndex + 1).filter(item => item !== '~')

						// console.info('v1', predecessors, successors, actives)

						if (successors.length) {
							link = BuildPath('/', ...predecessors, '~', ...successors, ...actives)
						} else {
							link = BuildPath('/', ...predecessors, ...actives)
						}
					} else {
						const successors = pathNameComponents.slice(idx + 1).filter(item => item !== '~')

						link = activePageIndex > 0 && activePageIndex <= idx && component === activePage ?
							this.pathName :
							BuildPath('/',
								...pathNameComponents.slice(0, idx).filter(item => item !== '~'),
								successors.length ? '~' : '',
								...successors,
								component)

						if (link.startsWith('/~/') && idx > 0) {
							link = link.slice(2)
						}

						// console.info('v2', pathNameComponents.slice(0, idx).filter(item => item !== '~'), successors, component)
					}

					// console.info(component, idx, activePageIndex)

					navs.push({
						component,
						title: component,
						link,
						current: idx >= activePageIndex
					})
				}
			}

			return navs
		},

		isOpen(path: string | null) {
			return (path ?? '') === (this.activePageSlugs ?? '') || (!!path && ((this.activePageSlugs ?? '').startsWith(path + '/') || (this.activePageSlugs ?? '').endsWith(path)))
		},

		open(path: string, closeIfOpen = true) {
			if (closeIfOpen) {
				// const pathNoDigits = path.replace(/[0-9]/g, '')
				if (this.isOpen(path)) {
					if (path.includes('/')) {
						return BuildPath(this.basePath, path.substring(0, path.indexOf('/')))
					} else {
						// if (path === pathNoDigits) {
						return this.basePath
						// } else {
						// 	return BuildPath(this.basePath, pathNoDigits)
						// }
					}
					// } else if (pathNoDigits !== path && path === this.activePageSlug) {
					// 	return BuildPath(this.basePath, pathNoDigits)
					// } else if (pathNoDigits === path && path === (this.activePageSlug ?? '').replace(/[0-9]/g, '') && pathNoDigits !== this.activePage) {
					// 	return BuildPath(this.basePath)
				}
			}
			return BuildPath(this.basePath, path)
		}
	}
}
