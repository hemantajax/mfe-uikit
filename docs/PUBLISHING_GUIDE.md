# Publishing UIKit Package to npm

## 📦 Complete Guide to Publishing @hemantajax/uikit

This guide covers everything you need to publish the UIKit package to npm or GitHub Packages.

---

## 🎯 Overview

**Package Name**: `@hemantajax/uikit`  
**Current Version**: `0.0.1`  
**Registry Options**:

- npmjs.com (public npm registry)
- GitHub Packages (private/public)

---

## 🚀 Quick Publish (TL;DR)

```bash
# Very first time: Login to npm
npm login

# 1. Update version
cd libs/uikit
npm version patch  # or minor, or major
cd ../..

# 2. Build
nx build uikit --configuration=production

# 3. Publish (with --access public for scoped packages)
cd dist/libs/uikit
npm publish --access public
```

⚠️ **Important**: Scoped packages like `@hemantajax/uikit` require `--access public` flag to publish for free. Without it, you'll get a **402 Payment Required** error.

**Note**: very first time `npm login`, you only need steps #2-3

---

## 📋 Pre-Publishing Checklist

### 1. ✅ Update Package Metadata

Edit `libs/uikit/package.json`:

```json
{
  "name": "@hemantajax/uikit",
  "version": "0.0.1",
  "description": "Complete UI Kit for Micro-Frontend applications - includes layout, components, services, and utilities",
  "keywords": ["angular", "angular20", "micro-frontend", "module-federation", "ui-kit", "components", "services", "bootstrap", "uikit"],
  "author": "Hemant",
  "license": "MIT",
  "homepage": "https://github.com/hemantajax/mfe-uikit#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hemantajax/mfe-uikit.git"
  },
  "bugs": {
    "url": "https://github.com/hemantajax/mfe-uikit/issues"
  },
  "peerDependencies": {
    "@angular/common": "^20.3.0",
    "@angular/core": "^20.3.0",
    "@angular/router": "^20.3.0",
    "bootstrap": "^5.3.0"
  },
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  }
}
```

### 2. ✅ Create README for Package

The `libs/uikit/README.md` is already created and includes:

- Installation instructions
- TypeScript component imports
- SCSS styles import examples
- Complete feature list
- Documentation links

This README will be automatically included in the published package.

### 3. ✅ Test Build Locally

```bash
# Build the package
nx build uikit --configuration=production

# Verify output
ls -la dist/libs/uikit/

# Check package contents
cd dist/libs/uikit
npm pack --dry-run
```

---

## 🌐 Option 1: Publish to npmjs.com (Public Registry)

### Step 1: Create npm Account

If you don't have an account:

1. Go to https://www.npmjs.com/signup
2. Create account with username `hemantajax`
3. Verify your email

### Step 2: Login to npm

```bash
npm login

# Enter credentials:
# Username: hemantajax
# Password: your-password
# Email: your-email@example.com
```

### Step 3: Configure Package for npm

Update `libs/uikit/package.json` with `publishConfig`:

```json
{
  "name": "@hemantajax/uikit",
  "version": "0.0.1",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

⚠️ **Critical**: The `"access": "public"` is **required** for scoped packages on free npm accounts. Without this, you'll get a **402 Payment Required** error.

### Step 4: Build and Publish

```bash
# Build
nx build uikit --configuration=production

# Navigate to dist
cd dist/libs/uikit

# Publish
npm publish --access public

# If scoped package is private
npm publish --access restricted
```

### Step 5: Verify Publication

```bash
# View your package
npm view @hemantajax/uikit

# Or visit
# https://www.npmjs.com/package/@hemantajax/uikit
```

---

## 🔐 Option 2: Publish to GitHub Packages

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: `npm-publish-token`
4. Select scopes:
   - ✅ `write:packages` (to publish)
   - ✅ `read:packages` (to download)
   - ✅ `delete:packages` (to delete versions)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Configure Authentication

Create/update `.npmrc` in your home directory (`~/.npmrc`):

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or set as environment variable:

```bash
export NPM_TOKEN=your_github_token

# Add to .npmrc
echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
```

### Step 3: Configure Package for GitHub Packages

Update `libs/uikit/package.json`:

```json
{
  "name": "@hemantajax/uikit",
  "version": "0.0.1",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@hemantajax",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hemantajax/mfe-uikit.git"
  }
}
```

### Step 4: Build and Publish

```bash
# Build
nx build uikit --configuration=production

# Navigate to dist
cd dist/libs/uikit

# Publish
npm publish

# If you get authentication errors, try:
npm publish --registry=https://npm.pkg.github.com
```

### Step 5: Verify Publication

1. Go to your GitHub repository
2. Click on "Packages" tab (right side)
3. You should see `@hemantajax/uikit`

Or visit: `https://github.com/hemantajax/mfe-uikit/packages`

---

## 🔄 Version Management

### Semantic Versioning

Follow semantic versioning (semver): `MAJOR.MINOR.PATCH`

```bash
cd libs/uikit

# Patch release (bug fixes): 0.0.1 → 0.0.2
npm version patch

# Minor release (new features): 0.0.1 → 0.1.0
npm version minor

# Major release (breaking changes): 0.0.1 → 1.0.0
npm version major

# Pre-release versions
npm version prerelease --preid=alpha  # 0.0.1 → 0.0.2-alpha.0
npm version prerelease --preid=beta   # 0.0.1 → 0.0.2-beta.0

cd ../..
```

### Version Guidelines

| Version Type | When to Use                        | Example       |
| ------------ | ---------------------------------- | ------------- |
| **Patch**    | Bug fixes, documentation updates   | 0.0.1 → 0.0.2 |
| **Minor**    | New features (backward compatible) | 0.0.1 → 0.1.0 |
| **Major**    | Breaking changes                   | 0.0.1 → 1.0.0 |
| **Alpha**    | Early testing                      | 0.0.2-alpha.0 |
| **Beta**     | Feature complete, testing          | 0.0.2-beta.0  |
| **RC**       | Release candidate                  | 0.1.0-rc.0    |

---

## 🤖 Automated Publishing with GitHub Actions

### Create Workflow File

Create `.github/workflows/publish.yml`:

```yaml
name: Publish UIKit Package

on:
  release:
    types: [created]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to publish (leave empty for current)'
        required: false

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

      - name: Build uikit package
        run: npx nx build uikit --configuration=production

      - name: Publish to GitHub Packages
        run: |
          cd dist/libs/uikit
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # Uncomment to also publish to npmjs.com
      # - name: Setup Node.js for npm
      #   uses: actions/setup-node@v4
      #   with:
      #     node-version: '20'
      #     registry-url: 'https://registry.npmjs.org'
      #
      # - name: Publish to npm
      #   run: |
      #     cd dist/libs/uikit
      #     npm publish --access public
      #   env:
      #     NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Trigger Publishing

**Option A: Create a GitHub Release**

```bash
git tag v0.0.1
git push origin v0.0.1

# Or create release via GitHub UI
# Releases → Create a new release → Choose tag → Publish
```

**Option B: Manual Trigger**

1. Go to Actions tab in GitHub
2. Select "Publish UIKit Package"
3. Click "Run workflow"

---

## 📥 Installing and Using the Published Package

### Installation

**From npmjs.com:**

```bash
npm install @hemantajax/uikit@latest

# Or specific version
npm install @hemantajax/uikit@0.0.1
```

**From GitHub Packages:**

**Step 1: Create `.npmrc` in consumer project:**

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**Step 2: Install:**

```bash
npm install @hemantajax/uikit@latest
```

---

### Using TypeScript Components and Services

Import Angular components, services, pipes, directives, etc. from the package:

```typescript
// In your Angular component
import { Component } from '@angular/core';
import {
  LayoutComponent, // Layout components
  ButtonComponent, // UI components
  StorageService, // Services
  TruncatePipe, // Pipes
  HighlightDirective, // Directives
  API_BASE_URL, // Constants
} from '@hemantajax/uikit';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ButtonComponent, TruncatePipe, HighlightDirective],
  template: `
    <lib-layout>
      <h1>{{ title | truncate : 20 }}</h1>
      <lib-button>Click me</lib-button>
    </lib-layout>
  `,
})
export class AppComponent {
  constructor(private storage: StorageService) {
    console.log('API URL:', API_BASE_URL);
  }
}
```

---

### Using SCSS Styles

The package includes a **complete SCSS library** with Bootstrap 5 integration.

#### How Styles Are Exported

The styles are **included as static assets** in the published package:

```
@hemantajax/uikit/
├── fesm2022/          (compiled JavaScript)
├── index.d.ts         (TypeScript definitions)
├── package.json
└── styles/            ← SCSS files included!
    ├── abstracts/     (variables, mixins, functions)
    ├── base/          (reset, typography)
    ├── components/    (buttons, cards, forms, modals)
    ├── layouts/       (grid, header, footer, sidebar)
    ├── themes/        (theme configurations)
    ├── utilities/     (spacing, text, display)
    ├── vendors/       (Bootstrap 5)
    └── main.scss      (main entry point)
```

#### Option 1: Import All Styles (Recommended)

In your Angular app's `src/styles.scss` or `src/styles.global.scss`:

```scss
// Import everything (includes Bootstrap 5 + all custom styles)
@import '@hemantajax/uikit/styles/main';
```

This single import includes:

- ✅ Bootstrap 5 framework
- ✅ Custom variables and mixins
- ✅ Component styles
- ✅ Layout utilities
- ✅ Theme support

#### Option 2: Import Specific Modules

Import only what you need:

```scss
// Import just the essentials
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';
@import '@hemantajax/uikit/styles/vendors/bootstrap';

// Add specific component styles
@import '@hemantajax/uikit/styles/components/buttons';
@import '@hemantajax/uikit/styles/components/cards';
```

#### Option 3: Use Variables and Mixins Only

Perfect for building on top of the design system:

```scss
// Import design tokens
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';

// Use variables in your custom styles
.my-custom-component {
  background-color: $primary-color;
  padding: $spacing-md;

  @include responsive-container;
}
```

#### Available Style Modules

```
@hemantajax/uikit/styles/
├── abstracts/
│   ├── _variables.scss   → Colors, spacing, typography variables
│   ├── _mixins.scss      → Reusable style patterns
│   └── _functions.scss   → SCSS utility functions
├── base/
│   ├── _reset.scss       → CSS reset/normalize
│   ├── _typography.scss  → Font and text styles
│   └── _base.scss        → Base HTML element styles
├── components/
│   ├── _buttons.scss     → Button styles
│   ├── _cards.scss       → Card component styles
│   ├── _forms.scss       → Form element styles
│   ├── _modals.scss      → Modal/dialog styles
│   └── _navigation.scss  → Navigation/menu styles
├── layouts/
│   ├── _grid.scss        → Grid system
│   ├── _header.scss      → Header layout
│   ├── _footer.scss      → Footer layout
│   └── _sidebar.scss     → Sidebar layout
├── themes/
│   └── _default.scss     → Default theme configuration
├── utilities/
│   ├── _spacing.scss     → Margin/padding utilities
│   ├── _text.scss        → Text utilities
│   └── _display.scss     → Display/visibility utilities
├── vendors/
│   └── _bootstrap.scss   → Bootstrap 5 integration
└── main.scss             → Main entry (imports everything)
```

#### Configuration in angular.json

Make sure your `angular.json` includes the styles:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss" // Your main styles file with @import
            ]
          }
        }
      }
    }
  }
}
```

---

## 🔍 Troubleshooting

### Error: 402 Payment Required - You must sign up for private packages

**This is the most common error!**

```
npm error code E402
npm error 402 Payment Required - You must sign up for private packages
```

**Cause**: Scoped packages (like `@hemantajax/uikit`) are treated as **private by default** by npm, which requires a paid account.

**Solution 1: Add --access public flag**

```bash
npm publish --access public
```

**Solution 2: Add to package.json (recommended)**

Edit `libs/uikit/package.json`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

Then just run:

```bash
npm publish
```

**Why this happens**: npm assumes all scoped packages (`@username/package`) are private unless explicitly marked public. Unscoped packages are public by default.

---

### Error: 403 Forbidden

**Cause**: Authentication issue or lack of permissions

**Solution**:

```bash
# Re-login to npm
npm logout
npm login

# Or check your .npmrc
cat ~/.npmrc

# For GitHub Packages, regenerate token with correct scopes
```

### Error: Package already exists

**Cause**: Version already published

**Solution**:

```bash
# Update version
cd libs/uikit
npm version patch
cd ../..

# Build and publish again
nx build uikit --configuration=production
cd dist/libs/uikit && npm publish
```

### Error: ENEEDAUTH

**Cause**: Not authenticated

**Solution**:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@hemantajax
```

### Error: Cannot publish over existing version

**Cause**: You're trying to publish the same version twice

**Solution**:

```bash
# Increment version
cd libs/uikit
npm version patch  # or minor, or major
cd ../..

# Build and publish
nx build uikit --configuration=production
cd dist/libs/uikit && npm publish
```

### Build Errors

**Check these files**:

```bash
# Verify configuration
cat libs/uikit/ng-package.json
cat libs/uikit/project.json
cat libs/uikit/tsconfig.lib.json

# Check dependencies
nx graph
```

---

## 🎯 Publishing Checklist

### Before Publishing

- [ ] All tests pass: `nx test uikit`
- [ ] No linting errors: `nx lint uikit`
- [ ] Version updated in `libs/uikit/package.json`
- [ ] `README.md` is up to date
- [ ] `CHANGELOG.md` updated (if you maintain one)
- [ ] All changes committed to git
- [ ] Build successful: `nx build uikit --configuration=production`

### During Publishing

- [ ] Logged into npm/GitHub
- [ ] Registry configured correctly
- [ ] Package built in production mode
- [ ] Dry-run successful: `npm publish --dry-run`
- [ ] Actual publish executed: `npm publish`

### After Publishing

- [ ] Package visible on npm/GitHub
- [ ] Can view package: `npm view @hemantajax/uikit`
- [ ] Can install in test project
- [ ] Imports work correctly
- [ ] Tag created in git: `git tag v0.0.1 && git push origin v0.0.1`
- [ ] Release notes created on GitHub (optional)
- [ ] Documentation updated

---

## 📊 Monitoring Your Package

### View Package Stats

**On npmjs.com:**

- Downloads: https://www.npmjs.com/package/@hemantajax/uikit
- Weekly downloads: `npm view @hemantajax/uikit --json`

**On GitHub Packages:**

- Go to repository → Packages tab
- View download statistics

### Update Package Info

```bash
# View current package info
npm view @hemantajax/uikit

# View all versions
npm view @hemantajax/uikit versions

# View latest version
npm view @hemantajax/uikit version

# View package.json
npm view @hemantajax/uikit --json
```

---

## 🗑️ Unpublishing / Deprecating

### Unpublish a Version

```bash
# Unpublish specific version (within 72 hours)
npm unpublish @hemantajax/uikit@0.0.1

# Unpublish entire package (use with caution!)
npm unpublish @hemantajax/uikit --force
```

**⚠️ Warning**: Unpublishing is permanent and can break dependent projects!

### Deprecate Instead

```bash
# Deprecate a version (better than unpublishing)
npm deprecate @hemantajax/uikit@0.0.1 "This version has critical bugs. Please upgrade to 0.0.2"

# Deprecate all versions
npm deprecate @hemantajax/uikit "*" "Package is no longer maintained"
```

---

## 🔐 Security Best Practices

### 1. Use Access Tokens (Not Passwords)

```bash
# Set token in environment
export NPM_TOKEN=your_token

# Use in CI/CD
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
```

### 2. Enable 2FA on npm Account

1. Go to https://www.npmjs.com/settings/profile
2. Enable Two-Factor Authentication
3. Choose "Authorization" mode (requires OTP for publish)

### 3. Review Package Contents

```bash
# Before publishing, check what will be included
cd dist/libs/uikit
npm pack --dry-run

# Verify no sensitive files
tar -tzf hemantajax-uikit-0.0.1.tgz
```

### 4. Use .npmignore

Create `libs/uikit/.npmignore`:

```
# Source files
src/
*.ts
!*.d.ts

# Tests
*.spec.ts
test-setup.ts
jest.config.ts
tsconfig.spec.json

# Development files
.editorconfig
.gitignore
eslint.config.mjs
```

---

## 📚 Additional Resources

### Official Documentation

- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Semantic Versioning](https://semver.org/)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)

### Related Docs in This Repository

- [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md) - Architecture guide
- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [ARCHITECTURE_VISUAL_GUIDE.md](./ARCHITECTURE_VISUAL_GUIDE.md) - Visual architecture

---

## 🎉 Summary

### Quick Publishing Commands

**Publishing to npmjs.com:**

```bash
npm login
nx build uikit --configuration=production
cd dist/libs/uikit && npm publish --access public
```

**Publishing to GitHub Packages:**

```bash
# Set token in ~/.npmrc
nx build uikit --configuration=production
cd dist/libs/uikit && npm publish
```

**Updating Version:**

```bash
cd libs/uikit && npm version patch && cd ../..
```

**Automated with GitHub Actions:**

- Create release on GitHub
- Workflow auto-publishes

---

### What Gets Published

Your published package includes:

1. **TypeScript Components** - All Angular components, services, pipes, directives, utils, constants

   - Import: `import { Component } from '@hemantajax/uikit';`

2. **SCSS Styles** - Complete style library with Bootstrap 5

   - Import: `@import '@hemantajax/uikit/styles/main';`
   - Available modules: abstracts, base, components, layouts, themes, utilities, vendors

3. **Type Definitions** - Full TypeScript support with `.d.ts` files

4. **README** - Package documentation on npm

---

### Using the Package

**Install:**

```bash
npm install @hemantajax/uikit@latest
```

**Use TypeScript:**

```typescript
import { LayoutComponent, StorageService } from '@hemantajax/uikit';
```

**Use SCSS:**

```scss
@import '@hemantajax/uikit/styles/main'; // Everything
// OR
@import '@hemantajax/uikit/styles/abstracts/variables'; // Specific modules
```

---

**Happy Publishing! 🚀**

**Document Version**: 1.1  
**Last Updated**: October 24, 2025  
**Repository**: https://github.com/hemantajax/mfe-uikit
