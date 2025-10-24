# UIKit - Quick Start Guide

## 🚀 For Developers Inside This Repository

### Working on UIKit Libraries

```bash
# Serve the demo app
nx serve uilab

# Add a new component
nx g component my-button --project=components --export

# Test a library
nx test components

# Lint a library
nx lint services

# View dependency graph
nx graph
```

### Import Example (Inside Repo)

```typescript
// Use individual library imports
import { LayoutComponent } from '@mfe-uikit/layout';
import { ButtonComponent } from '@mfe-uikit/components';
import { StorageService } from '@mfe-uikit/services';
import { TruncatePipe } from '@mfe-uikit/pipes';
```

### Build and Publish

```bash
# 1. Update version
cd libs/uikit
npm version patch  # or minor, or major
cd ../..

# 2. Build
nx build uikit --configuration=production

# 3. Publish
cd dist/libs/uikit
npm publish
```

---

## 📦 For Developers Using UIKit (External Projects)

### Installation

```bash
# Install the package
npm install @hemantajax/uikit@latest

# Or with specific version
npm install @hemantajax/uikit@0.0.1
```

### Authentication (GitHub Packages)

Create `.npmrc` in your project root:

```
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Import Example (Outside Repo)

```typescript
// Import everything from one package
import {
  LayoutComponent, // from layout library
  ButtonComponent, // from components library
  StorageService, // from services library
  TruncatePipe, // from pipes library
  HighlightDirective, // from directives library
  API_BASE_URL, // from constants library
} from '@hemantajax/uikit';
```

### Usage in Angular Component

```typescript
import { Component } from '@angular/core';
import { LayoutComponent, StorageService } from '@hemantajax/uikit';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `
    <lib-layout>
      <h1>My App</h1>
    </lib-layout>
  `,
})
export class AppComponent {
  constructor(private storage: StorageService) {
    this.storage.setItem('key', 'value');
  }
}
```

### Updating

```bash
# Update to latest version
npm update @hemantajax/uikit@latest

# Check current version
npm list @hemantajax/uikit
```

---

## 🎯 Key Concepts

| Aspect           | Inside Repo          | Outside Repo            |
| ---------------- | -------------------- | ----------------------- |
| **Import Path**  | `@mfe-uikit/layout`  | `@hemantajax/uikit`     |
| **Access**       | Source code directly | npm package             |
| **Development**  | Live changes         | Published versions only |
| **Installation** | Already available    | `npm install`           |
| **Use Case**     | Library development  | Consuming in apps       |

---

## 📚 Available Libraries

| Library      | Contains                                |
| ------------ | --------------------------------------- |
| `layout`     | Layout components (Header, Footer, etc) |
| `components` | Reusable UI components                  |
| `services`   | Shared services                         |
| `core`       | Guards, Interceptors, Models            |
| `pipes`      | Angular pipes                           |
| `directives` | Angular directives                      |
| `utils`      | Utility functions                       |
| `constants`  | Application constants                   |
| `styles`     | SCSS styles, variables, mixins          |

---

## 🔗 Full Documentation

- **Complete Guide**: [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)
- **Visual Guide**: [ARCHITECTURE_VISUAL_GUIDE.md](./ARCHITECTURE_VISUAL_GUIDE.md)
- **Changelog**: [POLYREPO_UIKIT_APPROACH_CHANGELOG.md](./POLYREPO_UIKIT_APPROACH_CHANGELOG.md)

---

**Repository**: https://github.com/hemantajax/mfe-uikit  
**Package**: `@hemantajax/uikit`  
**Current Version**: `0.0.1`
