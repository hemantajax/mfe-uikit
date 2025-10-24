# UIKit Architecture - Visual Guide

## 🎯 Overview

This visual guide explains how the mfe-uikit repository is structured and how code flows from development to consumption.

---

## 📦 Package Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    mfe-uikit Repository                              │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Internal Libraries (9)                          │   │
│  │              (Non-Publishable)                               │   │
│  │                                                               │   │
│  │  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │  layout  │  │components │  │ services │  │   core   │  │   │
│  │  │          │  │           │  │          │  │          │  │   │
│  │  └──────────┘  └───────────┘  └──────────┘  └──────────┘  │   │
│  │                                                               │   │
│  │  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │  pipes   │  │directives │  │  utils   │  │constants │  │   │
│  │  │          │  │           │  │          │  │          │  │   │
│  │  └──────────┘  └───────────┘  └──────────┘  └──────────┘  │   │
│  │                                                               │   │
│  │  ┌──────────┐                                                │   │
│  │  │  styles  │  (SCSS only)                                  │   │
│  │  │          │                                                │   │
│  │  └──────────┘                                                │   │
│  └──────────────────────┬───────────────────────────────────────┘   │
│                         │                                            │
│                         │ Re-export All                             │
│                         ▼                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              UIKit Package (1)                               │   │
│  │              (Publishable)                                   │   │
│  │                                                               │   │
│  │      libs/uikit/src/index.ts                                │   │
│  │      ├─ export * from './lib/layout/layout'                 │   │
│  │      ├─ export * from './lib/components/components'         │   │
│  │      ├─ export * from './lib/services/services'             │   │
│  │      └─ ... (all libraries)                                 │   │
│  │                                                               │   │
│  └──────────────────────┬───────────────────────────────────────┘   │
│                         │                                            │
└─────────────────────────┼────────────────────────────────────────────┘
                          │
                          │ nx build uikit
                          ▼
                ┌─────────────────────┐
                │  dist/libs/uikit    │
                │  @hemantajax/uikit  │
                │  (Angular Package)  │
                └──────────┬──────────┘
                          │
                          │ npm publish
                          ▼
                ┌─────────────────────┐
                │  npm Registry       │
                │  (GitHub Packages   │
                │   or npmjs.com)     │
                └──────────┬──────────┘
                          │
                          │ npm install
                          ▼
          ┌───────────────────────────────────┐
          │   Consumer Applications           │
          │   (Shell, Remote1, Remote2, etc.) │
          └───────────────────────────────────┘
```

---

## 🔄 Development Flow

### Inside Repository (Development)

```
┌──────────────────────────────────────────────────────────────────┐
│  Developer Working Inside mfe-uikit                               │
└──────────────────────────────────────────────────────────────────┘
                          │
                          │ edits files
                          ▼
        ┌────────────────────────────────────┐
        │  libs/components/src/...           │
        │  libs/services/src/...             │
        │  libs/layout/src/...               │
        └────────────────┬───────────────────┘
                         │
                         │ TypeScript Path Mapping
                         │ (tsconfig.base.json)
                         ▼
        ┌────────────────────────────────────┐
        │  Import: @mfe-uikit/components     │
        │  Import: @mfe-uikit/services       │
        │  Import: @mfe-uikit/layout         │
        └────────────────┬───────────────────┘
                         │
                         │ used in
                         ▼
        ┌────────────────────────────────────┐
        │  apps/uilab/src/app/...            │
        │  (Demo Application)                │
        └────────────────┬───────────────────┘
                         │
                         │ nx serve uilab
                         ▼
        ┌────────────────────────────────────┐
        │  Live Development                  │
        │  ⚡ Instant Feedback                │
        │  🔍 Full Source Code Access        │
        └────────────────────────────────────┘
```

### Outside Repository (Consumption)

```
┌──────────────────────────────────────────────────────────────────┐
│  Developer Working in Shell/Remote App                            │
└──────────────────────────────────────────────────────────────────┘
                          │
                          │ npm install
                          ▼
        ┌────────────────────────────────────┐
        │  @hemantajax/uikit@0.0.1           │
        │  installed in node_modules         │
        └────────────────┬───────────────────┘
                         │
                         │ Import from single package
                         ▼
        ┌────────────────────────────────────┐
        │  import {                          │
        │    LayoutComponent,                │
        │    StorageService,                 │
        │    TruncatePipe                    │
        │  } from '@hemantajax/uikit';       │
        └────────────────┬───────────────────┘
                         │
                         │ used in
                         ▼
        ┌────────────────────────────────────┐
        │  shell/src/app/...                 │
        │  remote1/src/app/...               │
        └────────────────┬───────────────────┘
                         │
                         │ ng serve / nx serve
                         ▼
        ┌────────────────────────────────────┐
        │  Production Application            │
        │  📦 Optimized Bundle               │
        │  🌳 Tree-shakable                  │
        └────────────────────────────────────┘
```

---

## 🔀 Import Path Resolution

### Inside Repository

```typescript
// Your code in uilab app
import { HeaderComponent } from '@mfe-uikit/layout';

// TypeScript resolves via tsconfig.base.json
{
  "paths": {
    "@mfe-uikit/layout": ["libs/layout/src/index.ts"]
  }
}

// Result: Direct access to source
└─> libs/layout/src/index.ts
    └─> libs/layout/src/lib/header/header.component.ts
```

### Outside Repository

```typescript
// Your code in shell app
import { HeaderComponent } from '@hemantajax/uikit';

// Node resolves via node_modules
└─> node_modules/@hemantajax/uikit/
    └─> index.d.ts (type definitions)
    └─> fesm2022/hemantajax-uikit.mjs (bundled code)
```

---

## 📂 File Structure Comparison

### Development (Inside Repo)

```
mfe-uikit/
├── libs/
│   ├── layout/
│   │   └── src/
│   │       ├── index.ts               ← Export point
│   │       └── lib/
│   │           └── header/
│   │               ├── header.component.ts
│   │               ├── header.component.html
│   │               └── header.component.css
│   │
│   └── components/
│       └── src/
│           ├── index.ts               ← Export point
│           └── lib/
│               └── button/
│                   ├── button.component.ts
│                   └── ...
│
└── apps/
    └── uilab/
        └── src/
            └── app/
                └── app.component.ts
                    // import { HeaderComponent } from '@mfe-uikit/layout';
```

### Published Package (Outside Repo)

```
node_modules/@hemantajax/uikit/
├── index.d.ts                 ← Type definitions (entry point)
├── package.json               ← Package metadata
├── README.md
├── esm2022/                   ← ES2022 format
│   └── ...
├── fesm2022/                  ← Flattened ES2022 (main bundle)
│   └── hemantajax-uikit.mjs
└── lib/                       ← Type definitions for each module
    ├── layout/
    ├── components/
    └── ...
```

---

## 🚀 Build and Publish Flow

```
┌──────────────────────────────────────────────────────────────────┐
│  Step 1: Make Changes to Internal Libraries                      │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  Step 2: Test in uilab Demo App                                  │
│  $ nx serve uilab                                                 │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  Step 3: Build UIKit Package                                     │
│  $ nx build uikit --configuration=production                      │
│                                                                    │
│  Process:                                                         │
│  1. ng-packagr bundles all internal libraries                    │
│  2. Creates Angular package format (APF)                         │
│  3. Generates type definitions (.d.ts)                           │
│  4. Creates multiple module formats (ESM2022, FESM2022)          │
│  5. Outputs to dist/libs/uikit/                                  │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  Step 4: (Optional) Test Locally with npm link                   │
│  $ cd dist/libs/uikit && npm link                                 │
│  $ cd /path/to/shell-app && npm link @hemantajax/uikit           │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  Step 5: Publish to npm/GitHub Packages                          │
│  $ cd dist/libs/uikit                                             │
│  $ npm publish                                                    │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│  Step 6: Install in Consumer Apps                                │
│  $ npm install @hemantajax/uikit@latest                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Benefits Visualized

### Single Package Approach

```
┌─────────────────────────────────────────────────────────────┐
│  Without UIKit Approach (Multi-Package)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  npm install @hemantajax/layout                              │
│  npm install @hemantajax/components                          │
│  npm install @hemantajax/services                            │
│  npm install @hemantajax/core                                │
│  npm install @hemantajax/pipes                               │
│  npm install @hemantajax/directives                          │
│  npm install @hemantajax/utils                               │
│  npm install @hemantajax/constants                           │
│  npm install @hemantajax/styles                              │
│                                                               │
│  😫 9 packages to manage                                     │
│  😫 9 versions to track                                      │
│  😫 9 potential version conflicts                            │
└─────────────────────────────────────────────────────────────┘

                          VS

┌─────────────────────────────────────────────────────────────┐
│  With UIKit Approach (Single Package)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  npm install @hemantajax/uikit                               │
│                                                               │
│  ✅ 1 package to manage                                      │
│  ✅ 1 version to track                                       │
│  ✅ No version conflicts                                     │
│  ✅ Simple imports                                            │
│  ✅ Easy updates                                              │
└─────────────────────────────────────────────────────────────┘
```

### Development Experience

```
┌─────────────────────────────────────────────────────────────┐
│  Inside Repo (Development)                                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ⚡ Instant compilation                                      │
│  🔍 Jump to source                                           │
│  🐛 Easy debugging                                           │
│  📊 Nx dependency graph                                      │
│  🎯 Affected commands                                        │
│  🔄 Live reload                                              │
│                                                               │
│  Import: @mfe-uikit/components                               │
│  Resolution: Direct source file access                       │
│  Speed: < 1ms (TypeScript path mapping)                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Outside Repo (Consumption)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📦 Single package installation                              │
│  🌳 Tree-shakable imports                                    │
│  🚀 Optimized bundles                                        │
│  📝 Simple imports                                            │
│  🔄 Easy updates                                             │
│  ⚙️ Standard npm workflow                                    │
│                                                               │
│  Import: @hemantajax/uikit                                   │
│  Resolution: node_modules                                    │
│  Speed: Standard npm resolution                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Use Case Examples

### Use Case 1: Adding a New Button Component

```
1. Developer creates component:
   $ nx g component fancy-button --project=components --export

2. Component auto-exported from libs/components/src/index.ts

3. UIKit automatically includes it (re-exports all from components)

4. Test in uilab:
   import { FancyButtonComponent } from '@mfe-uikit/components';

5. Build and publish:
   $ nx build uikit
   $ cd dist/libs/uikit && npm publish

6. Consumers get it automatically:
   import { FancyButtonComponent } from '@hemantajax/uikit';
```

### Use Case 2: Updating a Service

```
1. Developer updates AuthService in libs/services/

2. Test immediately in uilab (no build needed):
   import { AuthService } from '@mfe-uikit/services';

3. Once tested, build and publish:
   $ nx build uikit
   $ npm version patch  # 0.0.1 → 0.0.2
   $ cd dist/libs/uikit && npm publish

4. Consumers update:
   $ npm update @hemantajax/uikit@latest

5. Get the new version of AuthService:
   import { AuthService } from '@hemantajax/uikit';
```

---

## 📚 Related Documentation

- [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md) - Complete guide
- [POLYREPO_UIKIT_APPROACH_CHANGELOG.md](./POLYREPO_UIKIT_APPROACH_CHANGELOG.md) - Recent updates

---

**Created**: October 24, 2025  
**Repository**: https://github.com/hemantajax/mfe-uikit  
**Package**: `@hemantajax/uikit`
