## Context

The app uses MUI (Material UI) with a `ThemeContext` that wraps a `createTheme` call. A toggle button in the AppBar calls `toggleTheme()` which flips `mode` between `'light'` and `'dark'`. However, dark mode has no visible effect because:

1. `theme.js` exports a base theme with explicit `background.default: '#F5F7FA'` and `background.paper: '#FFFFFF'`.
2. `ThemeContext.jsx` spreads the entire base palette into `createTheme`, so those hardcoded backgrounds always win over MUI's auto-generated dark palette.
3. `index.css` sets `body { background-color: #f5f7fa }` which competes with `CssBaseline`.
4. Several components use hardcoded hex colors (`#1565C0`, `#D32F2F`, `'white'`) instead of theme tokens, so even if backgrounds flipped, text/icon colors wouldn't adapt.

## Goals / Non-Goals

**Goals:**
- Make dark mode fully functional when the user clicks the toggle
- All surfaces (body, cards, drawers, tables) adopt dark backgrounds
- All text, icons, and interactive elements use theme-aware colors
- Card shadows remain visible in both modes

**Non-Goals:**
- Persisting theme preference to localStorage (separate enhancement)
- Adding system-preference detection (`prefers-color-scheme`)
- Redesigning the color palette or brand colors
- Changing component functionality or layout

## Decisions

### Decision 1: Export raw theme config instead of resolved theme

**Choice**: Change `theme.js` to export a plain config object instead of calling `createTheme()`. The resolved theme from `createTheme()` auto-generates light-mode `text`, `divider`, and `action` palette values. When these are spread into a new `createTheme({ mode: 'dark' })`, they override MUI's dark-mode auto-generation — causing dark text on dark backgrounds.

**Alternative considered**: Destructure out `background` from the resolved palette. Rejected because `text`, `divider`, `action`, and other auto-generated keys also carry light-mode values.

**Rationale**: Exporting raw config ensures `ThemeContext.jsx` is the sole `createTheme` caller, and MUI correctly generates all mode-specific colors (text, background, divider, action) for whichever mode is active.

### Decision 2: ThemeContext as sole createTheme caller

**Choice**: `ThemeContext.jsx` calls `createTheme()` with the raw config merged with the active `mode`. No destructuring or filtering needed — just spread the raw config and add `mode`.

```js
createTheme({
  ...themeConfig,
  palette: {
    ...themeConfig.palette,
    mode,
  },
})
```

### Decision 3: Remove hardcoded body background from index.css

**Choice**: Remove the `background-color: #f5f7fa` line from the `body` rule in `index.css`. MUI's `CssBaseline` component already injects `body { background-color }` from the theme palette.

### Decision 4: Replace hardcoded component colors with theme tokens

**Choice**: Use MUI's semantic color tokens (`'primary.main'`, `'error.main'`, `'primary.contrastText'`) and `sx` prop instead of inline hex values or `style={}`.

| Component | Current | Replacement |
|-----------|---------|-------------|
| SummaryCards icon colors | `'#1565C0'`, `'#2E7D32'`, `'#388E3C'`, `'#D32F2F'` | `'primary.main'`, `'secondary.main'`, `'success.main'`, `'error.main'` |
| PaymentColumns "View" button | `style={{ color: '#1565C0' }}` | MUI `<Button size="small">` (inherits theme primary color) |
| MiniCalendar hover | `color: 'white'` | `'primary.contrastText'` |
| ScheduleCalendar today bg | `'primary.50'` | `(theme) => alpha(theme.palette.primary.main, 0.1)` |

### Decision 5: Make card shadow mode-adaptive

**Choice**: Remove the hardcoded `boxShadow: '0 2px 12px rgba(0,0,0,0.08)'` from the MuiCard override in `theme.js`. Use MUI's built-in `elevation` system which automatically adjusts for dark mode (dark mode uses lighter overlay instead of shadow).

**Alternative considered**: Use a conditional shadow based on mode. Rejected — MUI elevation handles this natively and is more maintainable.

## Risks / Trade-offs

- **[Visual Regression]** → Removing explicit light backgrounds means light mode now uses MUI defaults (`#fff` paper, `#fafafa` default vs current `#F5F7FA`). Mitigation: we can set light-mode background explicitly via a conditional in ThemeContext if the current tint is preferred.
- **[primary.50 not a standard MUI token]** → `alpha()` replaces it but requires importing from `@mui/material/styles`. Mitigation: straightforward, well-documented MUI API.
- **[Card appearance shift]** → Removing custom boxShadow changes card appearance slightly in light mode. Mitigation: use `elevation={2}` for similar light-mode look while getting dark-mode adaptation for free.