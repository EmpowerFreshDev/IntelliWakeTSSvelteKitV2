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

### Option 1: Local Development with Docker (Recommended)

This method uses Docker with a volume mount to overlay your local library into the running container.

**One-Time Setup:**

In `EmpowerFresh-SK`, ensure `docker-compose-local.yml` has the following volume mounts for both `web` and `cron` services:

```yaml
services:
  web:
    volumes:
      - ./:/home/node/app
      - ~/.aws:/home/node/.aws:ro
      - ../IntelliWakeTSSvelteKitV2:/home/node/app/node_modules/@empowerfreshdev/svelte-ui-library:delegated
  
  cron:
    volumes:
      - ./:/home/node/app
      - ~/.aws:/home/node/.aws:ro
      - ../IntelliWakeTSSvelteKitV2:/home/node/app/node_modules/@empowerfreshdev/svelte-ui-library:delegated
```

**Important:** Verify the relative path `../IntelliWakeTSSvelteKitV2` matches your folder structure.

**Initial Setup (First Time Only):**

Ensure EmpowerFresh-SK has the library installed on the host (needed for imports to resolve):

```bash
cd /path/to/EmpowerFresh-SK
npm install @empowerfreshdev/svelte-ui-library
```

**Daily Workflow:**

1. **Start Docker with local library (detached mode):**
   ```bash
   cd /path/to/EmpowerFresh-SK
   docker compose -f docker-compose-local.yml up -d
   ```

2. **Make changes** in `IntelliWakeTSSvelteKitV2/src/lib/`

3. **Build the library** (required - the app uses `dist/` not `src/`):
   ```bash
   cd /path/to/IntelliWakeTSSvelteKitV2
   npm run build
   ```

4. **Nuke all caches and restart Docker** to pick up the changes:
   ```bash
   cd /path/to/EmpowerFresh-SK
   docker compose -f docker-compose-local.yml down
   rm -rf .svelte-kit node_modules/.vite
   docker compose -f docker-compose-local.yml up -d
   ```
   **Note:** This nukes both SvelteKit's build cache AND Vite's dependency cache to force a completely fresh compile.

5. **Trigger Vite compilation** - Open browser immediately and navigate to any page. This forces Vite to recompile with the new library code. Wait 10-15 seconds for compilation to complete.

6. **Check compilation status:**
   ```bash
   docker compose -f docker-compose-local.yml logs web --tail=20
   ```
   Look for "VITE ready" message.

7. **Verify the container has your changes:**
   ```bash
   docker compose -f docker-compose-local.yml exec web grep "YOURCHANGE" /home/node/app/node_modules/@empowerfreshdev/svelte-ui-library/dist/Modal.svelte
   ```

8. **Changes appear automatically** - Once Vite compiles, HMR will auto-update all open browser tabs. No manual refresh needed.

9. **Repeat steps 2-8** as you iterate

8. **Repeat steps 2-7** as you iterate

**When finished:**

```bash
cd /path/to/EmpowerFresh-SK
docker compose -f docker-compose-local.yml down
```

**Troubleshooting:**

If changes don't appear:
- Ensure you ran `npm run build` in the library directory
- **Nuclear option** - completely clear everything:
  ```bash
  cd /path/to/EmpowerFresh-SK
  docker compose -f docker-compose-local.yml down
  rm -rf .svelte-kit
  docker compose -f docker-compose-local.yml up -d
  ```
- Wait 20+ seconds, check logs: `docker compose -f docker-compose-local.yml logs web --tail=20`
- Verify the container has your changes: `docker compose -f docker-compose-local.yml exec web grep "YOURCHANGE" /home/node/app/node_modules/@empowerfreshdev/svelte-ui-library/dist/Modal.svelte`
- Clear browser cache completely (Cmd+Shift+R or open in incognito/private window)

### Option 2: Branch Testing (Cloud-based)

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