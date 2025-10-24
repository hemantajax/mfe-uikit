# UIKit Documentation

Welcome to the **mfe-uikit** documentation! This repository contains a comprehensive UI Kit library for micro-frontend applications, built with Angular 20 and Nx.

---

## 📚 Documentation Index

### 🚀 Quick Start

**Start here if you're new!**

- [**QUICK_START.md**](./QUICK_START.md) - Get up and running in 5 minutes
  - Installation instructions
  - Basic usage examples
  - Key concepts summary

### 🏗️ Architecture

**Understand the structure:**

- [**POLYREPO_UIKIT_APPROACH.md**](./POLYREPO_UIKIT_APPROACH.md) - Complete architecture guide

  - Single package strategy explained
  - Step-by-step implementation
  - Inside vs outside usage
  - Build and publish workflow
  - Daily development commands

- [**ARCHITECTURE_VISUAL_GUIDE.md**](./ARCHITECTURE_VISUAL_GUIDE.md) - Visual diagrams
  - Package architecture flow
  - Development vs consumption workflows
  - Import path resolution
  - Build and publish process

### 📦 Publishing

**Ready to publish your package?**

- [**PUBLISHING_GUIDE.md**](./PUBLISHING_GUIDE.md) - Complete publishing guide
  - Publish to npmjs.com (public registry)
  - Publish to GitHub Packages
  - Version management and semantic versioning
  - Automated publishing with GitHub Actions
  - Troubleshooting common issues
  - Security best practices

### 📝 Updates & Changes

- [**POLYREPO_UIKIT_APPROACH_CHANGELOG.md**](./POLYREPO_UIKIT_APPROACH_CHANGELOG.md) - Recent updates
  - What changed on October 24, 2025
  - Before vs after comparison
  - Summary of improvements

---

## 🎯 What is UIKit?

**UIKit** is a single npm package (`@hemantajax/uikit`) that bundles **9 internal libraries** into one easy-to-use package for micro-frontend applications.

### Package Structure

```
@hemantajax/uikit
├── Layout Components (Header, Footer, Sidebar)
├── UI Components (Buttons, Cards, Forms)
├── Services (Storage, HTTP, Auth)
├── Core (Guards, Interceptors, Models)
├── Pipes (Date, Currency, Text formatting)
├── Directives (DOM manipulation)
├── Utils (Helper functions)
├── Constants (Configuration, API URLs)
└── Styles (SCSS variables, mixins, themes)
```

---

## 💡 Two Ways to Use

### 🏠 Inside This Repository (Development)

```typescript
// Use individual libraries
import { LayoutComponent } from '@mfe-uikit/layout';
import { ButtonComponent } from '@mfe-uikit/components';
import { StorageService } from '@mfe-uikit/services';
```

### 🌍 Outside This Repository (Consumption)

```typescript
// Import everything from one package
import { LayoutComponent, ButtonComponent, StorageService } from '@hemantajax/uikit';
```

---

## 🚀 Quick Commands

### For Developers (Inside Repo)

```bash
# Serve demo app
nx serve uilab

# Test a library
nx test components

# Build the package
nx build uikit --configuration=production

# Publish
cd dist/libs/uikit && npm publish
```

### For Consumers (Outside Repo)

```bash
# Install
npm install @hemantajax/uikit@latest

# Update
npm update @hemantajax/uikit@latest
```

---

## 📖 Recommended Reading Order

1. **New to UIKit?** → Start with [QUICK_START.md](./QUICK_START.md)
2. **Want to understand the architecture?** → Read [ARCHITECTURE_VISUAL_GUIDE.md](./ARCHITECTURE_VISUAL_GUIDE.md)
3. **Need detailed implementation steps?** → Study [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)
4. **Ready to publish?** → Follow [PUBLISHING_GUIDE.md](./PUBLISHING_GUIDE.md)
5. **Curious about recent changes?** → Check [POLYREPO_UIKIT_APPROACH_CHANGELOG.md](./POLYREPO_UIKIT_APPROACH_CHANGELOG.md)

---

## 🎨 Design Principles

### Single Package Strategy

- ✅ **One package** to install instead of 9
- ✅ **One version** to manage
- ✅ **Simple imports** from single source
- ✅ **Easy updates** for consumers

### Dual Development Mode

- ✅ **Fast development** inside repo with TypeScript path mappings
- ✅ **Simple consumption** outside repo with npm package
- ✅ **Best of both worlds** - monorepo dev, polyrepo deployment

### Angular 20 + Bootstrap 5

- ✅ **Standalone components** (no NgModules)
- ✅ **Signals** for state management
- ✅ **Modern Angular** patterns
- ✅ **Bootstrap 5** for consistent UI

---

## 🏗️ Technology Stack

| Technology | Version | Purpose                 |
| ---------- | ------- | ----------------------- |
| Angular    | 20.3.0  | Framework               |
| Nx         | 22.0.1  | Monorepo tooling        |
| TypeScript | 5.9.2   | Language                |
| Bootstrap  | 5.3.8   | CSS framework           |
| ng-packagr | 20.3.0  | Angular package builder |
| Jest       | 29.7.0  | Testing                 |
| ESLint     | 9.8.0   | Linting                 |

---

## 📦 Package Information

- **Name**: `@hemantajax/uikit`
- **Current Version**: `0.0.1`
- **Repository**: https://github.com/hemantajax/mfe-uikit
- **Registry**: GitHub Packages / npmjs.com
- **License**: MIT

---

## 🔗 External Links

- [Angular Documentation](https://angular.io)
- [Nx Documentation](https://nx.dev)
- [Bootstrap 5 Documentation](https://getbootstrap.com)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)
- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)

---

## 📞 Support

For questions, issues, or contributions:

1. Check the documentation files in this directory
2. Review existing issues on GitHub
3. Create a new issue if needed

---

## 📝 Documentation Status

| Document                             | Status     | Last Updated     |
| ------------------------------------ | ---------- | ---------------- |
| README.md                            | ✅ Current | October 24, 2025 |
| QUICK_START.md                       | ✅ Current | October 24, 2025 |
| POLYREPO_UIKIT_APPROACH.md           | ✅ Current | October 24, 2025 |
| ARCHITECTURE_VISUAL_GUIDE.md         | ✅ Current | October 24, 2025 |
| PUBLISHING_GUIDE.md                  | ✅ Current | October 24, 2025 |
| POLYREPO_UIKIT_APPROACH_CHANGELOG.md | ✅ Current | October 24, 2025 |

---

**Happy Coding! 🚀**

_Built with ❤️ using Angular 20, Nx, and Bootstrap 5_
