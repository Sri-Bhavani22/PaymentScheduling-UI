## Why

The current base font size (16px) and default MUI typography sizes feel too large for a data-dense payment scheduling dashboard. Reducing font sizes will improve information density, allow more content to be visible without scrolling, and give the UI a more professional, compact appearance.

## What Changes

- Decrease the base HTML font size from 16px to 14px in `index.css`
- Adjust MUI theme typography scale (h4–h6, body1, body2, subtitle, caption, button) for smaller, proportional sizing
- Ensure component-level overrides (buttons, chips, table cells) reflect the reduced sizes

## Capabilities

### New Capabilities
- `reduced-typography`: Global font size reduction across the application with a refined MUI typography scale

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Files affected**: `src/index.css` (base font size), `src/theme/theme.js` (MUI typography overrides)
- **Components**: All text-rendering components will inherit smaller sizes — headings, body text, form labels, table content, buttons, chips
- **Risk**: Minimal — purely visual change with no logic or API impact. May need visual QA to confirm readability at smaller sizes.
