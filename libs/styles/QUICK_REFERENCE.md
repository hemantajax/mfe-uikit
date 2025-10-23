# Quick Reference Guide

## Cheat Sheet

### Import Styles

```scss
@import '../../../libs/shared/styles/src/styles.scss';
```

### CSS Custom Properties

#### Colors

```css
var(--color-primary)          /* #0d6efd */
var(--color-secondary)        /* #6c757d */
var(--color-success)          /* #198754 */
var(--color-danger)           /* #dc3545 */
var(--color-warning)          /* #ffc107 */
var(--color-info)             /* #0dcaf0 */
var(--color-white)            /* #ffffff */
var(--color-black)            /* #000000 */
var(--color-gray-100)         /* lightest */
var(--color-gray-900)         /* darkest */
```

#### Spacing (8px base)

```css
var(--spacing-0)              /* 0 */
var(--spacing-1)              /* 4px */
var(--spacing-2)              /* 8px */
var(--spacing-3)              /* 12px */
var(--spacing-4)              /* 16px */
var(--spacing-5)              /* 24px */
var(--spacing-6)              /* 32px */
var(--spacing-7)              /* 40px */
var(--spacing-8)              /* 48px */
```

#### Typography

```css
var(--font-family-base)
var(--font-size-sm)           /* 0.875rem */
var(--font-size-base)         /* 1rem */
var(--font-size-lg)           /* 1.25rem */
var(--font-size-xl)           /* 1.5rem */
var(--font-weight-light)      /* 300 */
var(--font-weight-normal)     /* 400 */
var(--font-weight-medium)     /* 500 */
var(--font-weight-semibold)   /* 600 */
var(--font-weight-bold)       /* 700 */
```

#### Borders & Shadows

```css
var(--border-radius-sm)
var(--border-radius)
var(--border-radius-lg)
var(--border-radius-xl)
var(--border-radius-pill)
var(--border-radius-circle)
var(--shadow-sm)
var(--shadow)
var(--shadow-lg)
```

### Mixins

```scss
@include respond-to('md') {
} // Responsive breakpoint
@include flex-center; // Display flex, center items
@include flex-between; // Flex with space-between
@include text-truncate; // Single line truncate
@include text-truncate-multiline(2); // Multi-line truncate
@include focus-visible; // Focus outline
@include custom-scrollbar; // Custom scrollbar
@include card-style; // Card styling
@include button-reset; // Reset button styles
@include visually-hidden; // SR-only
@include hardware-accelerate; // GPU acceleration
```

### Functions

```scss
rem(16)                                 // Convert px to rem
spacing(2)                              // Get spacing value
color-opacity($color, 0.5)              // Add opacity
```

### Breakpoints

```scss
xs: 0px
sm: 576px
md: 768px
lg: 992px
xl: 1200px
xxl: 1400px
```

## Component Classes

### Buttons

```html
.btn-custom .btn-custom--primary .btn-custom--secondary .btn-custom--outline .btn-custom--ghost .btn-custom--sm .btn-custom--lg .btn-custom--icon .btn-custom--block
```

### Cards

```html
.card-custom .card-custom__header .card-custom__title .card-custom__subtitle .card-custom__body .card-custom__footer .card-custom__image .card-custom__actions .card-custom--hoverable .card-custom--bordered .card-custom--flat .card-custom--horizontal
```

### Forms

```html
.form-group .form-group__label .form-group__label--required .form-group__input .form-group__input--error .form-group__input--success .form-group__select .form-group__textarea .form-group__help .form-group__error .form-group__success
```

### Navigation

```html
.nav .nav--vertical .nav--horizontal .nav__item .nav__link .nav__link.is-active .nav__icon .nav__badge
```

### Modal

```html
.modal .modal.is-open .modal__backdrop .modal__container .modal__header .modal__title .modal__close .modal__body .modal__footer .modal--sm .modal--lg .modal--xl
```

### Tabs

```html
.tabs .tabs__list .tabs__item .tabs__link .tabs__link.is-active
```

### Breadcrumb

```html
.breadcrumb .breadcrumb__item .breadcrumb__link .breadcrumb__current
```

## Layout Classes

### Grid

```html
.grid .grid--cols-1 .grid--cols-2 .grid--cols-3 .grid--cols-4 .grid--cols-auto .grid--gap-sm .grid--gap-lg .grid--cols-2@md
<!-- Responsive -->
```

### Flex

```html
.flex .flex--column .flex--row .flex--wrap .flex--center .flex--between .flex--start .flex--end .flex--gap .flex--gap-sm .flex--gap-lg
```

### Header

```html
.header .header__container .header__brand .header__logo .header__nav .header__actions
```

### Footer

```html
.footer .footer__container .footer__content .footer__section .footer__section-title .footer__links .footer__link .footer__bottom
```

### Sidebar

```html
.sidebar .sidebar.is-open .sidebar__header .sidebar__content .sidebar__menu .sidebar__item .sidebar__item.is-active .sidebar__icon .with-sidebar
<!-- Main content class -->
.sidebar-overlay .sidebar-overlay.is-open
```

## Utility Classes

### Spacing

```html
.m-{0-8}
<!-- Margin -->
.mt-{0-8}
<!-- Margin top -->
.mr-{0-8}
<!-- Margin right -->
.mb-{0-8}
<!-- Margin bottom -->
.ml-{0-8}
<!-- Margin left -->
.mx-{0-8}
<!-- Margin horizontal -->
.my-{0-8}
<!-- Margin vertical -->
.m-auto .p-{0-8}
<!-- Padding -->
.pt-{0-8}
<!-- Padding top -->
.pr-{0-8}
<!-- Padding right -->
.pb-{0-8}
<!-- Padding bottom -->
.pl-{0-8}
<!-- Padding left -->
.px-{0-8}
<!-- Padding horizontal -->
.py-{0-8}
<!-- Padding vertical -->
```

### Text

```html
<!-- Alignment -->
.text-left .text-center .text-right .text-justify

<!-- Transform -->
.text-uppercase .text-lowercase .text-capitalize

<!-- Weight -->
.font-light .font-normal .font-medium .font-semibold .font-bold

<!-- Size -->
.text-xs .text-sm .text-base .text-lg .text-xl

<!-- Color -->
.text-primary .text-secondary .text-success .text-danger .text-warning .text-info .text-muted

<!-- Decoration -->
.text-underline .text-line-through .text-no-decoration

<!-- Truncate -->
.text-truncate .text-truncate-2 .text-truncate-3

<!-- White space -->
.text-nowrap .text-wrap .text-break
```

### Display

```html
.d-none .d-inline .d-inline-block .d-block .d-flex .d-inline-flex .d-grid

<!-- Responsive -->
.d-md-none .d-md-block .d-md-flex .d-md-grid

<!-- Visibility -->
.visible .invisible .hidden

<!-- Opacity -->
.opacity-0 .opacity-25 .opacity-50 .opacity-75 .opacity-100

<!-- Overflow -->
.overflow-auto .overflow-hidden .overflow-visible .overflow-scroll

<!-- Position -->
.position-static .position-relative .position-absolute .position-fixed .position-sticky

<!-- Width -->
.w-25 .w-50 .w-75 .w-100 .w-auto

<!-- Height -->
.h-25 .h-50 .h-75 .h-100 .h-auto

<!-- Cursor -->
.cursor-pointer .cursor-default .cursor-not-allowed

<!-- User Select -->
.user-select-none .user-select-all .user-select-auto

<!-- Pointer Events -->
.pointer-events-none .pointer-events-auto
```

## Theme Classes

```html
<!-- Theme attributes -->
<body data-theme="light">
  <body data-theme="dark">
    <!-- Theme utilities -->
    .theme__bg-primary .theme__bg-secondary .theme__text-primary .theme__text-secondary
  </body>
</body>
```

## State Classes

```html
.is-active .is-disabled .is-open .loading .disabled .hidden .sr-only
```

## Bootstrap Classes (All Available)

All Bootstrap 5 classes are available including:

- `.container`, `.row`, `.col-*`
- `.btn`, `.btn-primary`, `.btn-outline-*`
- `.alert`, `.badge`, `.card`, `.dropdown`
- `.form-control`, `.form-select`, `.input-group`
- `.navbar`, `.nav`, `.tab-*`
- `.modal`, `.offcanvas`, `.toast`
- `.d-*`, `.flex-*`, `.text-*`, `.bg-*`
- And all other Bootstrap utilities

See: https://getbootstrap.com/docs/5.3/

## Quick Examples

### Card with Button

```html
<div class="card-custom">
  <div class="card-custom__body">
    <h3 class="card-custom__title">Title</h3>
    <p>Content</p>
    <button class="btn-custom btn-custom--primary">Action</button>
  </div>
</div>
```

### Form Group

```html
<div class="form-group">
  <label class="form-group__label form-group__label--required">Name</label>
  <input type="text" class="form-group__input" placeholder="Enter name" />
  <span class="form-group__help">Helper text</span>
</div>
```

### Responsive Grid

```html
<div class="grid grid--cols-1 grid--cols-2@md grid--cols-3@lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Flex Layout

```html
<div class="flex flex--between flex--gap">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

**Full Documentation**: [README.md](./README.md) | [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) | [CONFIGURATION.md](./CONFIGURATION.md)
