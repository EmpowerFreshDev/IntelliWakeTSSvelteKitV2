module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	globals: {
		__version__: true
	},
	rules: {
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		eqeqeq: 'off',
		'no-extra-boolean-cast': 'off',
		'require-await': 'off',
		'no-async-promise-executor': 'off',
		'svelte/valid-compile': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'prefer-const': 'warn',
		'no-case-declarations': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'no-useless-escape': 'warn',
		'no-undef': 'warn'
	}
}
