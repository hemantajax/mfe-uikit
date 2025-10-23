# Usage Examples

## Quick Start

### 1. Import in Your Angular App

**In your `styles.scss`:**

```scss
@import '../../../libs/shared/styles/src/styles.scss';
```

**Or import specific modules:**

```scss
// Only import what you need
@import '../../../libs/shared/styles/src/abstracts/variables';
@import '../../../libs/shared/styles/src/abstracts/mixins';
@import '../../../libs/shared/styles/src/base/reset';
@import '../../../libs/shared/styles/src/components/buttons';
```

### 2. Use in Components

**Component SCSS:**

```scss
// Component: my-component.component.scss
// Access variables and mixins
.my-component {
  padding: var(--spacing-4);
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  @include respond-to('md') {
    padding: var(--spacing-6);
  }

  &__title {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }
}
```

## Component Examples

### Example 1: Card Component

**HTML:**

```html
<div class="card-custom card-custom--hoverable">
  <div class="card-custom__header">
    <h3 class="card-custom__title">Featured Product</h3>
    <p class="card-custom__subtitle">Limited time offer</p>
  </div>
  <img src="product.jpg" alt="Product" class="card-custom__image" />
  <div class="card-custom__body">
    <p>This is an amazing product that you'll love!</p>
  </div>
  <div class="card-custom__footer">
    <div class="card-custom__actions">
      <button class="btn-custom btn-custom--primary">Buy Now</button>
      <button class="btn-custom btn-custom--outline">Learn More</button>
    </div>
  </div>
</div>
```

### Example 2: Form with Validation

**HTML:**

```html
<form class="p-4">
  <div class="form-group">
    <label class="form-group__label form-group__label--required"> Full Name </label>
    <input type="text" class="form-group__input" placeholder="John Doe" required />
    <span class="form-group__help">Enter your full legal name</span>
  </div>

  <div class="form-group">
    <label class="form-group__label form-group__label--required"> Email Address </label>
    <input type="email" class="form-group__input form-group__input--error" placeholder="john@example.com" />
    <span class="form-group__error">Please enter a valid email address</span>
  </div>

  <div class="form-group">
    <label class="form-group__label">Message</label>
    <textarea class="form-group__input form-group__textarea" placeholder="Your message here..."></textarea>
  </div>

  <div class="form-check">
    <input type="checkbox" id="terms" class="form-check__input" />
    <label for="terms" class="form-check__label"> I agree to the terms and conditions </label>
  </div>

  <button type="submit" class="btn-custom btn-custom--primary btn-custom--block mt-4">Submit Form</button>
</form>
```

### Example 3: Navigation Bar

**HTML:**

```html
<header class="header">
  <div class="header__container">
    <div class="header__brand">
      <img src="logo.svg" alt="Logo" class="header__logo" />
      <span>My App</span>
    </div>

    <nav class="header__nav">
      <div class="nav nav--horizontal">
        <div class="nav__item">
          <a href="/" class="nav__link is-active">Home</a>
        </div>
        <div class="nav__item">
          <a href="/about" class="nav__link">About</a>
        </div>
        <div class="nav__item">
          <a href="/services" class="nav__link">Services</a>
        </div>
        <div class="nav__item">
          <a href="/contact" class="nav__link">Contact</a>
        </div>
      </div>
    </nav>

    <div class="header__actions">
      <button class="btn-custom btn-custom--outline btn-custom--sm">Login</button>
      <button class="btn-custom btn-custom--primary btn-custom--sm">Sign Up</button>
    </div>
  </div>
</header>
```

### Example 4: Responsive Grid Layout

**HTML:**

```html
<div class="container-fluid">
  <div class="grid grid--cols-1 grid--cols-2@md grid--cols-4@lg grid--gap-lg">
    <div class="card-custom">
      <div class="card-custom__body">
        <h4>Feature 1</h4>
        <p>Description of feature 1</p>
      </div>
    </div>
    <div class="card-custom">
      <div class="card-custom__body">
        <h4>Feature 2</h4>
        <p>Description of feature 2</p>
      </div>
    </div>
    <div class="card-custom">
      <div class="card-custom__body">
        <h4>Feature 3</h4>
        <p>Description of feature 3</p>
      </div>
    </div>
    <div class="card-custom">
      <div class="card-custom__body">
        <h4>Feature 4</h4>
        <p>Description of feature 4</p>
      </div>
    </div>
  </div>
</div>
```

### Example 5: Modal Dialog

**HTML:**

```html
<div class="modal is-open">
  <div class="modal__backdrop" (click)="closeModal()"></div>
  <div class="modal__container">
    <div class="modal__header">
      <h2 class="modal__title">Confirmation</h2>
      <button class="modal__close" (click)="closeModal()">×</button>
    </div>
    <div class="modal__body">
      <p>Are you sure you want to delete this item?</p>
      <p class="text-muted text-sm">This action cannot be undone.</p>
    </div>
    <div class="modal__footer">
      <button class="btn-custom btn-custom--ghost" (click)="closeModal()">Cancel</button>
      <button class="btn-custom btn-custom--primary" (click)="confirmDelete()">Delete</button>
    </div>
  </div>
</div>
```

**Angular Component:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmDelete() {
    // Handle delete logic
    this.closeModal();
  }
}
```

## Using Mixins in Components

**Example Component SCSS:**

```scss
.dashboard {
  @include flex-between;
  padding: var(--spacing-6);

  &__sidebar {
    width: 250px;
    @include custom-scrollbar;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__content {
    flex: 1;
    @include card-style;
  }

  &__title {
    @include text-truncate;
    font-size: var(--font-size-xl);
  }
}
```

## Theme Switching

**Angular Service:**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getTheme() {
    return this.currentTheme;
  }
}
```

**Component:**

```typescript
import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="btn-custom btn-custom--icon" (click)="toggleTheme()" aria-label="Toggle theme">
      {{ isDarkMode ? '☀️' : '🌙' }}
    </button>
  `,
})
export class ThemeToggleComponent {
  get isDarkMode() {
    return this.themeService.getTheme() === 'dark';
  }

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
```

## Utility Class Examples

```html
<!-- Spacing -->
<div class="mt-4 mb-6 px-4">Content with spacing</div>

<!-- Flexbox -->
<div class="d-flex flex--between flex--gap">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Text utilities -->
<p class="text-center text-primary font-bold text-lg">Styled text</p>

<!-- Responsive visibility -->
<div class="d-none d-md-block">Visible only on medium screens and up</div>

<!-- Width and height -->
<div class="w-100 h-auto">Full width, auto height</div>

<!-- Position -->
<div class="position-relative">
  <div class="position-absolute" style="top: 0; right: 0;">Absolutely positioned</div>
</div>
```

## Bootstrap Integration

All Bootstrap 5 components and utilities are available:

```html
<!-- Bootstrap buttons -->
<button class="btn btn-primary">Bootstrap Primary</button>
<button class="btn btn-outline-secondary">Bootstrap Outline</button>

<!-- Bootstrap grid -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Column 1</div>
    <div class="col-md-6">Column 2</div>
  </div>
</div>

<!-- Bootstrap utilities -->
<div class="bg-primary text-white p-3 rounded shadow">Bootstrap utilities</div>
```

## Custom Component Example

Create your own components using the styles:

**product-card.component.html:**

```html
<article class="product-card">
  <div class="product-card__image-wrapper">
    <img [src]="product.image" [alt]="product.name" class="product-card__image" />
    <span *ngIf="product.isNew" class="product-card__badge">New</span>
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">{{ product.name }}</h3>
    <p class="product-card__description">{{ product.description }}</p>
    <div class="product-card__footer">
      <span class="product-card__price">\${{ product.price }}</span>
      <button class="btn-custom btn-custom--primary btn-custom--sm">Add to Cart</button>
    </div>
  </div>
</article>
```

**product-card.component.scss:**

```scss
.product-card {
  @include card-style;
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &__image-wrapper {
    position: relative;
    @include aspect-ratio(16, 9);
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  &__badge {
    position: absolute;
    top: var(--spacing-3);
    right: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-3);
    background-color: var(--color-success);
    color: var(--color-white);
    border-radius: var(--border-radius-pill);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
  }

  &__content {
    padding: var(--spacing-4);
  }

  &__title {
    @include text-truncate;
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
  }

  &__description {
    @include text-truncate-multiline(2);
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-4);
  }

  &__footer {
    @include flex-between;
  }

  &__price {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }
}
```

## Tips & Best Practices

1. **Use utility classes for quick styling** but create custom components for complex patterns
2. **Leverage CSS custom properties** for easy theming and consistency
3. **Use BEM naming** for your custom components
4. **Keep components modular** - one component, one file
5. **Utilize mixins** for common patterns
6. **Test responsiveness** across different breakpoints
7. **Check accessibility** with keyboard navigation
8. **Optimize performance** by importing only what you need

---

For more details, see the main [README.md](./README.md)
