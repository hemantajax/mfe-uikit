# @hemantajax/uikit

Complete UI Kit for Angular 20 Micro-Frontend applications. Includes layout components, UI components, services, pipes, directives, utilities, and styles.

## 🚀 Installation

```bash
npm install @hemantajax/uikit@latest
```

## 📦 What's Included

This package bundles 9 internal libraries into one convenient package:

- **Layout** - Header, Footer, Sidebar components
- **Components** - Reusable UI components (Buttons, Cards, Forms, etc.)
- **Services** - Storage, HTTP, Authentication services
- **Core** - Guards, Interceptors, Models, Interfaces
- **Pipes** - Date, Currency, Text formatting pipes
- **Directives** - DOM manipulation directives
- **Utils** - Helper functions and utilities
- **Constants** - Configuration values, API URLs
- **Styles** - SCSS variables, mixins, themes (Bootstrap 5)

## 🎯 Usage

### Import Components

```typescript
import { Component } from '@angular/core';
import { LayoutComponent, ButtonComponent, CardComponent, StorageService, TruncatePipe, HighlightDirective, API_BASE_URL } from '@hemantajax/uikit';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ButtonComponent, CardComponent, TruncatePipe, HighlightDirective],
  template: `
    <lib-layout>
      <h1>{{ title | truncate : 20 }}</h1>
      <lib-button>Click me</lib-button>
      <lib-card>Content here</lib-card>
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

### Import Styles

The package includes a complete SCSS library with Bootstrap 5 integration.

#### Option 1: Import Everything (Recommended)

```scss
// styles.scss or styles.global.scss
@import '@hemantajax/uikit/styles/main';
```

This includes:

- ✅ Bootstrap 5
- ✅ All abstracts (variables, mixins, functions)
- ✅ Base styles
- ✅ Layout utilities
- ✅ Component styles
- ✅ Theme support

#### Option 2: Import Specific Modules

```scss
// Import only what you need
@import '@hemantajax/uikit/styles/abstracts/variables';
@import '@hemantajax/uikit/styles/abstracts/mixins';
@import '@hemantajax/uikit/styles/vendors/bootstrap';

// Custom component styles
@import '@hemantajax/uikit/styles/components/buttons';
@import '@hemantajax/uikit/styles/components/cards';
```

#### Available Style Modules

```
styles/
├── abstracts/        (variables, mixins, functions)
├── base/            (reset, typography, base styles)
├── components/      (buttons, cards, forms, modals, navigation)
├── layouts/         (grid, header, footer, sidebar)
├── themes/          (theme configurations)
├── utilities/       (spacing, text, display helpers)
└── vendors/         (Bootstrap 5 integration)
```

## 📋 Requirements

### Peer Dependencies

- Angular 20.3.0 or higher
- Bootstrap 5.3.0 or higher

### Installation with peer dependencies

```bash
npm install @hemantajax/uikit @angular/common@^20.3.0 @angular/core@^20.3.0 bootstrap@^5.3.0
```

## 🎨 Features

- ✅ **Angular 20** - Built with latest Angular features
- ✅ **Standalone Components** - No NgModules required
- ✅ **Signals** - Modern state management
- ✅ **Bootstrap 5** - Consistent, responsive UI
- ✅ **TypeScript** - Full type safety
- ✅ **Tree-shakable** - Optimized bundle sizes
- ✅ **SSR Compatible** - Works with Angular Universal

## 📚 Documentation

Full documentation available at: [https://github.com/hemantajax/mfe-uikit](https://github.com/hemantajax/mfe-uikit)

- [Quick Start Guide](https://github.com/hemantajax/mfe-uikit/blob/main/docs/QUICK_START.md)
- [Architecture Guide](https://github.com/hemantajax/mfe-uikit/blob/main/docs/POLYREPO_UIKIT_APPROACH.md)
- [Visual Architecture](https://github.com/hemantajax/mfe-uikit/blob/main/docs/ARCHITECTURE_VISUAL_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/hemantajax/mfe-uikit) for contribution guidelines.

## 📄 License

MIT © Hemant

## 🔗 Links

- **Repository**: [https://github.com/hemantajax/mfe-uikit](https://github.com/hemantajax/mfe-uikit)
- **Issues**: [https://github.com/hemantajax/mfe-uikit/issues](https://github.com/hemantajax/mfe-uikit/issues)
- **npm Package**: [https://www.npmjs.com/package/@hemantajax/uikit](https://www.npmjs.com/package/@hemantajax/uikit)

---

**Built with ❤️ using Angular 20, Nx, and Bootstrap 5**
