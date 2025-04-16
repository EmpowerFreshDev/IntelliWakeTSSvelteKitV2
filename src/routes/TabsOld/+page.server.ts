import type {Actions} from '@sveltejs/kit'
import {ESTTodayDateTimeLabel, ObjectFromFormData} from '@empowerfresh/intelliwake'

export const actions = {
	test: async ({request}) => {
		try {
			const data = ObjectFromFormData(await request.formData())

			console.info('Test', data)

			return {success: true}
		} catch (err) {
			console.error(ESTTodayDateTimeLabel(), err)
			return {success: false, message: (err as { message?: string | null }).message ?? 'Could not test'}
		}
	}
} satisfies Actions
