## Context

The PaymentScheduling-UI is a React + MUI application with a base font size of 16px set in `src/index.css` and a MUI theme defined in `src/theme/theme.js`. The theme currently only overrides `fontFamily` and heading weights (h4–h6) without specifying explicit font sizes, so MUI defaults apply. The 16px base produces large text that reduces information density on the dashboard, tables, and forms.

## Goals / Non-Goals

**Goals:**
- Reduce the base HTML font size from 16px to 14px
- Define explicit, proportionally smaller MUI typography variants (h4–h6, body1, body2, subtitle1, subtitle2, caption, button, overline)
- Maintain visual hierarchy and readability after the reduction

**Non-Goals:**
- Redesigning the layout or spacing system
- Changing font family or font weights
- Adding responsive/breakpoint-based font scaling
- Modifying component spacing or padding

## Decisions

### Decision 1: Reduce base HTML font size to 14px
**Rationale**: 14px is the standard for data-dense dashboards and admin UIs. It's sufficient for readability while gaining ~12% more content per viewport. This is changed in `src/index.css`.

**Alternative considered**: Using 13px — too small for comfortable reading; 15px — not enough difference to justify the change.

### Decision 2: Set explicit MUI typography scale in theme
**Rationale**: Rather than relying on MUI's defaults (which assume 16px), explicitly setting font sizes in `src/theme/theme.js` ensures consistent, predictable sizing across all components. The scale will be:
- h4: 1.75rem → 1.5rem
- h5: 1.5rem → 1.25rem
- h6: 1.25rem → 1.1rem
- body1: 1rem → 0.875rem
- body2: 0.875rem → 0.8125rem
- subtitle1: 1rem → 0.875rem
- subtitle2: 0.875rem → 0.8125rem
- caption: 0.75rem → 0.7rem
- button: 0.875rem → 0.8125rem

### Decision 3: Use rem units throughout
**Rationale**: Since we're changing the base `html` font size, all `rem` values automatically scale. Using rem ensures a single point of control and consistency.

## Risks / Trade-offs

- **[Readability on small screens]** → Mitigated by keeping a 14px minimum base; users on small screens still get legible text.
- **[Third-party component sizing]** → MUI components inherit from the theme, so this is handled. Any non-MUI text inherits from the CSS base size.
- **[Visual regression]** → Mitigated by limiting changes to two files with well-defined outcomes. Visual QA pass recommended after implementation.
