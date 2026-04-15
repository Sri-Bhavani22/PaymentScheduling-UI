## 1. Theme Configuration

- [x] 1.1 Remove hardcoded `background.default` and `background.paper` from `src/theme/theme.js` palette so MUI auto-generates mode-appropriate backgrounds
- [x] 1.2 Remove hardcoded `boxShadow` from MuiCard component override in `src/theme/theme.js` — let MUI elevation handle dark-mode-adaptive shadows
- [x] 1.3 Change `src/theme/theme.js` to export a raw config object instead of a resolved `createTheme()` result — prevents auto-generated light-mode `text`/`divider`/`action` colors from leaking into dark mode
- [x] 1.4 Update `src/contexts/ThemeContext.jsx` as the sole `createTheme` caller, merging raw config with active `mode`

## 2. Global CSS Fix

- [x] 2.1 Remove `background-color: #f5f7fa` from the `body` rule in `src/index.css` so CssBaseline controls the body background from the theme

## 3. Component Color Token Replacements

- [x] 3.1 Replace hardcoded hex colors in `src/components/payments/DashboardWidgets/SummaryCards.jsx` icon config with MUI theme tokens (`primary.main`, `secondary.main`, `success.main`, `error.main`)
- [x] 3.2 Replace inline `style={{ color: '#1565C0' }}` in `src/components/payments/PaymentTable/PaymentColumns.jsx` "View" button with an MUI `<Button>` component or theme-aware `sx` prop
- [x] 3.3 Replace `color: 'white'` with `'primary.contrastText'` in the hover style of `src/components/payments/DashboardWidgets/MiniCalendar.jsx`
- [x] 3.4 Replace `bgcolor: 'primary.50'` with `(theme) => alpha(theme.palette.primary.main, 0.1)` in `src/components/payments/ScheduleCalendar/index.jsx` for today/selected date highlighting

## 4. Verification

- [x] 4.1 Verify all existing tests pass after changes (`npm test`)
- [x] 4.2 Manually verify dark mode toggle works: body, cards, sidebar, tables, calendar all render correctly in both modes