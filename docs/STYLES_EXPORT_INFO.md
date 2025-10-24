# SCSS Styles Export - How It Works

## 🎨 Overview

The `@hemantajax/uikit` package includes **SCSS styles as static assets**, allowing consumers to import and use them in their Angular applications.

---

## 📦 How Styles Are Included

### Build Configuration

**`libs/uikit/ng-package.json`:**

```json
{
  "assets": ["styles/**/*.scss", "styles/**/*.css", "README.md"]
}
```

This configuration tells `ng-packagr` to copy all SCSS files from `libs/uikit/styles/` into the published package.

### Source Location

```
libs/uikit/styles/          ← Source (copied from libs/styles/)
├── abstracts/
├── base/
├── components/
├── layouts/
├── themes/
├── utilities/
├── vendors/
└── main.scss
```

### Published Package Structure

After building and publishing, the package contains:

```
@hemantajax/uikit/
├── fesm2022/               ← Compiled JavaScript
├── index.d.ts              ← TypeScript definitions
├── package.json
└── styles/                 ← SCSS files (as static assets)
    ├── abstracts/
    ├── base/
    ├── components/
    ├── layouts/
    ├── themes/
    ├── utilities/
    ├── vendors/
    └── main.scss
```

---

## 🚀 How Consumers Use Styles

### Option 1: Import Everything

**In consumer's `src/styles.scss`:**

```scss
@import '@hemantajax/uikit/styles/main';
```

**This includes:**

- ✅ Bootstrap 5 framework
- ✅ Custom variables (`$primary-color`, `$spacing-md`, etc.)
- ✅ Mixins (`@include responsive-container`, etc.)
- ✅ Component styles (buttons, cards, forms)
- ✅ Layout utilities (grid, header, footer)
- ✅ Theme support

### Option 2: Import Specific Modules

```scss
// Just the design system
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';
@import '@hemantajax/uikit/styles/vendors/bootstrap';

// Specific components
@import '@hemantajax/uikit/styles/components/buttons';
@import '@hemantajax/uikit/styles/components/cards';
```

### Option 3: Use Variables/Mixins Only

```scss
// Import design tokens
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';

// Build custom styles
.my-component {
  background-color: $primary-color;
  padding: $spacing-md;

  @include responsive-container;
  @include elevation(2);
}
```

---

## 📂 Available Style Modules

### Abstracts (Design Tokens)

```scss
@import '@hemantajax/uikit/styles/abstracts/variables'; // Colors, spacing, typography
@import '@hemantajax/uikit/styles/abstracts/mixins'; // Reusable patterns
@import '@hemantajax/uikit/styles/abstracts/functions'; // SCSS functions
```

**Variables available:**

- `$primary-color`, `$secondary-color`, `$success-color`, etc.
- `$spacing-sm`, `$spacing-md`, `$spacing-lg`, etc.
- `$font-family-base`, `$font-size-base`, etc.
- `$breakpoint-sm`, `$breakpoint-md`, `$breakpoint-lg`, etc.

**Mixins available:**

- `@include responsive-container`
- `@include elevation($level)`
- `@include transition($properties)`
- And more...

### Vendors

```scss
@import '@hemantajax/uikit/styles/vendors/bootstrap'; // Bootstrap 5
```

Includes the complete Bootstrap 5 framework.

### Base Styles

```scss
@import '@hemantajax/uikit/styles/base/reset'; // CSS reset
@import '@hemantajax/uikit/styles/base/typography'; // Typography
@import '@hemantajax/uikit/styles/base/base'; // Base HTML elements
```

### Components

```scss
@import '@hemantajax/uikit/styles/components/buttons';
@import '@hemantajax/uikit/styles/components/cards';
@import '@hemantajax/uikit/styles/components/forms';
@import '@hemantajax/uikit/styles/components/modals';
@import '@hemantajax/uikit/styles/components/navigation';
```

### Layouts

```scss
@import '@hemantajax/uikit/styles/layouts/grid';
@import '@hemantajax/uikit/styles/layouts/header';
@import '@hemantajax/uikit/styles/layouts/footer';
@import '@hemantajax/uikit/styles/layouts/sidebar';
```

### Utilities

```scss
@import '@hemantajax/uikit/styles/utilities/spacing'; // Margin/padding helpers
@import '@hemantajax/uikit/styles/utilities/text'; // Text utilities
@import '@hemantajax/uikit/styles/utilities/display'; // Display/visibility
```

### Themes

```scss
@import '@hemantajax/uikit/styles/themes/default'; // Default theme
```

---

## ⚙️ Angular Configuration

### angular.json Setup

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss"  ← Your main SCSS file
            ]
          }
        }
      }
    }
  }
}
```

### src/styles.scss

```scss
// Import UIKit styles
@import '@hemantajax/uikit/styles/main';

// Your custom styles
.my-app-specific-styles {
  // ...
}
```

---

## 🔧 How It Works Technically

1. **Development (in this repo)**:

   - Styles are in `libs/styles/src/`
   - Copied to `libs/uikit/styles/` during setup

2. **Build**:

   - `nx build uikit` runs
   - `ng-packagr` processes the library
   - Assets (SCSS files) are copied to `dist/libs/uikit/styles/`

3. **Publish**:

   - `npm publish` from `dist/libs/uikit/`
   - Package uploaded to npm with styles folder

4. **Consumer Install**:

   - `npm install @hemantajax/uikit`
   - Package installed to `node_modules/@hemantajax/uikit/`
   - Styles available at `node_modules/@hemantajax/uikit/styles/`

5. **SCSS Compilation**:
   - Angular's build process compiles consumer's `styles.scss`
   - `@import '@hemantajax/uikit/styles/main'` resolves to `node_modules/@hemantajax/uikit/styles/main.scss`
   - SCSS compiler processes the imports

---

## ✅ Benefits

1. **No Build Step Required**: SCSS files are raw source, allowing customization
2. **Tree-shakable**: Import only what you need
3. **Themeable**: Override variables before importing
4. **Standard Practice**: Same pattern as Material, PrimeNG, etc.
5. **Version Controlled**: Styles version matches package version

---

## 🎯 Example: Full Setup

**1. Install package:**

```bash
npm install @hemantajax/uikit@latest
```

**2. Import in `src/styles.scss`:**

```scss
// Override variables (optional)
$primary-color: #your-color;

// Import UIKit styles
@import '@hemantajax/uikit/styles/main';

// Your custom styles
.app-specific {
  color: $primary-color; // Uses your override or UIKit default
}
```

**3. Use TypeScript components:**

```typescript
import { LayoutComponent } from '@hemantajax/uikit';
```

**4. Build your app:**

```bash
ng build
# or
nx build
```

SCSS will be compiled with all UIKit styles included!

---

**Document Version**: 1.0  
**Last Updated**: October 24, 2025  
**Related**: [PUBLISHING_GUIDE.md](./PUBLISHING_GUIDE.md)
