# Polyrepo UIKit Approach - Single Package Strategy

## 🎯 Overview

This guide describes the **UIKit approach** for polyrepo micro-frontend architecture, where we publish a **single npm package** (`@hemantajax/uikit`) that contains all shared code, while maintaining clean internal organization through multiple libraries.

### Key Concept: Two Ways to Use

1. **Inside this repository** (Development): Use individual libraries via `@mfe-uikit/*` path mappings
2. **Outside this repository** (Consumers): Install and use the single package `@hemantajax/uikit`

---

## 🏗️ Architecture

### Current Repository Structure

```
mfe-uikit/                         ← This repository
├── apps/
│   └── uilab/                     ← Demo/testing application
├── libs/
│   ├── layout/                    ← Non-publishable (internal)
│   ├── components/                ← Non-publishable (internal)
│   ├── services/                  ← Non-publishable (internal)
│   ├── core/                      ← Non-publishable (internal)
│   ├── utils/                     ← Non-publishable (internal)
│   ├── pipes/                     ← Non-publishable (internal)
│   ├── directives/                ← Non-publishable (internal)
│   ├── constants/                 ← Non-publishable (internal)
│   ├── styles/                    ← Non-publishable (SCSS library)
│   └── uikit/                     ← PUBLISHABLE (meta-package)
│       ├── src/
│       │   ├── index.ts           ← Public API - Re-exports everything
│       │   └── lib/               ← Internal implementations
│       ├── package.json           ← Published to npm as @hemantajax/uikit
│       └── ng-package.json        ← Angular package configuration
├── .github/workflows/
│   └── publish.yml                ← CI/CD for publishing
├── nx.json                        ← Nx workspace configuration
├── package.json                   ← Workspace dependencies
└── tsconfig.base.json             ← TypeScript path mappings
```

### Key Concepts

#### 1. Internal Libraries (Non-Publishable)

These libraries are for **internal development only** and are accessed via TypeScript path mappings:

| Library      | Import Path             | Purpose                                  |
| ------------ | ----------------------- | ---------------------------------------- |
| `layout`     | `@mfe-uikit/layout`     | Layout components (Header, Footer, etc.) |
| `components` | `@mfe-uikit/components` | Reusable UI components                   |
| `services`   | `@mfe-uikit/services`   | Shared services (HTTP, Storage, etc.)    |
| `core`       | `@mfe-uikit/core`       | Guards, Interceptors, Models, Interfaces |
| `utils`      | `@mfe-uikit/utils`      | Utility functions                        |
| `pipes`      | `@mfe-uikit/pipes`      | Angular pipes                            |
| `directives` | `@mfe-uikit/directives` | Angular directives                       |
| `constants`  | `@mfe-uikit/constants`  | Application constants                    |
| `styles`     | `@mfe-uikit/styles`     | SCSS styles, variables, mixins           |

**Benefits:**

- ✅ Organized by domain for better code structure
- ✅ Fast development with instant TypeScript path resolution
- ✅ Clear separation of concerns
- ✅ Easy to refactor and maintain

#### 2. UIKit Package (Publishable)

The `uikit` library is the **only publishable package**:

- **Package Name**: `@hemantajax/uikit`
- **Purpose**: Meta-package that bundles and re-exports all internal libraries
- **Published To**: npm registry (GitHub Packages or npm)
- **Consumed By**: Shell and all remote micro-frontend applications
- **Version**: Single version to manage (currently `0.0.1`)

**Benefits:**

- ✅ Single package installation
- ✅ Simple imports in consumer applications
- ✅ One version to track
- ✅ All updates bundled together

---

## 📦 How to Use: Inside vs Outside This Repository

### 🏠 Inside This Repository (Development)

When working **inside this repository** (e.g., in the `uilab` demo app or adding new features), you use **individual libraries** via TypeScript path mappings defined in `tsconfig.base.json`.

#### Configuration

**tsconfig.base.json:**

```json
{
  "compilerOptions": {
    "paths": {
      "@mfe-uikit/layout": ["libs/layout/src/index.ts"],
      "@mfe-uikit/components": ["libs/components/src/index.ts"],
      "@mfe-uikit/services": ["libs/services/src/index.ts"],
      "@mfe-uikit/core": ["libs/core/src/index.ts"],
      "@mfe-uikit/pipes": ["libs/pipes/src/index.ts"],
      "@mfe-uikit/directives": ["libs/directives/src/index.ts"],
      "@mfe-uikit/utils": ["libs/utils/src/index.ts"],
      "@mfe-uikit/constants": ["libs/constants/src/index.ts"],
      "@mfe-uikit/styles": ["libs/styles/src/index.ts"],
      "@mfe-uikit/uikit": ["libs/uikit/src/index.ts"]
    }
  }
}
```

#### Usage Examples

**Component imports:**

```typescript
// apps/uilab/src/app/app.component.ts
import { Component } from '@angular/core';
import { LayoutComponent } from '@mfe-uikit/layout';
import { ButtonComponent, CardComponent } from '@mfe-uikit/components';
import { StorageService } from '@mfe-uikit/services';
import { TruncatePipe } from '@mfe-uikit/pipes';
import { HighlightDirective } from '@mfe-uikit/directives';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ButtonComponent, CardComponent, TruncatePipe, HighlightDirective],
  template: `
    <lib-layout>
      <h1>{{ title | truncate : 20 }}</h1>
      <lib-button [highlight]>Click me</lib-button>
      <lib-card>Content here</lib-card>
    </lib-layout>
  `,
})
export class AppComponent {
  title = 'Welcome to UIKit Demo Application';

  constructor(private storage: StorageService) {
    this.storage.setItem('user', { name: 'John' });
  }
}
```

**SCSS imports:**

```scss
// apps/uilab/src/styles.scss
@import '@mfe-uikit/styles/main';

// Or import specific modules
@import '@mfe-uikit/styles/abstracts/variables';
@import '@mfe-uikit/styles/abstracts/mixins';
@import '@mfe-uikit/styles/components/buttons';
```

**Why use individual libraries inside the repo?**

- ⚡ **Faster development**: TypeScript resolves paths instantly (no build needed)
- 🔍 **Better IDE support**: Jump to definition works perfectly
- 🐛 **Easier debugging**: Source code directly available
- 📊 **Nx dependency graph**: Track dependencies between libraries
- 🎯 **Precise imports**: Import only what you need from specific libraries

---

### 🌍 Outside This Repository (Consumer Applications)

When using **outside this repository** (e.g., in Shell or Remote micro-frontend apps), you install the **single published package** from npm.

#### Installation

```bash
# In your shell or remote application
npm install @hemantajax/uikit@latest

# Or with specific version
npm install @hemantajax/uikit@0.0.1

# Or with yarn
yarn add @hemantajax/uikit@latest
```

#### Authentication (for GitHub Packages)

If publishing to GitHub Packages, consumers need to authenticate:

**Create `.npmrc` in the consumer project:**

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Or login via npm:**

```bash
npm login --registry=https://npm.pkg.github.com --scope=@hemantajax
```

#### Usage Examples

**Component imports (all from single package):**

```typescript
// shell/src/app/app.component.ts
import { Component } from '@angular/core';
import {
  LayoutComponent, // from layout library
  ButtonComponent, // from components library
  CardComponent, // from components library
  StorageService, // from services library
  TruncatePipe, // from pipes library
  HighlightDirective, // from directives library
  API_BASE_URL, // from constants library
} from '@hemantajax/uikit';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ButtonComponent, CardComponent, TruncatePipe, HighlightDirective],
  template: `
    <lib-layout>
      <h1>{{ title | truncate : 20 }}</h1>
      <lib-button [highlight]>Click me</lib-button>
      <lib-card>Content here</lib-card>
    </lib-layout>
  `,
})
export class AppComponent {
  title = 'My Micro-Frontend Shell';

  constructor(private storage: StorageService) {
    console.log('API URL:', API_BASE_URL);
    this.storage.setItem('user', { name: 'John' });
  }
}
```

**SCSS imports:**

```scss
// shell/src/styles.scss
@import '@hemantajax/uikit/styles/main';

// Or specific modules
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';
```

**Why use the single package outside the repo?**

- 📦 **Simple installation**: One package instead of 10
- 🔄 **Easy updates**: `npm update @hemantajax/uikit@latest`
- 🎯 **Single version**: No version conflicts
- 📝 **Clean imports**: Everything from one place
- 🚀 **Faster setup**: Less configuration

---

### 🔄 Comparison: Inside vs Outside

| Aspect           | Inside Repository             | Outside Repository              |
| ---------------- | ----------------------------- | ------------------------------- |
| **Import Path**  | `@mfe-uikit/layout`           | `@hemantajax/uikit`             |
| **Installation** | Already available (workspace) | `npm install @hemantajax/uikit` |
| **Resolution**   | TypeScript path mapping       | node_modules                    |
| **Development**  | Live changes (no build)       | Published version only          |
| **IDE Support**  | Jump to source                | Jump to .d.ts files             |
| **Use Case**     | Developing the library itself | Consuming in other projects     |
| **Speed**        | Instant (no build)            | Requires `npm install`          |
| **Updates**      | Code directly edited          | `npm update` to get new version |

---

## 🚀 Step-by-Step Implementation

### Quick Reference

**TL;DR - Commands you'll use most:**

```bash
# 1. Create workspace
npx create-nx-workspace@latest .              # Follow prompts

# 2. Add framework support
npm install -D @nx/angular                    # or @nx/react

# 3. Generate libraries
nx g lib my-library                           # Interactive (recommended)

# OR specify everything explicitly
nx g @nx/angular:lib my-library               # Angular library
nx g @nx/react:lib my-library                 # React library
nx g @nx/js:lib my-library                    # Plain TypeScript

# Optional: Add --importPath to customize (usually not needed)
nx g lib my-library --importPath=@myorg/my-library

# 4. Build
nx build my-library
```

**Framework Choice Guide:**

- 🅰️ **Angular** → `@nx/angular:lib` - For components, services, pipes, directives
- ⚛️ **React** → `@nx/react:lib` - For React components and hooks
- 📦 **TypeScript** → `@nx/js:lib` - For utilities, models, constants (no framework code)

---

### Step 1: Create Repository

```bash
# Create directory
mkdir mfe-polyrepo-shared-libs
cd mfe-polyrepo-shared-libs

# Initialize Nx workspace (interactive prompts)
npx create-nx-workspace@latest .

# When prompted, choose:
# - Preset: ts (TypeScript)
# - Name: mfe-shared           ← This becomes your default import path prefix!
# - Nx Cloud: Skip
# - Package Manager: npm
```

**📝 About the Name:** The workspace name you choose (e.g., `mfe-shared`) becomes the default prefix for all library import paths:

- Workspace name: `mfe-shared` → Import paths: `@mfe-shared/layout`, `@mfe-shared/components`, etc.
- Workspace name: `hemantajax` → Import paths: `@hemantajax/layout`, `@hemantajax/components`, etc.

This is stored in `package.json` as `"name": "@mfe-shared/source"` and used in `tsconfig.base.json` for path mappings.

#### Customizing the Default Import Path Scope

**Option 1: Set during workspace creation** (Recommended)
Just choose your desired name when running `npx create-nx-workspace@latest .`

**Option 2: Manually configure in `package.json`**

```json
{
  "name": "@hemantajax/source", // Change @mfe-shared to @hemantajax
  "version": "0.0.0"
  // ...
}
```

**Option 3: Add `npmScope` to `nx.json`** (Optional, overrides package.json)

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "npmScope": "hemantajax" // Add this line
  // ...
}
```

**Real Example from your nxmfe workspace:**

```json
// package.json
{
  "name": "@nxmfe/source"          // Scope is @nxmfe
}

// tsconfig.base.json
{
  "paths": {
    "@nxmfe/shared/layout": ["libs/shared/layout/src/index.ts"],
    "@nxmfe/shared/services": ["libs/shared/services/src/index.ts"]
    // All imports use @nxmfe prefix
  }
}
```

### Step 2: Install Framework Support (Optional)

Choose based on your micro-frontend framework:

```bash
# For Angular micro-frontends
npm install -D @nx/angular

# For React micro-frontends
npm install -D @nx/react

# For framework-agnostic/vanilla TypeScript (already included)
# No additional installation needed - @nx/js comes with preset:ts
```

**Which to choose?**

| Generator         | Use When                                        | Examples                                                        |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| `@nx/angular:lib` | Angular components, services, pipes, directives | `layout`, `components`, `services`, `pipes`, `directives`       |
| `@nx/react:lib`   | React components and hooks                      | `components`, `shared-hooks`                                    |
| `@nx/js:lib`      | Framework-agnostic TypeScript code              | `utils`, `constants`, `models`, `types`, `uikit` (meta-package) |

**💡 Pro Tip:** You can mix and match! For example:

- Use `@nx/angular:lib` for `layout`, `components`, `pipes`
- Use `@nx/js:lib` for `utils`, `constants`, `core/models`
- Use `@nx/js:lib` for the `uikit` meta-package (since it just re-exports)

**For this guide:** We'll use `@nx/angular` since we're building for Angular micro-frontends.

```bash
npm install -D @nx/angular
```

### Step 3: Configure Generator Defaults (Recommended)

Add generator defaults to `nx.json` to avoid specifying the generator each time:

```json
{
  "generators": {
    "@nx/angular:library": {
      "linter": "eslint",
      "unitTestRunner": "jest"
    }
  }
}
```

### Step 4: Generate Non-Publishable Libraries

**Option 1: Interactive Mode (Recommended - Easiest)**

```bash
# Let Nx prompt you for everything
nx g lib layout
nx g lib components
nx g lib services
nx g lib core
nx g lib utils
nx g lib pipes
nx g lib directives
nx g lib constants
nx g lib styles

# Nx will prompt for:
# - Generator type (choose @nx/angular:library)
# - Import path (accept default or customize)
# - Other options
```

**Option 2: Specify Import Path Explicitly**

```bash
# If you want to control the import path names
nx g lib layout --importPath=@mfe-shared/layout
nx g lib components --importPath=@mfe-shared/components
nx g lib services --importPath=@mfe-shared/services
# ... etc
```

**Option 3: Use Directory Flag (Nx auto-generates import path)**

```bash
# Nx will auto-generate import path as @mfe-shared/<name>
nx g lib layout --directory=libs/layout
nx g lib components --directory=libs/components
# ... etc
```

**💡 Which to choose?**

- **Option 1** (Interactive): Best for learning, no memorization needed
- **Option 2** (Explicit import): Best for scripts/automation, full control
- **Option 3** (Directory): Good balance, less typing

**Note:** By default, Nx generates import paths based on your workspace name and library location, so you often don't need `--importPath` unless you want a specific naming convention.

### Step 5: Generate Publishable UIKit Package

**Interactive Mode (Recommended)**

```bash
nx g lib uikit

# When prompted:
# - Generator: @nx/js:library (plain TypeScript, not Angular)
# - Publishable: Yes
# - Import path: @hemantajax/mfe-uikit
```

**Or explicit (one-liner)**

```bash
nx g @nx/js:lib uikit --publishable --importPath=@hemantajax/mfe-uikit
```

**Why `@nx/js:lib`?** The uikit package is just a meta-package that re-exports other libraries - it doesn't contain any Angular components itself, so plain TypeScript is perfect.

**Why `@hemantajax/mfe-uikit` instead of `@mfe-shared/uikit`?**

For **publishable packages** (like uikit), use your **npm/GitHub username or organization**:

| Internal Libraries                    | Publishable Package                        |
| ------------------------------------- | ------------------------------------------ |
| `@mfe-shared/layout` ← Local only     | `@hemantajax/mfe-uikit` ← Published to npm |
| `@mfe-shared/components` ← Local only | Use your GitHub/npm username               |
| `@mfe-shared/services` ← Local only   | Must match registry scope                  |

**Examples:**

- GitHub Packages: `@hemantajax/mfe-uikit` (your GitHub username)
- npm Public: `@yourcompany/mfe-uikit` (your npm org)
- npm Private: `@myorg/mfe-uikit` (your private org)

The internal libraries use `@mfe-shared` for development convenience, but the published package needs a real registry scope.

### Step 6: Configure UIKit to Re-Export Everything

The `libs/uikit/src/index.ts` file serves as the **public API** that re-exports all functionality:

```typescript
/**
 * @hemantajax/uikit
 *
 * Complete UI Kit for Micro-Frontend applications
 * Includes layout, components, services, utilities, and more
 */

// ===== Layout Components =====
export * from './lib/layout/layout';

// ===== UI Components =====
export * from './lib/components/components';

// ===== Services =====
export * from './lib/services/services';

// ===== Core (Guards, Interceptors, Models) =====
export * from './lib/core/core';

// ===== Utilities =====
export * from './lib/utils/utils';

// ===== Pipes =====
export * from './lib/pipes/pipes';

// ===== Directives =====
export * from './lib/directives/directives';

// ===== Constants =====
export * from './lib/constants/constants';

// ===== UIKit Component =====
export * from './lib/uikit/uikit';

// Note: Styles library is SCSS-only and should be imported directly in your styles.scss
// @import '@hemantajax/uikit/styles/main.scss';
```

**Internal Implementation Structure:**

Each `lib/*/*.ts` file imports from the actual library and re-exports it:

```typescript
// libs/uikit/src/lib/layout/layout.ts
export * from '@mfe-uikit/layout';

// libs/uikit/src/lib/components/components.ts
export * from '@mfe-uikit/components';

// libs/uikit/src/lib/services/services.ts
export * from '@mfe-uikit/services';

// ... and so on for each library
```

This approach provides:

- ✅ Clean public API in `index.ts`
- ✅ Organized internal structure
- ✅ Easy to maintain and extend

### Step 7: Configure UIKit package.json

Current `libs/uikit/package.json`:

```json
{
  "name": "@hemantajax/uikit",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^20.3.0",
    "@angular/core": "^20.3.0"
  },
  "sideEffects": false
}
```

**For Publishing to GitHub Packages or npm, add:**

```json
{
  "name": "@hemantajax/uikit",
  "version": "1.0.0",
  "description": "Complete UI Kit for Micro-Frontend applications - includes layout, components, services, and utilities",
  "keywords": ["angular", "micro-frontend", "module-federation", "ui-kit", "components", "services"],
  "author": "Hemant",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hemantajax/mfe-uikit.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@hemantajax",
    "access": "public"
  },
  "peerDependencies": {
    "@angular/common": "^20.3.0",
    "@angular/core": "^20.3.0",
    "@angular/router": "^20.3.0"
  },
  "sideEffects": false
}
```

**Key Fields Explained:**

- `name`: Package name on npm/GitHub Packages (must match your registry scope)
- `version`: Semantic versioning (update this with each release)
- `peerDependencies`: Angular versions required by consumers
- `sideEffects: false`: Enables tree-shaking for better bundle sizes
- `publishConfig`: Where to publish (GitHub Packages, npm, etc.)

### Step 8: Configure Build (Angular Package)

Current `libs/uikit/project.json`:

```json
{
  "name": "uikit",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/uikit/src",
  "prefix": "lib",
  "projectType": "library",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@nx/angular:package",
      "outputs": ["{workspaceRoot}/dist/{projectRoot}"],
      "options": {
        "project": "libs/uikit/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "libs/uikit/tsconfig.lib.prod.json"
        },
        "development": {}
      },
      "defaultConfiguration": "production"
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/uikit/jest.config.ts",
        "tsConfig": "libs/uikit/tsconfig.spec.json"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  }
}
```

**And `libs/uikit/ng-package.json`:**

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.json",
  "dest": "../../dist/libs/uikit",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
```

**Key Configuration Points:**

- Uses `@nx/angular:package` executor (not `@nx/js:tsc`) for proper Angular library packaging
- Outputs to `dist/libs/uikit` with proper Angular package format
- `ng-package.json` defines the entry point and output location
- Production configuration uses optimized TypeScript config

### Step 9: Configure npm Registry

Create `.npmrc` in root:

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Step 10: Create GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish UIKit Package

on:
  push:
    branches: [main]
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@hemantajax'

      - name: Install dependencies
        run: npm ci

      - name: Build uikit (builds all dependencies)
        run: nx build uikit

      - name: Publish uikit package
        run: cd dist/libs/uikit && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true
```

### Step 11: Push to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: UIKit shared libraries"

# Create GitHub repository
gh repo create mfe-polyrepo-shared-libs --public --source=. --remote=origin

# Push
git branch -M main
git push -u origin main
```

---

## 📦 Usage in Shell and Remotes (External Projects)

### Installation

```bash
# In shell or any remote repository
npm install @hemantajax/uikit@latest

# Or with specific version
npm install @hemantajax/uikit@0.0.1
```

### Import Everything from Single Package

```typescript
// Before (inside this repo):
import { LayoutComponent } from '@mfe-uikit/layout';
import { StorageService } from '@mfe-uikit/services';
import { TruncatePipe } from '@mfe-uikit/pipes';

// After (in external projects):
import { LayoutComponent, StorageService, TruncatePipe } from '@hemantajax/uikit';
```

### Using in Components

```typescript
// app.component.ts in your Shell or Remote app
import { Component } from '@angular/core';
import {
  LayoutComponent, // from layout library
  StorageService, // from services library
  TruncatePipe, // from pipes library
  HighlightDirective, // from directives library
  API_BASE_URL, // from constants library
} from '@hemantajax/uikit';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, TruncatePipe, HighlightDirective],
  template: `
    <lib-layout>
      <h1>{{ title | truncate : 20 }}</h1>
      <router-outlet />
    </lib-layout>
  `,
})
export class AppComponent {
  title = 'My Micro-Frontend Application';

  constructor(private storage: StorageService) {
    console.log('API URL:', API_BASE_URL);
    this.storage.setItem('user', { name: 'John' });
  }
}
```

### Using Styles

```scss
// styles.scss in your Shell or Remote app
@import '@hemantajax/uikit/styles/main';

// Or import specific modules
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';
@import '@hemantajax/uikit/styles/components/buttons';
```

---

## 🔄 Update Workflow

### Development Workflow (Inside This Repo)

1. **Make changes** to any internal library (layout, components, services, etc.)

   ```bash
   # Edit files in libs/layout, libs/components, etc.
   ```

2. **Test locally** in the `uilab` demo app

   ```bash
   nx serve uilab
   ```

3. **Run tests and linting**

   ```bash
   nx test layout      # Test specific library
   nx lint layout      # Lint specific library
   nx test uikit       # Test the uikit package
   ```

4. **Build the uikit package**

   ```bash
   nx build uikit
   # Output: dist/libs/uikit
   ```

5. **Commit and push** to main branch
   ```bash
   git add .
   git commit -m "feat: add new button component"
   git push origin main
   ```

### Publishing Workflow

1. **Update version** in `libs/uikit/package.json`:

```json
{
  "name": "@hemantajax/uikit",
  "version": "1.1.0" // Increment version
}
```

2. **Build for production**:

```bash
   nx build uikit --configuration=production
```

3. **Publish to npm/GitHub Packages**:

   ```bash
   cd dist/libs/uikit
   npm publish
   ```

4. **Or use GitHub Actions** (if configured):
   - Push to main triggers automatic build and publish
   - Or manually trigger workflow

### Version Management (Semantic Versioning)

```bash
# Patch version (bug fixes): 1.0.0 → 1.0.1
cd libs/uikit && npm version patch

# Minor version (new features): 1.0.0 → 1.1.0
cd libs/uikit && npm version minor

# Major version (breaking changes): 1.0.0 → 2.0.0
cd libs/uikit && npm version major
```

### Updating Consumers (External Projects)

In your Shell or Remote micro-frontend apps:

```bash
# Update to latest version
npm update @hemantajax/uikit@latest

# Or install specific version
npm install @hemantajax/uikit@1.1.0

# Check installed version
npm list @hemantajax/uikit
```

---

## ✅ Benefits of UIKit Approach

### For Developers

✅ **Simple installation**: One package instead of nine  
✅ **Easy imports**: Import everything from one place  
✅ **Single version**: No version conflicts between packages  
✅ **Faster setup**: Less configuration required

### For Maintainers

✅ **Clean organization**: Internal libraries well-structured  
✅ **Easier publishing**: Publish one package instead of nine  
✅ **Better refactoring**: Change internal structure without breaking consumers  
✅ **Nx benefits**: Dependency graph, affected commands, caching

### For Architecture

✅ **Separation of concerns**: Code organized by domain  
✅ **Encapsulation**: Internal structure hidden from consumers  
✅ **Scalability**: Easy to add new internal libraries  
✅ **Flexibility**: Can split into multiple packages later if needed

---

## 📊 Comparison with Multi-Package Approach

| Aspect                    | UIKit (Single Package)           | Multi-Package              |
| ------------------------- | -------------------------------- | -------------------------- |
| **Packages to publish**   | 1                                | 10                         |
| **Installation**          | `npm install @hemantajax/uikit`  | Install 10 packages        |
| **Import complexity**     | Single import source             | Multiple import sources    |
| **Version management**    | 1 version                        | 10 versions to synchronize |
| **Setup time**            | ~2 hours                         | ~4-6 hours                 |
| **Maintenance**           | Simple                           | Complex                    |
| **Internal organization** | ✅ Clean (9 internal + 1 public) | ✅ Clean                   |
| **Publishing workflow**   | Simple (build once, publish)     | Complex (build 10x)        |
| **Bundle size**           | Optimized with tree-shaking      | Can be optimized           |
| **Developer experience**  | Easy imports, single update      | Multiple import paths      |
| **Best for**              | Most projects                    | Large enterprises          |

---

## 🧪 Testing Locally

### Build and Test Inside This Repo

```bash
# Build uikit package
nx build uikit

# Check output
ls -la dist/libs/uikit/

# Run tests
nx test uikit

# Lint
nx lint uikit

# Test in the demo app (uilab)
nx serve uilab
```

### Test in External Projects (Local Link)

Before publishing, test the package in your Shell or Remote apps:

```bash
# Step 1: Build the package
nx build uikit --configuration=production

# Step 2: Create npm link
cd dist/libs/uikit
npm link

# Step 3: In your shell/remote project
cd /path/to/your/shell-app
npm link @hemantajax/uikit

# Step 4: Test the integration
npm start

# Step 5: When done testing, unlink
npm unlink @hemantajax/uikit
npm install  # Reinstall normal dependencies
```

### Verify Package Contents

```bash
# Check what files will be published
cd dist/libs/uikit
npm pack --dry-run

# Or actually create the tarball
npm pack

# Inspect the tarball contents
tar -tzf hemantajax-uikit-0.0.1.tgz
```

### Expected Package Structure

```
dist/libs/uikit/
├── esm2022/              ← ES2022 modules
├── fesm2022/             ← Flattened ES2022 modules
├── lib/                  ← TypeScript source (for IDE)
├── index.d.ts            ← Type definitions
├── package.json          ← Package metadata
└── README.md             ← Documentation
```

---

## 🚀 Deployment Checklist

### Initial Setup

- [x] Nx workspace created
- [x] All 9 internal libraries created (layout, components, services, core, pipes, directives, utils, constants, styles)
- [x] UIKit library created as publishable Angular package
- [x] UIKit configured to re-export all libraries
- [x] Demo app (uilab) created for testing
- [x] TypeScript path mappings configured in tsconfig.base.json

### Package Configuration

- [ ] `libs/uikit/package.json` - Update version and metadata
- [ ] `libs/uikit/package.json` - Add publishConfig with registry URL
- [ ] `libs/uikit/package.json` - Configure repository and author info
- [ ] `.npmrc` - Configure npm registry authentication
- [ ] `libs/uikit/README.md` - Add package documentation

### Build & Test

- [ ] Run `nx build uikit` successfully
- [ ] Verify dist/libs/uikit structure
- [ ] Test package locally with `npm link`
- [ ] Test imports work in demo app (uilab)
- [ ] Run tests: `nx test uikit`
- [ ] Run linting: `nx lint uikit`

### Publishing

- [ ] GitHub Actions workflow created (optional)
- [ ] Repository pushed to GitHub
- [ ] First manual publish successful
- [ ] Package visible in npm/GitHub Packages
- [ ] Test installation in external project
- [ ] Verify all exports work correctly
- [ ] Update external projects to use the package

---

## 📚 Related Documentation

- [Nx Library Types](./NX_LIBRARY_TYPES.md) - Publishable vs Non-Publishable
- [Polyrepo Implementation Plan](./POLYREPO_IMPLEMENTATION_PLAN.md) - Complete setup guide
- [Monorepo vs Polyrepo](./MONOREPO_VS_POLYREPO.md) - Architecture comparison

---

## 🔧 Daily Development Workflow

Once your workspace is set up, here are the commands you'll use daily:

### Adding a New Component to an Existing Library

```bash
# Add component to layout library
nx g component header --project=layout --export

# Add component to components library
nx g component button --project=components --export

# Add service to services library
nx g service auth --project=services

# Add pipe to pipes library
nx g pipe truncate --project=pipes --export

# Add directive to directives library
nx g directive highlight --project=directives --export
```

**Note:** Use `--export` to automatically export from the library's index.ts

### Working with Internal Libraries

```bash
# Serve the demo app (tests all libraries)
nx serve uilab

# Build a specific library (for debugging)
nx build layout

# Test a specific library
nx test components

# Lint a specific library
nx lint services

# Run affected commands (only changed libraries)
nx affected:test
nx affected:lint
nx affected:build
```

### Building and Publishing the UIKit Package

```bash
# 1. Make changes to any internal library
# Example: Edit libs/components/src/lib/button/button.component.ts

# 2. Test locally in uilab
nx serve uilab

# 3. Update version in libs/uikit/package.json
# Manually edit version: "0.0.1" → "0.0.2"
# Or use npm version:
cd libs/uikit
npm version patch  # patch, minor, or major
cd ../..

# 4. Build the uikit package
nx build uikit --configuration=production

# 5. (Optional) Test with npm link before publishing
cd dist/libs/uikit
npm link
cd /path/to/your/shell-app
npm link @hemantajax/uikit

# 6. Publish to npm/GitHub Packages
cd dist/libs/uikit
npm publish

# 7. Update in consumer projects
cd /path/to/your/shell-app
npm update @hemantajax/uikit@latest
```

### Using Nx Dependency Graph

```bash
# Visualize library dependencies
nx graph

# See what will be affected by your changes
nx affected:graph
```

**Key Takeaway:**

- Develop inside this repo using `@mfe-uikit/*` imports
- Build and publish `uikit` package for external consumption
- External projects import from `@hemantajax/uikit`

---

## 🎉 Summary

The **UIKit approach** gives you:

- ✅ **Single package** (`@hemantajax/uikit`) for easy consumption in external projects
- ✅ **Clean internal organization** with 9 domain-specific libraries for maintainability
- ✅ **Dual development modes**:
  - Inside repo: Use `@mfe-uikit/*` for fast development
  - Outside repo: Use `@hemantajax/uikit` for consumption
- ✅ **Nx benefits**: Dependency graph, affected commands, caching, and incremental builds
- ✅ **Simple publishing** workflow with Angular package format
- ✅ **Tree-shaking support** for optimal bundle sizes
- ✅ **Best of both worlds**: Monorepo development experience, polyrepo deployment model

### Quick Command Reference

| Task                        | Command                                |
| --------------------------- | -------------------------------------- |
| **Develop inside repo**     | `nx serve uilab`                       |
| **Build uikit package**     | `nx build uikit`                       |
| **Test a library**          | `nx test components`                   |
| **Lint a library**          | `nx lint services`                     |
| **View dependency graph**   | `nx graph`                             |
| **Publish package**         | `cd dist/libs/uikit && npm publish`    |
| **Install in external app** | `npm install @hemantajax/uikit@latest` |
| **Update in external app**  | `npm update @hemantajax/uikit@latest`  |

This is the **recommended approach** for polyrepo micro-frontend projects! 🚀

---

## 📝 Document Information

**Created**: October 24, 2025  
**Last Updated**: October 24, 2025  
**Repository**: https://github.com/hemantajax/mfe-uikit  
**Package**: `@hemantajax/uikit`  
**Current Version**: `0.0.1`  
**Status**: ✅ Active Development
