import type {Actions} from '@sveltejs/kit'
import {ESTTodayDateTimeLabel, ObjectFromFormData} from '@solidbasisventures/intelliwaketsfoundation'

export const actions = {
	send: async ({request, cookies, locals}) => {
		try {
			const data = ObjectFromFormData(await request.formData())

			console.info('Multi', data)

			return {success: true, message: 'Message Sent'}
		} catch (err: any) {
			console.error(ESTTodayDateTimeLabel(), err)
			return {success: false, message: err.message ?? 'Could not send message'}
		}
	}
} satisfies Actions
