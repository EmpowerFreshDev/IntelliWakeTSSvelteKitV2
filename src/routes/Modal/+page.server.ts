import type {Actions} from '@sveltejs/kit'
import {ObjectFromFormData, Sleep} from '@empowerfresh/intelliwake'
import type {PageServerLoad} from './$types'

export const load = (async ({depends}) => {
	depends('app:Modal')

	return {
		foo: 'bar'
	}
}) satisfies PageServerLoad


export const actions = {
	testAction: async ({request}) => {
		const data = await request.formData()

		console.info(ObjectFromFormData(data))

		await Sleep(3000)

		return {success: true, message: 'Tested'}
	}
} satisfies Actions
