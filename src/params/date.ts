import type {ParamMatcher} from '@sveltejs/kit'

export const match = ((param) => {
	// noinspection RegExpRedundantEscape
	/* eslint-disable no-useless-escape */
	return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(param)
}) satisfies ParamMatcher
