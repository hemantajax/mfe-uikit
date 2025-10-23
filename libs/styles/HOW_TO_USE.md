# How to Use the Shared Styles Library

## 🎯 Current Setup

The shared styles library is **minimally configured** to work with **Bootstrap 5** out of the box. Most custom styles are **commented out** because Bootstrap already provides comprehensive styling.

## ✅ What's Active

Currently, only these imports are active in `main.scss`:

1. **Abstracts** (Variables, Functions, Mixins)

   - CSS custom properties for easy theming
   - Utility functions (rem(), spacing(), etc.)
   - Helpful mixins (flex-center, text-truncate, etc.)

2. **Bootstrap 5**
   - Complete Bootstrap 5 framework
   - All components and utilities
   - Grid system, typography, forms, buttons, etc.

## 🎨 Using Bootstrap 5

You can use all Bootstrap 5 features immediately:

### Examples

```html
<!-- Bootstrap Grid -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Column 1</div>
    <div class="col-md-6">Column 2</div>
  </div>
</div>

<!-- Bootstrap Buttons -->
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outline-secondary">Outline Button</button>

<!-- Bootstrap Cards -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<!-- Bootstrap Forms -->
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com" />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

<!-- Bootstrap Utilities -->
<div class="d-flex justify-content-between align-items-center p-4 bg-light rounded shadow-sm">
  <span class="text-primary fw-bold">Left</span>
  <span class="text-muted">Right</span>
</div>
```

## 🔓 Uncommenting Custom Styles

When you need additional custom styles, uncomment them in `main.scss`:

### To Enable Custom Components

Open `libs/shared/styles/src/main.scss` and uncomment what you need:

```scss
// Uncomment for custom button styles beyond Bootstrap
@import 'components/buttons';

// Uncomment for custom card styles
@import 'components/cards';

// Uncomment for custom form styling
@import 'components/forms';

// Uncomment for custom modal styling
@import 'components/modals';

// Uncomment for custom navigation
@import 'components/navigation';
```

### To Enable Custom Layouts

```scss
// Uncomment for custom grid system (in addition to Bootstrap)
@import 'layouts/grid';

// Uncomment for header component
@import 'layouts/header';

// Uncomment for footer component
@import 'layouts/footer';

// Uncomment for sidebar component
@import 'layouts/sidebar';
```

### To Enable Utilities

```scss
// Uncomment for additional spacing utilities
@import 'utilities/spacing';

// Uncomment for additional text utilities
@import 'utilities/text';

// Uncomment for additional display utilities
@import 'utilities/display';
```

### To Enable Theme Support

```scss
// Uncomment for light/dark theme switching
@import 'themes/default';
```

## 🎨 Using CSS Custom Properties

The CSS variables are always available:

```scss
// In your component SCSS
.my-component {
  padding: var(--spacing-4);
  color: var(--color-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}
```

## 🔧 Using Mixins

The mixins are always available:

```scss
// In your component SCSS
.my-responsive-component {
  padding: var(--spacing-4);

  @include respond-to('md') {
    padding: var(--spacing-6);
  }

  &__title {
    @include text-truncate;
  }

  &__content {
    @include flex-between;
  }
}
```

## 📚 Available CSS Variables

```scss
// Colors
var(--color-primary)      // #0d6efd
var(--color-secondary)    // #6c757d
var(--color-success)      // #198754
var(--color-danger)       // #dc3545
var(--color-white)        // #ffffff
var(--color-gray-100) to var(--color-gray-900)

// Spacing (8px base system)
var(--spacing-0) to var(--spacing-8)
// 0, 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px

// Typography
var(--font-family-base)
var(--font-size-sm)       // 0.875rem
var(--font-size-base)     // 1rem
var(--font-size-lg)       // 1.25rem
var(--font-weight-normal) // 400
var(--font-weight-bold)   // 700

// Borders & Shadows
var(--border-radius)
var(--shadow-sm)
var(--shadow)
var(--shadow-lg)

// And more... see abstracts/_variables.scss
```

## 🎯 Recommended Approach

1. **Start with Bootstrap** - Use Bootstrap classes for everything
2. **Use CSS variables** - For colors, spacing, etc.
3. **Uncomment as needed** - Only enable custom styles when Bootstrap isn't enough
4. **Keep it minimal** - Less custom code = easier maintenance

## 📖 Bootstrap 5 Resources

- **Official Docs**: https://getbootstrap.com/docs/5.3/
- **Components**: https://getbootstrap.com/docs/5.3/components/
- **Utilities**: https://getbootstrap.com/docs/5.3/utilities/
- **Grid**: https://getbootstrap.com/docs/5.3/layout/grid/
- **Forms**: https://getbootstrap.com/docs/5.3/forms/overview/

## 🌟 Bootswatch Themes

To use a Bootswatch theme, edit `libs/shared/styles/src/vendors/_bootstrap.scss`:

```scss
// Uncomment and choose a theme:
@import 'bootswatch/dist/flatly/bootswatch';
// @import 'bootswatch/dist/darkly/bootswatch';
// @import 'bootswatch/dist/cyborg/bootswatch';
// @import 'bootswatch/dist/lux/bootswatch';
```

Available themes at: https://bootswatch.com/

## 🚀 Quick Start Example

```html
<!-- app.component.html -->
<div class="container py-5">
  <!-- Using Bootstrap classes -->
  <h1 class="display-4 mb-4">Welcome to My App</h1>

  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-primary">Feature 1</h5>
          <p class="card-text">Description here</p>
          <button class="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-primary">Feature 2</h5>
          <p class="card-text">Description here</p>
          <button class="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-primary">Feature 3</h5>
          <p class="card-text">Description here</p>
          <button class="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

This will work immediately with beautiful Bootstrap styling!

## 💡 When to Uncomment Custom Styles

Uncomment custom components when:

- You need a specific design that Bootstrap doesn't provide
- You want consistent custom styling across all apps
- You need BEM-style class names for better organization
- Bootstrap's styling doesn't match your design requirements

## ✅ Summary

- ✅ Bootstrap 5 is ready to use
- ✅ CSS variables are available
- ✅ Mixins are available
- ⏸️ Custom components are commented (uncomment as needed)
- ⏸️ Custom layouts are commented (uncomment as needed)
- ⏸️ Custom utilities are commented (uncomment as needed)

**Start coding with Bootstrap classes and uncomment custom styles only when needed!**
