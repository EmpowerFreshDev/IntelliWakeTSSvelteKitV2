import type {TAbout} from '$lib/AboutData'
import { DateOnly } from '@solidbasisventures/intelliwaketsfoundation';

export const abouts: TAbout[] = [
	{
		version: 2,
		title: 'Next Deployment',
		minors: [
			{
				minor: 3,
				title: 'Yet Another Deployment',
				date: DateOnly('now'),
				hidden: () => false,
				bullets: [
					{
						'Yet Another Deployment': [
							'Yet another deployment'
						]
					}
				]
			},
			{
				minor: 2,
				title: 'Another Deployment',
				date: '1/4/2024',
				hidden: () => false,
				bullets: [
					{
						'Another Deployment': [
							'Another Deployment'
						]
					}
				]
			},
			{
				minor: 1,
				title: 'Initial',
				date: '1/25/2023',
				bullets: [
					{
						'Initial Deployment': [
							'Initial Deployment',
							[
								'Initial Deployment'
							]
						]
					}
				]
			}
		]
	},
	{
		version: 1,
		title: 'Initial Deployment',
		minors: [
			{
				minor: 3,
				title: 'Yet Another Deployment',
				date: DateOnly('now'),
				hidden: () => false,
				bullets: [
					{
						'Yet Another Deployment': [
							'Yet another deployment'
						]
					}
				]
			},
			{
				minor: 2,
				title: 'Another Deployment',
				date: '1/4/2024',
				hidden: () => false,
				bullets: [
					{
						'Another Deployment': [
							'Another Deployment'
						]
					}
				]
			},
			{
				minor: 1,
				title: 'Initial',
				date: '1/25/2023',
				bullets: [
					{
						'Initial Deployment': [
							'Initial Deployment',
							[
								'Initial Deployment'
							]
						]
					}
				]
			},
			{
				minor: 4,
				title: 'Future',
				date: '1/25/2099',
				hidden: true,
				bullets: [
					{
						'Future Deployment': [
							'Future Deployment'
						]
					}
				]
			},
			{
				minor: 4,
				title: 'Future',
				date: '1/26/2099',
				hidden: () => true,
				bullets: [
					{
						'Future Deployment': [
							'Future Deployment'
						]
					}
				]
			}
		]
	},
	{
		version: 0,
		title: 'Far Future Deployment',
		hidden: true,
		minors: [
			{
				minor: 1,
				title: 'Far Future',
				date: '1/25/2099',
				bullets: [
					{
						'Far Future Deployment': [
							'Far Future Deployment'
						]
					}
				]
			}
		]
	}
]
