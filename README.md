# IntelliWake TS SvelteKit V2

## Overview
This NPM package provides common functions and components that enhance a SvelteKit project.

It leverages other IntelliWake modules.

## Installation
Installing this package can be done with `npm` or `pnpm`
```shell
pnpm install @solidbasisventures/intelliwaketssveltekitv2
```


## Usage

### Styling
For the styling of this package to work, tailwind must be installed on the host project. Then the following line should
be added to `tailwind.config.cjs` in the host project.

`'./node_modules/@solidbasisventures/intelliwaketssveltekitv1/**/*.{svelte,js,ts,jsx,tsx}'`

The end result should look like this:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/@solidbasisventures/intelliwaketssveltekitv1/**/*.{svelte,js,ts,jsx,tsx}'
    ],
}
```

This will cause tailwind to automatically include the tailwind classes found in this library.

### Importing
All imports are named imports and should look as follows

```javascript
import {ComponentName} from "@solidbasisventures/intelliwaketssveltekitv1"
```
