# Architecture Overview

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Styles Library                        │
│                  libs/shared/styles/src/                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Main Entry: styles.scss
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   ABSTRACTS   │    │    VENDORS    │    │     BASE      │
│               │    │               │    │               │
│ • Variables   │───▶│ • Bootstrap 5 │───▶│ • Reset       │
│ • Functions   │    │ • Bootswatch  │    │ • Typography  │
│ • Mixins      │    │               │    │ • Base styles │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    LAYOUTS    │    │  COMPONENTS   │    │    THEMES     │
│               │    │               │    │               │
│ • Grid        │    │ • Buttons     │    │ • Light       │
│ • Header      │    │ • Cards       │    │ • Dark        │
│ • Footer      │    │ • Forms       │    │ • Custom      │
│ • Sidebar     │    │ • Modals      │    │               │
│               │    │ • Navigation  │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │   UTILITIES   │
                      │               │
                      │ • Spacing     │
                      │ • Text        │
                      │ • Display     │
                      └───────────────┘
                              │
                              │
                              ▼
                    ┌──────────────────┐
                    │   Your Angular   │
                    │   Applications   │
                    │                  │
                    │  apps/mfeui/     │
                    │  apps/app2/      │
                    │  apps/app3/      │
                    └──────────────────┘
```

## Import Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Entry                        │
│              apps/mfeui/src/styles.scss                     │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ @import
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Main Styles Entry Point                        │
│      libs/shared/styles/src/styles.scss                     │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ABSTRACTS          VENDORS            BASE
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    LAYOUTS          COMPONENTS         THEMES
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
                     UTILITIES
                          │
                          ▼
              ┌─────────────────────┐
              │   Compiled CSS      │
              │   Applied to DOM    │
              └─────────────────────┘
```

## Dependency Graph

```
┌──────────────────────────────────────────────────────────────┐
│                      CSS Variables                           │
│  :root { --color-primary, --spacing-4, ... }                │
└──────────────────────────────────────────────────────────────┘
                          │
                          │ Used by ▼
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Mixins    │   │  Functions  │   │  Bootstrap  │
│             │   │             │   │             │
│ • Flexbox   │   │ • rem()     │   │ • Grid      │
│ • Truncate  │   │ • spacing() │   │ • Utils     │
│ • Scrollbar │   │ • opacity() │   │ • Comp.     │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │ Used by ▼
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Layout    │   │  Components │   │  Utilities  │
│  Classes    │   │   Classes   │   │   Classes   │
│             │   │             │   │             │
│ .grid       │   │ .card-*     │   │ .m-4        │
│ .flex       │   │ .btn-*      │   │ .text-*     │
│ .header     │   │ .form-*     │   │ .d-flex     │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │ Applied in ▼
                  ┌───────────────────┐
                  │  Angular          │
                  │  Components       │
                  │  (HTML/Templates) │
                  └───────────────────┘
```

## Component Architecture (BEM)

```
┌─────────────────────────────────────────────────────────────┐
│                    Component: Card                          │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌──────────┐     ┌──────────┐
   │  BLOCK  │      │ ELEMENTS │     │MODIFIERS │
   │         │      │          │     │          │
   │ .card-  │──────│ __header │     │ --hover  │
   │ custom  │      │ __title  │     │ --flat   │
   │         │      │ __body   │     │ --border │
   │         │      │ __footer │     │          │
   └─────────┘      └──────────┘     └──────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Rendered Output   │
               │                     │
               │ .card-custom        │
               │ .card-custom__body  │
               │ .card-custom--hover │
               └─────────────────────┘
```

## Theming Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 CSS Custom Properties                       │
│  :root { --color-primary: #0d6efd; }                       │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Light Theme │   │ Dark Theme  │   │Custom Theme │
│             │   │             │   │             │
│[data-theme  │   │[data-theme  │   │[data-theme  │
│ ="light"]   │   │ ="dark"]    │   │ ="custom"]  │
│             │   │             │   │             │
│ Default     │   │ Override    │   │ Override    │
│ values      │   │ colors      │   │ colors      │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Runtime Toggle    │
               │                     │
               │ document.body       │
               │  .setAttribute(     │
               │   'data-theme',     │
               │   'dark'            │
               │  )                  │
               └─────────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   CSS Updates       │
               │   Automatically     │
               └─────────────────────┘
```

## Responsive Design Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Breakpoint System                        │
│  xs: 0px | sm: 576px | md: 768px | lg: 992px | xl: 1200px │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Mobile    │   │   Tablet    │   │   Desktop   │
│   (xs/sm)   │   │    (md)     │   │   (lg/xl)   │
│             │   │             │   │             │
│ 1 column    │──▶│ 2 columns   │──▶│ 3-4 columns │
│ Stack       │   │ Side by     │   │ Grid layout │
│ vertically  │   │ side        │   │ Full width  │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │  Media Queries      │
               │                     │
               │  @include           │
               │  respond-to('md')   │
               └─────────────────────┘
```

## Build Process

```
┌─────────────────────────────────────────────────────────────┐
│                Development (npm start)                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│             SCSS Files (libs/shared/styles/)                │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Angular Compiler / Webpack                     │
│  • Resolves @import statements                              │
│  • Compiles SCSS to CSS                                     │
│  • Resolves CSS custom properties                           │
│  • Applies PostCSS transformations                          │
│  • Minifies (production only)                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Output CSS File                          │
│              dist/apps/mfeui/styles.css                     │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 Loaded in Browser                           │
│              <link rel="stylesheet">                        │
└─────────────────────────────────────────────────────────────┘
```

## Usage Pattern

```
┌─────────────────────────────────────────────────────────────┐
│              Developer Workflow                             │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Quick     │   │   Custom    │   │  Advanced   │
│   Styling   │   │  Component  │   │   Usage     │
│             │   │             │   │             │
│ Use utility │   │ Use BEM     │   │ Use mixins  │
│ classes     │   │ classes     │   │ & variables │
│             │   │             │   │ in SCSS     │
│ .m-4        │   │ .card-      │   │ @include    │
│ .text-*     │   │  custom     │   │  flex-*     │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Consistent UI     │
               │   Across All Apps   │
               └─────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                 Optimization Strategy                       │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Low       │   │  Hardware   │   │   Minimal   │
│ Specificity │   │Acceleration │   │  Repaints   │
│             │   │             │   │             │
│ Single      │   │ transform:  │   │ Use CSS     │
│ classes     │   │ translateZ  │   │ variables   │
│             │   │             │   │             │
│ Fast CSS    │   │ GPU-        │   │ No layout   │
│ matching    │   │ accelerated │   │ thrashing   │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │  Reduced Motion     │
               │  Support            │
               │                     │
               │  @media             │
               │  (prefers-reduced-  │
               │   motion)           │
               └─────────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Fast, Smooth      │
               │   Animations        │
               └─────────────────────┘
```

## Accessibility Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Accessibility Features                      │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Focus     │   │  Semantic   │   │   Color     │
│   Visible   │   │   HTML      │   │  Contrast   │
│             │   │             │   │             │
│ :focus-     │   │ Proper      │   │ WCAG AA     │
│  visible    │   │ markup      │   │ compliant   │
│             │   │             │   │             │
│ 2px outline │   │ button,     │   │ 4.5:1 ratio │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Keyboard   │   │   Screen    │   │   Reduced   │
│ Navigation  │   │   Reader    │   │   Motion    │
│             │   │             │   │             │
│ Tab order   │   │ .sr-only    │   │ @media      │
│ proper      │   │ class       │   │ prefers-*   │
└─────────────┘   └─────────────┘   └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │   Accessible for    │
               │   All Users         │
               └─────────────────────┘
```

## Summary

This architecture provides:

1. **Modularity**: Each piece can be used independently
2. **Scalability**: Easy to add new components/utilities
3. **Performance**: Optimized for speed and efficiency
4. **Maintainability**: Clear structure and naming
5. **Flexibility**: Override and customize anything
6. **Consistency**: Shared design system across apps
7. **Accessibility**: Built-in WCAG compliance
8. **Responsive**: Mobile-first approach
9. **Themeable**: Easy light/dark mode
10. **Production-Ready**: Battle-tested patterns

---

**For detailed usage, see**: [README.md](./README.md) | [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) | [CONFIGURATION.md](./CONFIGURATION.md)
