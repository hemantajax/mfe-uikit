# Architecture Issue and Solution

## 🚨 Problem Discovered

The current architecture has a **fundamental issue** with how Angular libraries and ng-packagr work.

### What We Tried

```typescript
// libs/uikit/src/lib/components/components.ts
export * from '@mfe-uikit/components';  ← Doesn't work with ng-packagr!
```

### Why It Fails

**ng-packagr cannot resolve TypeScript path mappings** during build. It expects:

1. Either actual implementation code
2. Or external npm packages as peer dependencies

---

## 🎯 The Correct Architecture (Two Options)

### Option 1: Single Library Approach (Recommended)

**Concept**: Develop everything directly in the `uikit` library. No separate internal libraries.

```
libs/
└── uikit/                          ← Everything here!
    └── src/
        ├── components/
        │   ├── button/
        │   ├── card/
        │   └── index.ts
        ├── services/
        │   ├── storage/
        │   ├── auth/
        │   └── index.ts
        ├── pipes/
        ├── directives/
        └── index.ts                ← Exports everything
```

**Pros:**

- ✅ Simple to build and publish
- ✅ No path mapping issues
- ✅ Still organized by domain

**Cons:**

- ❌ Lose separate library structure
- ❌ Can't use Nx affected commands on individual domains

---

### Option 2: Buildable Libraries with Dependency Chain

**Concept**: Make all internal libraries buildable, build them first, then have uikit depend on the built output.

```typescript
// libs/uikit/project.json
{
  "targets": {
    "build": {
      "dependsOn": [
        {
          "projects": [
            "components",
            "services",
            "layout",
            // ... all others
          ],
          "target": "build"
        }
      ]
    }
  }
}
```

Then uikit would import from built node_modules or dist folders.

**Pros:**

- ✅ Keep separate library structure
- ✅ Nx affected commands work

**Cons:**

- ❌ More complex build process
- ❌ Each library needs build configuration
- ❌ Still doesn't solve the re-export issue directly

---

### Option 3: Copy Source Files Approach (Current - Needs Fix)

**Concept**: Copy actual TypeScript source files from internal libraries into uikit before building.

**Implementation**: Create a pre-build script that copies files:

```bash
# pre-build.sh
cp -r libs/components/src/lib/* libs/uikit/src/lib/components/
cp -r libs/services/src/lib/* libs/uikit/src/lib/services/
# ... etc
```

Then build uikit with actual implementation files.

**Pros:**

- ✅ Keep development organization
- ✅ Single publishable package
- ✅ No build dependencies needed

**Cons:**

- ❌ Need to run copy script before each build
- ❌ Duplicated code during development
- ❌ Must remember to sync changes

---

## 💡 Recommended Solution: **Option 1** (Single Library)

For a UI Kit package, **Option 1 is simplest and most maintainable**.

### Implementation Steps:

1. **Move all real code into `libs/uikit/src/lib/`**

   - Copy actual implementations from `libs/components/`, `libs/services/`, etc.
   - Delete the separate library folders

2. **Organize by domain within uikit**

   ```
   libs/uikit/src/lib/
   ├── components/
   │   ├── button/
   │   │   ├── button.component.ts
   │   │   ├── button.component.html
   │   │   └── button.component.scss
   │   ├── card/
   │   └── index.ts          ← export * from './button/...'
   ├── services/
   │   ├── storage.service.ts
   │   ├── auth.service.ts
   │   └── index.ts
   ├── pipes/
   ├── directives/
   └── utils/
   ```

3. **Main index.ts exports everything**
   ```typescript
   // libs/uikit/src/index.ts
   export * from './lib/components';
   export * from './lib/services';
   export * from './lib/pipes';
   // ...
   ```

---

## 🔄 Quick Fix for Current Setup

If you want to keep the separate libraries for now, here's a **temporary workaround**:

### Create a pre-build script

**`libs/uikit/scripts/copy-sources.sh`:**

```bash
#!/bin/bash

# Copy actual TypeScript files from internal libraries
echo "Copying source files..."

# Components
cp -r ../../components/src/lib/* ../src/lib/components/ 2>/dev/null || true

# Services
cp -r ../../services/src/lib/* ../src/lib/services/ 2>/dev/null || true

# Layout
cp -r ../../layout/src/lib/* ../src/lib/layout/ 2>/dev/null || true

# Core
cp -r ../../core/src/lib/* ../src/lib/core/ 2>/dev/null || true

# Pipes
cp -r ../../pipes/src/lib/* ../src/lib/pipes/ 2>/dev/null || true

# Directives
cp -r ../../directives/src/lib/* ../src/lib/directives/ 2>/dev/null || true

# Utils
cp -r ../../utils/src/lib/* ../src/lib/utils/ 2>/dev/null || true

# Constants
cp -r ../../constants/src/lib/* ../src/lib/constants/ 2>/dev/null || true

echo "Source files copied successfully!"
```

### Update package.json scripts:

```json
{
  "scripts": {
    "build:uikit": "cd libs/uikit/scripts && bash copy-sources.sh && cd ../../.. && nx build uikit --configuration=production"
  }
}
```

---

## ⚠️ Current Status

**The build is failing** because:

- ❌ The re-export files use path mappings that ng-packagr can't resolve
- ❌ No actual implementation code exists in `libs/uikit/src/lib/`
- ❌ The internal libraries have the real code but aren't being bundled

**To fix immediately**, you need to either:

1. Adopt **Option 1** (move everything into uikit)
2. Implement the **copy sources script** approach
3. Manually copy files for now and rebuild

---

## 🎯 My Recommendation

**Go with Option 1 - Single Library Approach**

Why:

- ✅ Cleanest solution for a published UI Kit
- ✅ No build complexity
- ✅ Still well-organized by domain
- ✅ Exactly how most UI libraries work (Material, PrimeNG, etc.)
- ✅ What you originally intended with the "single package" approach

The separate internal libraries were creating unnecessary complexity. A UI Kit should be developed as a single library with internal organization.

---

**Do you want me to implement Option 1 (recommended) or set up the copy script (temporary fix)?**
