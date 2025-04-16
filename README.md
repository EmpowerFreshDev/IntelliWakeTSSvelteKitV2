# IntelliWake TS SvelteKit V2

This is the **EmpowerFresh-maintained fork** of [`@solidbasisventures/intelliwaketssveltekitv2`](https://github.com/solidbasisventures/intelliwaketssveltekitv2).

It contains shared UI components used across EmpowerFresh apps, with internal enhancements, customizations, and architecture aligned with our platform.


> 🛠️ This is an **EmpowerFresh-maintained fork** of `@solidbasisventures/intelliwaketssveltekitv2`
> It contains shared UI components used across EmpowerFresh apps, with internal enhancements, customizations, and architecture aligned with our platform.
> forked from version `2.0.81` to allow app-specific enhancements and updates.  
> We track upstream as needed but are no longer directly dependent on its release cycle.
> 📦 This package is **not published to npm**. We consume it directly via GitHub.

---


---

## 📦 How It's Used

This package is not published to npm. It is **consumed directly from GitHub** via:

```json
"@empowerfresh/intelliwake-ui": "github:EmpowerFreshDev/intelliwaketssveltekitv2#main"


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
