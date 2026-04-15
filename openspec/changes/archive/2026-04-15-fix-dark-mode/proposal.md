## Why

Dark mode toggle exists in the AppBar but switching to dark mode has no visual effect. The base theme hardcodes light-mode background colors that override MUI's automatic dark palette, `index.css` sets a competing body background, and several components use hardcoded hex colors that ignore the active theme. Users clicking the dark mode toggle see no change.

## What Changes

- Change `theme.js` to export a raw config object instead of a resolved `createTheme()` result — the resolved theme carries auto-generated light-mode `text`, `divider`, and `action` colors that override MUI's dark-mode defaults when spread into a new `createTheme` call
- Make `ThemeContext.jsx` the sole `createTheme` caller, merging the raw config with the active `mode`
- Remove hardcoded `background-color` from `index.css` body rule — let `CssBaseline` manage it from the theme
- Replace hardcoded hex colors in `SummaryCards.jsx`, `PaymentColumns.jsx`, and `MiniCalendar.jsx` with MUI theme tokens (`primary.main`, `error.main`, etc.)
- Adjust card box-shadow in `theme.js` to be visible on dark backgrounds (use MUI elevation instead of hardcoded rgba shadow)

## Capabilities

### New Capabilities
- `dark-mode-theming`: Ensure all UI components respect MUI dark/light mode toggle, covering theme config, CSS baseline, and component-level color tokens

### Modified Capabilities

## Impact

- `src/theme/theme.js` — export raw config object (not a resolved theme) so auto-generated light-mode `text`/`divider`/`action` colors don't leak into dark mode; remove explicit `background.default`/`background.paper`; replace hardcoded boxShadow with elevation
- `src/contexts/ThemeContext.jsx` — becomes the sole `createTheme` caller, merging raw config with active `mode`
- `src/index.css` — remove hardcoded body background
- `src/components/payments/DashboardWidgets/SummaryCards.jsx` — replace 4 hardcoded hex colors with theme tokens
- `src/components/payments/PaymentTable/PaymentColumns.jsx` — replace inline `style` color with MUI `Button` component
- `src/components/payments/DashboardWidgets/MiniCalendar.jsx` — replace `'white'` with `'primary.contrastText'`
- `src/components/payments/ScheduleCalendar/index.jsx` — replace `'primary.50'` with `alpha()` for dark-mode compatibility
- No dependency changes. No breaking changes.