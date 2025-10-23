# Configuration Guide

## Initial Setup

The shared styles library has been configured and is ready to use!

### ✅ Already Configured

1. **Library Structure**: Created in `libs/shared/styles/`
2. **TypeScript Path Alias**: `@nxmfe/styles` in `tsconfig.base.json`
3. **Main App Integration**: Imported in `apps/mfeui/src/styles.scss`
4. **Bootstrap 5**: Installed and integrated
5. **Bootswatch**: Installed for optional theme support

## Using the Styles Library

### Method 1: Import Everything (Recommended for most apps)

In your app's `styles.scss`:

```scss
@import '../../../libs/shared/styles/src/styles.scss';
```

### Method 2: Import Specific Modules (For optimization)

```scss
// Import only abstracts and specific components
@import '../../../libs/shared/styles/src/abstracts/variables';
@import '../../../libs/shared/styles/src/abstracts/mixins';
@import '../../../libs/shared/styles/src/vendors/bootstrap';
@import '../../../libs/shared/styles/src/components/buttons';
@import '../../../libs/shared/styles/src/components/cards';
```

## Angular Component Configuration

### Using in Component Styles

**Option 1: Use utility classes in templates**

```html
<div class="card-custom">
  <div class="card-custom__body p-4">Content</div>
</div>
```

**Option 2: Use variables and mixins in component SCSS**

```scss
// my-component.component.scss
.my-custom-component {
  padding: var(--spacing-4);
  background: var(--color-white);

  @include respond-to('md') {
    padding: var(--spacing-6);
  }
}
```

## Customizing the Styles

### Override Variables

Create a file: `libs/shared/styles/src/abstracts/_custom-variables.scss`

```scss
:root {
  --color-primary: #your-brand-color;
  --font-family-base: 'Your Custom Font', sans-serif;
  --spacing-4: 1.25rem; // Custom spacing
}
```

Then import it in your app's styles.scss BEFORE the main import:

```scss
@import '../../../libs/shared/styles/src/abstracts/variables';
@import '../../../libs/shared/styles/src/abstracts/custom-variables';
@import '../../../libs/shared/styles/src/styles.scss';
```

### Using Bootswatch Themes

1. Uncomment the Bootswatch import in `libs/shared/styles/src/vendors/_bootstrap.scss`:

```scss
// Choose a theme: cerulean, cosmo, cyborg, darkly, flatly, etc.
@import 'bootswatch/dist/flatly/bootswatch';
```

2. Available themes:

   - **flatly** - Modern flat design
   - **darkly** - Dark theme
   - **cyborg** - Dark blue theme
   - **lux** - Elegant and sophisticated
   - **materia** - Material Design inspired
   - **minty** - Fresh and clean
   - **pulse** - Bold and colorful
   - **solar** - Low contrast dark theme
   - **superhero** - Dark theme with vibrant accents
   - And many more!

3. Preview themes at: https://bootswatch.com/

## Adding to New Apps

When creating a new app in the Nx workspace:

1. Add the import to the new app's `styles.scss`:

```scss
@import '../../../libs/shared/styles/src/styles.scss';
```

2. The styles will be automatically available!

## Project Structure

```
libs/shared/styles/src/
├── styles.scss              # Main entry point
├── abstracts/
│   ├── _variables.scss      # CSS custom properties
│   ├── _functions.scss      # SCSS functions
│   └── _mixins.scss         # Reusable mixins
├── vendors/
│   └── _bootstrap.scss      # Bootstrap integration
├── base/
│   ├── _reset.scss          # CSS reset
│   ├── _typography.scss     # Typography styles
│   └── _base.scss           # Base styles
├── layouts/
│   ├── _grid.scss           # Grid system
│   ├── _header.scss         # Header component
│   ├── _footer.scss         # Footer component
│   └── _sidebar.scss        # Sidebar component
├── components/
│   ├── _buttons.scss        # Button components
│   ├── _cards.scss          # Card components
│   ├── _forms.scss          # Form components
│   ├── _modals.scss         # Modal components
│   └── _navigation.scss     # Navigation components
├── themes/
│   └── _default.scss        # Theme configurations
└── utilities/
    ├── _spacing.scss        # Spacing utilities
    ├── _text.scss           # Text utilities
    └── _display.scss        # Display utilities
```

## Build Configuration

The styles library is automatically included when you build your app:

```bash
# Development
npm start

# Production build
npm run build:prod
```

## Environment-Specific Styles

For environment-specific styles, create files in your app:

```
apps/mfeui/src/
├── styles.scss              # Main styles (imports shared)
├── styles.dev.scss          # Development-only styles
└── styles.prod.scss         # Production-only styles
```

Then in `angular.json` or `project.json`, configure different style inputs per environment.

## Performance Tips

1. **Import only what you need** for smaller bundle sizes
2. **Use PurgeCSS** in production to remove unused styles
3. **Leverage tree-shaking** by importing specific modules
4. **Use CSS custom properties** instead of SCSS variables for dynamic theming
5. **Enable CSS minification** in production builds

## Debugging

### Check if styles are loading:

1. Open browser DevTools
2. Check the Styles panel
3. Look for custom properties like `--color-primary`
4. Verify Bootstrap classes are available

### Common issues:

**Issue**: Styles not loading

- **Solution**: Check the import path in your `styles.scss`
- **Solution**: Ensure the path uses the correct relative path

**Issue**: Variables not available in components

- **Solution**: CSS custom properties work globally, SCSS variables need to be imported

**Issue**: Bootstrap classes not working

- **Solution**: Verify the Bootstrap import in `vendors/_bootstrap.scss`

## Testing Styles

### Visual Testing

```bash
npm start
```

Then open http://localhost:4200 and verify:

- Bootstrap components work
- Custom classes apply correctly
- Responsive breakpoints work
- Theme switching works (if implemented)

### Build Testing

```bash
npm run build:prod
```

Verify the build completes without errors.

## Linting Styles

Add StyleLint for SCSS linting (optional):

```bash
npm install --save-dev stylelint stylelint-config-standard-scss
```

Create `.stylelintrc.json`:

```json
{
  "extends": "stylelint-config-standard-scss",
  "rules": {
    "selector-class-pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$"
  }
}
```

## IDE Configuration

### VS Code

Install extensions:

- **SCSS IntelliSense**: Autocomplete for SCSS
- **SCSS Formatter**: Format SCSS files
- **CSS Variable Autocomplete**: Autocomplete for CSS custom properties

### Settings

Add to `.vscode/settings.json`:

```json
{
  "scss.lint.unknownAtRules": "ignore",
  "css.lint.unknownAtRules": "ignore",
  "scss.validate": true,
  "css.validate": true
}
```

## Migration Guide

### From Other Style Systems

**From Tailwind CSS:**

- Replace Tailwind utilities with our utility classes
- Use CSS custom properties instead of Tailwind's @apply
- Convert components to BEM naming

**From Material UI:**

- Replace Material components with Bootstrap components
- Use our custom components for similar functionality
- Adapt theme using CSS custom properties

**From Plain CSS:**

- Convert to SCSS for better organization
- Use mixins and functions for reusable patterns
- Adopt BEM naming convention

## Advanced Configuration

### Adding Custom Fonts

1. Add fonts to `libs/shared/styles/src/abstracts/_variables.scss`:

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Creating Custom Themes

1. Create `libs/shared/styles/src/themes/_custom.scss`:

```scss
[data-theme='custom'] {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  // ... other custom colors
}
```

2. Import in `styles.scss`:

```scss
@import 'themes/custom';
```

### Adding Icons

Consider using:

- **Bootstrap Icons**: Already compatible
- **Font Awesome**: Easy to integrate
- **Material Icons**: Can be added

Example with Bootstrap Icons:

```bash
npm install bootstrap-icons
```

```scss
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

## Support & Documentation

- **Main README**: [README.md](./README.md)
- **Usage Examples**: [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)
- **Bootstrap Docs**: https://getbootstrap.com/
- **Bootswatch**: https://bootswatch.com/

## Maintenance

### Updating Bootstrap

```bash
npm update bootstrap @ng-bootstrap/ng-bootstrap
```

### Updating Bootswatch

```bash
npm update bootswatch
```

### Adding New Components

1. Create new file in appropriate directory
2. Follow BEM naming convention
3. Import in `styles.scss`
4. Document in `USAGE_EXAMPLES.md`
5. Test across breakpoints

---

**Questions or Issues?** Check the main README or create an issue in the repository.
