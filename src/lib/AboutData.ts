export type TRawAboutBulletStrings = string | string[]

export type TRawAboutBulletObject = Record<string, (TRawAboutBulletStrings | Record<string, (TRawAboutBulletStrings | Record<string, (TRawAboutBulletStrings)[]>)[]>)[]>

export type TAboutBullets = TRawAboutBulletStrings | TRawAboutBulletObject

export type TAbout = {
	version: number
	title: string
	description?: string
	hidden?: boolean | (() => boolean)
	minors: {
		minor: number
		title: string
		date: string
		description?: string
		bullets: TAboutBullets[]
		hidden?: boolean | (() => boolean)
	}[]
}
