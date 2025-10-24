/**
 * @hemantajax/uikit
 *
 * Complete UI Kit for Micro-Frontend applications
 * Re-exports all functionality from internal libraries
 */

// ===== Layout Components =====
export * from './lib/layout';

// ===== UI Components =====
export * from './lib/components';

// ===== Services =====
export * from './lib/services/services';

// ===== Core (Guards, Interceptors, Models) =====
export * from './lib/core/core';

// ===== Utilities =====
export * from './lib/utils/utils';

// ===== Pipes =====
export * from './lib/pipes/pipes';

// ===== Directives =====
export * from './lib/directives/directives';

// ===== Constants =====
export * from './lib/constants/constants';

/**
 * Note: Styles library is SCSS-only and should be imported directly in your styles.scss
 *
 * Usage:
 * @import '@hemantajax/uikit/styles/main';
 *
 * Or import specific modules:
 * @import '@hemantajax/uikit/styles/abstracts/variables';
 * @import '@hemantajax/uikit/styles/abstracts/mixins';
 */
