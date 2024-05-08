import {expect, it} from 'vitest'
import {PathAnalyzer} from './PathAnalyzer'

const page: any = {
	params: {
		crumbs: 'PageOne/Page/~/PageTwo'
	},
	url: {
		pathname: '/PageOne/Page/~/PageTwo/PageThree/Page/Sub1/Another1'
	}
}

it('Deconstructs PAGE paths', () => {
	const pathAnalyer = new PathAnalyzer(page, 'Page')
	expect(pathAnalyer.crumbs).toBe('PageOne/Page/~/PageTwo')
	expect(pathAnalyer.basePath).toBe('/PageOne/Page/~/PageTwo/PageThree/Page')
	expect(pathAnalyer.activePageFull).toBe('Page/Sub1/Another1')
	expect(pathAnalyer.activePageComponents).toEqual(['Page', 'Sub1', 'Another1'])
	expect(pathAnalyer.activePage).toBe('Page')
	expect(pathAnalyer.activePageSlug).toBe('Sub1')
	expect(pathAnalyer.isOpen('Page/Sub1/Another1')).toBe(false)
	expect(pathAnalyer.isOpen('Page')).toBe(false)
	expect(pathAnalyer.isOpen('Sub1')).toBe(true)
	expect(pathAnalyer.isOpen('Sub2')).toBe(false)
	expect(pathAnalyer.open('Sub1')).toBe('/PageOne/Page/~/PageTwo/PageThree/Page')
	expect(pathAnalyer.open('Sub1', false)).toBe('/PageOne/Page/~/PageTwo/PageThree/Page/Sub1')
	expect(pathAnalyer.open('Sub2')).toBe('/PageOne/Page/~/PageTwo/PageThree/Page/Sub2')
	expect(pathAnalyer.backPath).toBe('/PageOne/Page/~/PageTwo/PageThree/Page/Sub1')
	expect(pathAnalyer.apiPath('API')).toBe('/PageOne/Page/~/PageTwo/PageThree/Page/Sub1/Another1/API')
})

it('Deconstructs NON-PAGE paths', () => {
	const pathAnalyer = new PathAnalyzer(page)
	expect(pathAnalyer.crumbs).toBe('PageOne/Page/~/PageTwo')
	expect(pathAnalyer.basePath).toBe('/PageOne/Page/~/PageTwo/PageThree')
	expect(pathAnalyer.activePageFull).toBe('PageThree/Page/Sub1/Another1')
	expect(pathAnalyer.activePageComponents).toEqual(['PageThree', 'Page', 'Sub1', 'Another1'])
	expect(pathAnalyer.activePage).toBe('PageThree')
	expect(pathAnalyer.activePageSlug).toBe('Page')
	expect(pathAnalyer.isOpen('Page')).toBe(true)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.open('Page')).toBe('/PageOne/Page/~/PageTwo/PageThree')
	expect(pathAnalyer.open('Sub1', false)).toBe('/PageOne/Page/~/PageTwo/PageThree/Sub1')
	expect(pathAnalyer.open('Sub2')).toBe('/PageOne/Page/~/PageTwo/PageThree/Sub2')
	expect(pathAnalyer.apiPath('API')).toBe('/PageOne/Page/~/PageTwo/PageThree/Page/Sub1/Another1/API')
})

it('Deconstructs HOME path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {},
		url: {
			pathname: '/'
		}
	} as any)
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.basePath).toBe('/')
	expect(pathAnalyer.activePageFull).toBe('')
	expect(pathAnalyer.activePageComponents).toEqual([])
	expect(pathAnalyer.activePage).toBe('')
	expect(pathAnalyer.activePageSlug).toBe(null)
	expect(pathAnalyer.isOpen(null)).toBe(true)
	expect(pathAnalyer.isOpen('')).toBe(true)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.open('Page')).toBe('/Page')
	expect(pathAnalyer.backPath).toBe('/')
	expect(pathAnalyer.apiPath('API')).toBe('/API')
})

it('Deconstructs DASHBOARD path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Dashboard'
		}
	} as any)
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.baseComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.basePath).toBe('/Dashboard')
	expect(pathAnalyer.basePathReplaced('Dashboard1')).toBe('/Dashboard1')
	expect(pathAnalyer.basePathReplaced('Dashboard1', 'Item1')).toBe('/Dashboard1/Item1')
	expect(pathAnalyer.activePageFull).toBe('Dashboard')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe(null)
	expect(pathAnalyer.isOpen(null)).toBe(true)
	expect(pathAnalyer.isOpen('')).toBe(true)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.open('Page')).toBe('/Dashboard/Page')
	expect(pathAnalyer.backPath).toBe('/')
	expect(pathAnalyer.apiPath('API')).toBe('/Dashboard/API')
})

it('Deconstructs DASHBOARD OPEN path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Dashboard/Sub1'
		}
	} as any)
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Dashboard', title: 'Dashboard', link: '/~/Sub1/Dashboard', current: true},
		{component: 'Sub1', title: 'Sub1', link: '/Dashboard/Sub1', current: true}
	])
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.baseComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.basePath).toBe('/Dashboard')
	expect(pathAnalyer.activePageFull).toBe('Dashboard/Sub1')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard', 'Sub1'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe('Sub1')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('Sub1')).toBe(true)
	expect(pathAnalyer.isOpen('Sub2')).toBe(false)
	expect(pathAnalyer.open('Sub1')).toBe('/Dashboard')
	expect(pathAnalyer.open('Sub2')).toBe('/Dashboard/Sub2')
	expect(pathAnalyer.open('Sub14')).toBe('/Dashboard/Sub14')
	expect(pathAnalyer.backPath).toBe('/Dashboard')
	expect(pathAnalyer.apiPath('API')).toBe('/Dashboard/Sub1/API')
})

it('Deconstructs DASHBOARD OPEN path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Dashboard/Sub14'
		}
	} as any)
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Dashboard', title: 'Dashboard', link: '/~/Sub14/Dashboard', current: true},
		{component: 'Sub14', title: 'Sub14', link: '/Dashboard/Sub14', current: true}
	])
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.baseComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.basePath).toBe('/Dashboard')
	expect(pathAnalyer.activePageFull).toBe('Dashboard/Sub14')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard', 'Sub14'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe('Sub14')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('Sub14')).toBe(true)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.open('Sub14')).toBe('/Dashboard')
	expect(pathAnalyer.open('Sub1')).toBe('/Dashboard/Sub1')
	expect(pathAnalyer.backPath).toBe('/Dashboard')
	expect(pathAnalyer.apiPath('API')).toBe('/Dashboard/Sub14/API')
})

it('Deconstructs DASHBOARD OPEN path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Dashboard/Sub'
		}
	} as any, 'Dashboard')
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Dashboard', title: 'Dashboard', link: '/~/Sub/Dashboard', current: true},
		{component: 'Sub', title: 'Sub', link: '/Dashboard/Sub', current: true}
	])
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.baseComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.basePath).toBe('/Dashboard')
	expect(pathAnalyer.activePageFull).toBe('Dashboard/Sub')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard', 'Sub'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe('Sub')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('Sub')).toBe(true)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.open('Sub')).toBe('/Dashboard')
	expect(pathAnalyer.open('Sub1')).toBe('/Dashboard/Sub1')
	expect(pathAnalyer.apiPath('API')).toBe('/Dashboard/Sub/API')
})

it('Deconstructs DASHBOARD OPEN path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Dashboard/Sub/1'
		}
	} as any, 'Dashboard')
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Dashboard', title: 'Dashboard', link: '/~/Sub/1/Dashboard', current: true},
		{component: 'Sub', title: 'Sub', link: '/~/1/Dashboard/Sub', current: true},
		{component: '1', title: '1', link: '/Dashboard/Sub/1', current: true}
	])
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.baseComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.basePath).toBe('/Dashboard')
	expect(pathAnalyer.activePageFull).toBe('Dashboard/Sub/1')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard', 'Sub', '1'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe('Sub')
	expect(pathAnalyer.activePageSlugs).toBe('Sub/1')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('Sub/1')).toBe(true)
	expect(pathAnalyer.isOpen('Sub')).toBe(true)
	expect(pathAnalyer.isOpen('Sub/2')).toBe(false)
	expect(pathAnalyer.open('Sub/1')).toBe('/Dashboard/Sub')
	expect(pathAnalyer.open('Sub/2')).toBe('/Dashboard/Sub/2')
	expect(pathAnalyer.backPath).toBe('/Dashboard/Sub')
	expect(pathAnalyer.apiPath('API')).toBe('/Dashboard/Sub/1/API')
})

it('Deconstructs SUCCESSOR PREDECESSOR path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: 'Pred/~/Succ'
		},
		url: {
			pathname: '/Pred/~/Succ/Succ2/Dashboard'
		}
	} as any, 'Dashboard')
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Pred', title: 'Pred', link: '/~/Succ/Succ2/Dashboard/Pred', current: false},
		{component: 'Succ', title: 'Succ', link: '/Pred/~/Succ2/Dashboard/Succ', current: false},
		{component: 'Succ2', title: 'Succ2', link: '/Pred/Succ/~/Dashboard/Succ2', current: false},
		{component: 'Dashboard', title: 'Dashboard', link: '/Pred/~/Succ/Succ2/Dashboard', current: true}
	])
	expect(pathAnalyer.crumbs).toBe('Pred/~/Succ')
	expect(pathAnalyer.basePath).toBe('/Pred/~/Succ/Succ2/Dashboard')
	expect(pathAnalyer.basePathReplaced('Dashboard1')).toBe('/Pred/~/Succ/Succ2/Dashboard1')
	expect(pathAnalyer.basePathReplaced('Dashboard1', 'Item1')).toBe('/Pred/~/Succ/Succ2/Dashboard1/Item1')
	expect(pathAnalyer.preComponents).toEqual(['Pred', '~', 'Succ', 'Succ2'])
	expect(pathAnalyer.predecessorComponents).toEqual(['Pred'])
	expect(pathAnalyer.successorComponents).toEqual(['Succ', 'Succ2'])
	expect(pathAnalyer.activePageFull).toBe('Dashboard')
	expect(pathAnalyer.activePageComponents).toEqual(['Dashboard'])
	expect(pathAnalyer.activePage).toBe('Dashboard')
	expect(pathAnalyer.activePageSlug).toBe(null)
	expect(pathAnalyer.isOpen('Sub1')).toBe(false)
	expect(pathAnalyer.isOpen('Sub2')).toBe(false)
	expect(pathAnalyer.open('Sub1')).toBe('/Pred/~/Succ/Succ2/Dashboard/Sub1')
	expect(pathAnalyer.open('Sub1', false)).toBe('/Pred/~/Succ/Succ2/Dashboard/Sub1')
	expect(pathAnalyer.open('Sub2')).toBe('/Pred/~/Succ/Succ2/Dashboard/Sub2')
	expect(pathAnalyer.backPath).toBe('/Pred')
	expect(pathAnalyer.apiPath('API')).toBe('/Pred/~/Succ/Succ2/Dashboard/API')
})

it('Deconstructs DASHBOARD OPEN path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Settings/Customers/Customer/1'
		}
	} as any, 'Customers')
	expect(pathAnalyer.navComponents).toEqual([
		{component: 'Settings', title: 'Settings', link: '/~/Customers/Customer/1/Settings', current: false},
		{component: 'Customers', title: 'Customers', link: '/~/Customer/1/Settings/Customers', current: true},
		{component: 'Customer', title: 'Customer', link: '/~/1/Settings/Customers/Customer', current: true},
		{component: '1', title: '1', link: '/Settings/Customers/Customer/1', current: true}
	])
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.activePageFull).toBe('Customers/Customer/1')
	expect(pathAnalyer.activePageComponents).toEqual(['Customers', 'Customer', '1'])
	expect(pathAnalyer.baseComponents).toEqual(['Settings', 'Customers'])
	expect(pathAnalyer.basePath).toBe('/Settings/Customers')
	expect(pathAnalyer.activePage).toBe('Customers')
	expect(pathAnalyer.activePageSlug).toBe('Customer')
	expect(pathAnalyer.activePageSlugs).toBe('Customer/1')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('Customer/1')).toBe(true)
	expect(pathAnalyer.isOpen('Customer/2')).toBe(false)
	expect(pathAnalyer.isOpen('Customer')).toBe(true)
	expect(pathAnalyer.open('Customer/1')).toBe('/Settings/Customers/Customer')
	expect(pathAnalyer.open('Customer/1', false)).toBe('/Settings/Customers/Customer/1')
	expect(pathAnalyer.open('Customer/2')).toBe('/Settings/Customers/Customer/2')
	expect(pathAnalyer.apiPath('API')).toBe('/Settings/Customers/Customer/1/API')
})

it('Deconstructs ROOT path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/About'
		}
	} as any, '')
	expect(pathAnalyer.crumbs).toBe(null)
	expect(pathAnalyer.activePageFull).toBe('About')
	expect(pathAnalyer.activePageComponents).toEqual(['About'])
	expect(pathAnalyer.baseComponents).toEqual([])
	expect(pathAnalyer.basePath).toBe('/')
	expect(pathAnalyer.activePage).toBe('About')
	expect(pathAnalyer.activePageSlug).toBe('About')
	expect(pathAnalyer.activePageSlugs).toBe('About')
	expect(pathAnalyer.isOpen(null)).toBe(false)
	expect(pathAnalyer.isOpen('About')).toBe(true)
	expect(pathAnalyer.isOpen('Test')).toBe(false)
	expect(pathAnalyer.open('About')).toBe('/')
	expect(pathAnalyer.open('About', false)).toBe('/About')
	expect(pathAnalyer.open('Test')).toBe('/Test')
})

it('Deconstructs to TAB path', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Settings/Customers/Customer1/TabTest/AnotherTest'
		}
	} as any, 'Customers')

	expect(pathAnalyer.backPath).toBe('/Settings/Customers/Customer1/TabTest')
})

it('Deconstructs Query paths', () => {
	const pathAnalyer = new PathAnalyzer({
		params: {
			crumbs: ''
		},
		url: {
			pathname: '/Master/Detail?id=1'
		}
	} as any, 'Master')
	expect(pathAnalyer.isOpen('Detail?id=1')).toBe(true)
	// expect(pathAnalyer.isOpen('Page/Sub1/Another1')).toBe(false)
})
