# Shared Styles Library

A comprehensive, scalable, and optimized shared styles library following the **7 Principles of Clean and Optimized CSS**.

## 🚀 Quick Start

**The library is already configured with Bootstrap 5!** Most custom styles are commented out since Bootstrap provides comprehensive styling.

**👉 Start here: [HOW_TO_USE.md](./HOW_TO_USE.md)** for a quick guide to using Bootstrap and uncommenting custom styles as needed.

## 🎯 The 7 Principles

### 1. **Consistent Naming Convention (BEM)**

We use the BEM (Block Element Modifier) methodology throughout the codebase:

```scss
.block {
}
.block__element {
}
.block--modifier {
}
```

### 2. **Logical Structure & Organization**

```
styles/
├── abstracts/       # Variables, Functions, Mixins
├── base/           # Reset, Typography, Base styles
├── components/     # Reusable UI components
├── layouts/        # Layout components (Grid, Header, etc.)
├── themes/         # Theme configurations
├── utilities/      # Helper classes
└── vendors/        # Third-party styles (Bootstrap)
```

### 3. **Low Specificity**

- Use single classes instead of nested selectors
- Avoid IDs for styling
- Keep specificity flat and predictable

### 4. **DRY Principle (Don't Repeat Yourself)**

- Reusable mixins and functions
- CSS custom properties for shared values
- Modular component architecture

### 5. **CSS Variables for Theming**

```scss
:root {
  --color-primary: #0d6efd;
  --spacing-4: 1rem;
  --border-radius: 0.375rem;
}
```

### 6. **Modularization**

- Each file has a single responsibility
- Import only what you need
- Easy to maintain and scale

### 7. **Performance Optimization**

- Tree-shakeable imports
- Reduced motion support
- Hardware acceleration where needed
- Minimal specificity for faster rendering

## 📦 Installation & Usage

### In Angular Applications

1. Import the styles in your `styles.scss`:

```scss
@import '../../../libs/shared/styles/src/styles.scss';
```

2. Or import specific modules:

```scss
@import '../../../libs/shared/styles/src/abstracts/variables';
@import '../../../libs/shared/styles/src/components/buttons';
```

### Using Bootstrap

Bootstrap 5 is already integrated in the `vendors/_bootstrap.scss` file. All Bootstrap components and utilities are available.

### Using Bootswatch Themes (Optional)

Uncomment the Bootswatch import in `vendors/_bootstrap.scss`:

```scss
@import 'bootswatch/dist/[theme-name]/bootswatch';
```

Available themes: cerulean, cosmo, cyborg, darkly, flatly, journal, litera, lumen, lux, materia, minty, morph, pulse, quartz, sandstone, simplex, sketchy, slate, solar, spacelab, superhero, united, vapor, yeti, zephyr.

## 🎨 Features

### CSS Custom Properties

```scss
// Color System
--color-primary, --color-secondary, --color-success, etc.

// Typography
--font-family-base, --font-size-base, --font-weight-normal, etc.

// Spacing (8px base system)
--spacing-0 through --spacing-8

// Borders & Shadows
--border-radius, --shadow-sm, --shadow, --shadow-lg

// Z-index System
--z-index-dropdown through --z-index-tooltip
```

### Mixins

```scss
@include respond-to('md') {
  /* responsive styles */
}
@include flex-center;
@include flex-between;
@include text-truncate;
@include text-truncate-multiline(2);
@include focus-visible;
@include custom-scrollbar;
@include card-style;
```

### Functions

```scss
rem(16)                    // Convert px to rem
spacing(2)                 // Get spacing value
color-opacity($color, 0.5) // Add opacity to color
```

## 🧩 Components

### Buttons

```html
<button class="btn-custom btn-custom--primary">Primary</button>
<button class="btn-custom btn-custom--secondary">Secondary</button>
<button class="btn-custom btn-custom--outline">Outline</button>
<button class="btn-custom btn-custom--sm">Small</button>
<button class="btn-custom btn-custom--lg">Large</button>
```

### Cards

```html
<div class="card-custom">
  <div class="card-custom__header">
    <h3 class="card-custom__title">Card Title</h3>
  </div>
  <div class="card-custom__body">
    <p>Card content</p>
  </div>
  <div class="card-custom__footer">
    <div class="card-custom__actions">
      <button>Action</button>
    </div>
  </div>
</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-group__label form-group__label--required">Email</label>
  <input type="email" class="form-group__input" placeholder="Enter email" />
  <span class="form-group__help">We'll never share your email.</span>
</div>
```

### Navigation

```html
<nav class="nav">
  <div class="nav__item">
    <a href="#" class="nav__link is-active">Home</a>
  </div>
  <div class="nav__item">
    <a href="#" class="nav__link">About</a>
  </div>
</nav>
```

### Modals

```html
<div class="modal is-open">
  <div class="modal__backdrop"></div>
  <div class="modal__container">
    <div class="modal__header">
      <h2 class="modal__title">Modal Title</h2>
      <button class="modal__close">×</button>
    </div>
    <div class="modal__body">Modal content</div>
  </div>
</div>
```

## 📐 Layouts

### Grid System

```html
<div class="grid grid--cols-3 grid--gap-lg">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive -->
<div class="grid grid--cols-1 grid--cols-2@md grid--cols-3@lg">
  <!-- Auto-responsive columns -->
</div>
```

### Flexbox Utilities

```html
<div class="flex flex--between">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="flex flex--center">
  <div>Centered</div>
</div>
```

## 🎯 Utility Classes

### Spacing

```html
<div class="m-4">Margin 1rem</div>
<div class="mt-2">Margin-top 0.5rem</div>
<div class="p-4">Padding 1rem</div>
<div class="px-6">Padding left/right 2rem</div>
```

### Text

```html
<p class="text-center">Centered text</p>
<p class="text-primary">Primary color</p>
<p class="font-bold">Bold text</p>
<p class="text-truncate">Truncated text...</p>
```

### Display

```html
<div class="d-flex">Flex container</div>
<div class="d-none">Hidden</div>
<div class="d-none d-md-block">Hidden on mobile, visible on desktop</div>
```

## 🌓 Theming

Toggle between light and dark themes:

```html
<!-- Light theme (default) -->
<body data-theme="light">
  <!-- Dark theme -->
  <body data-theme="dark"></body>
</body>
```

```javascript
// Toggle theme
document.body.setAttribute('data-theme', 'dark');
```

## 📱 Responsive Design

Breakpoints:

- `xs`: 0px
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px
- `xxl`: 1400px

```scss
@include respond-to('md') {
  // Styles for medium screens and up
}
```

## ♿ Accessibility

- Focus visible states on all interactive elements
- ARIA-compliant markup examples
- Proper color contrast ratios
- Reduced motion support
- Screen reader utilities (`.sr-only`)

## 🚀 Performance

- Hardware acceleration on animations
- `prefers-reduced-motion` support
- Tree-shakeable imports
- Minimal specificity for faster rendering
- Custom scrollbar optimization

## 📚 Best Practices

1. **Use semantic HTML** - Start with proper HTML structure
2. **Mobile-first approach** - Design for mobile, enhance for desktop
3. **Avoid !important** - Keep specificity low and predictable
4. **Use utility classes sparingly** - Prefer components for complex patterns
5. **Keep components modular** - One component, one file
6. **Document your code** - Add comments for complex patterns
7. **Test accessibility** - Use keyboard navigation and screen readers

## 🔧 Customization

Override variables in your app's `styles.scss`:

```scss
:root {
  --color-primary: #your-color;
  --spacing-4: your-spacing;
}

@import 'path/to/shared/styles';
```

## 📖 Further Reading

- [BEM Methodology](http://getbem.com/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Accessibility](https://www.w3.org/WAI/)

## 🤝 Contributing

When adding new components or utilities:

1. Follow the BEM naming convention
2. Keep specificity low
3. Use CSS custom properties
4. Add proper documentation
5. Ensure accessibility
6. Test across browsers

---

**Built with ❤️ following industry best practices**
