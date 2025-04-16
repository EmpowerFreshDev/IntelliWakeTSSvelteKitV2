import type {Actions} from '@sveltejs/kit'
import {fail} from '@sveltejs/kit'
import {RequestObject} from '$lib/FunctionsServer'
import {ESTTodayDateTimeLabel} from '@empowerfresh/intelliwake'

export const actions = {
	send: async ({request}) => {
		try {
			const data = await RequestObject(request)

			console.info('Multi', data)

			if (!data) {
				console.log('Failing')
				return fail(401, {message: 'Failed!'})
			} else {
				return {success: true, message: 'Message Sent'}
			}
		} catch (err) {
			console.error(ESTTodayDateTimeLabel(), err)
			return {
				success: false,
				message: (err as {
					message?: string | null
				}).message ?? 'Could not send message'
			}
		}
	}
} satisfies Actions
