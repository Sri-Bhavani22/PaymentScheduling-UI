## ADDED Requirements

### Requirement: Base font size SHALL be 14px
The application SHALL set the base HTML font size to 14px in the global stylesheet (`src/index.css`), reduced from the current 16px.

#### Scenario: Base font size applied globally
- **WHEN** the application loads in a browser
- **THEN** the `html` element SHALL have `font-size: 14px`

### Requirement: MUI typography scale SHALL use reduced sizes
The MUI theme (`src/theme/theme.js`) SHALL define explicit font sizes for all typography variants using reduced rem values proportional to the 14px base.

#### Scenario: Heading sizes are reduced
- **WHEN** an h4, h5, or h6 typography variant is rendered
- **THEN** h4 SHALL render at 1.5rem, h5 at 1.25rem, and h6 at 1.1rem

#### Scenario: Body text sizes are reduced
- **WHEN** body1 or body2 typography variant is rendered
- **THEN** body1 SHALL render at 0.875rem and body2 at 0.8125rem

#### Scenario: Subtitle sizes are reduced
- **WHEN** subtitle1 or subtitle2 typography variant is rendered
- **THEN** subtitle1 SHALL render at 0.875rem and subtitle2 at 0.8125rem

#### Scenario: Caption and button sizes are reduced
- **WHEN** caption or button typography variant is rendered
- **THEN** caption SHALL render at 0.7rem and button at 0.8125rem

### Requirement: Visual hierarchy SHALL be preserved
All typography variants SHALL maintain their relative size ordering (h4 > h5 > h6 > body1 >= subtitle1 > body2 >= subtitle2 > caption) after the font size reduction.

#### Scenario: Headings remain larger than body text
- **WHEN** a page renders headings and body text together
- **THEN** each heading level SHALL be visually larger than body text and smaller heading levels
