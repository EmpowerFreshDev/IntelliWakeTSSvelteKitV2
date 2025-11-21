# IntelliWake TS SvelteKit V2 (EmpowerFresh Fork)

## Overview

This NPM package provides common functions and components that enhance a SvelteKit project. It leverages other IntelliWake modules and is customized for EmpowerFresh development.

## Installation

### Manual Installation (Recommended)

To ensure the package is aliased correctly as `@empowerfreshdev/svelte-ui-library`, add the following line to the `dependencies` section of your `package.json`:

```json
"dependencies": {
"@empowerfreshdev/svelte-ui-library": "github:EmpowerFreshDev/IntelliWakeTSSvelteKitV2#main"
}
```

After saving the file, run:

```bash
npm install
```

### CLI Installation

Alternatively, you can install it via the command line with the alias:

```bash
npm install @empowerfreshdev/svelte-ui-library@github:EmpowerFreshDev/IntelliWakeTSSvelteKitV2#main
```

-----

## Development Workflow

There are two ways to make changes to this library and test them in the **EmpowerFresh-SK** app.

### Option 1: Local Development (Fast Loop)

Use this method for rapid iteration without pushing to GitHub.

**Link the Library:**
Navigate to your local `IntelliWakeTSSvelteKitV2` folder:

```bash
npm link
```

**Connect the App:**
Navigate to your local `EmpowerFresh-SK` folder:

```bash
npm link @empowerfreshdev/svelte-ui-library
```

**Unlink (When finished):**
Inside `EmpowerFresh-SK`:

```bash
npm unlink --no-save @empowerfreshdev/svelte-ui-library
npm install
```

### Option 2: Branch Testing (Stable Loop)

Use this method to test how the package behaves when installed from the cloud.

**In `IntelliWakeTSSvelteKitV2`:**

* Create a new branch (e.g., `feature/new-button`).
* Make your changes and push the branch to GitHub.

**In `EmpowerFresh-SK`:**

* Update `package.json` to point to your feature branch:
```json
"@empowerfreshdev/svelte-ui-library": "github:EmpowerFreshDev/IntelliWakeTSSvelteKitV2#feature/new-button"
```
* Run `npm install`.

**Merge:**

* Once tested, merge your branch into `main` on the library repo.
* Update `EmpowerFresh-SK` back to `#main`.

-----

## Usage

### Styling

For the styling of this package to work, Tailwind CSS must be installed on the host project. You must add the library's path to your `tailwind.config.cjs` content array.

**Important:** Ensure the path matches the alias defined in your installation (`@empowerfreshdev/svelte-ui-library`).

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        // Add this line to include library components:
        './node_modules/@empowerfreshdev/svelte-ui-library/**/*.{svelte,js,ts,jsx,tsx}'
    ],
}
```

This will cause Tailwind to automatically include the utility classes found in this library.

### Importing

All imports are named imports and should use the alias defined during installation:

```javascript
import { ComponentName } from "@empowerfreshdev/svelte-ui-library"
```