## ADDED Requirements

### Requirement: Theme mode toggle changes all surface backgrounds
The system SHALL update all surface backgrounds (body, cards, paper, drawers, tables) when the user toggles between light and dark mode.

#### Scenario: Switching to dark mode changes backgrounds
- **WHEN** the user clicks the dark mode toggle while in light mode
- **THEN** the body background SHALL change to MUI's default dark background (`#121212`)
- **AND** all Card, Paper, and Drawer components SHALL use the dark paper background (`#1e1e1e` or MUI default)

#### Scenario: Switching back to light mode restores light backgrounds
- **WHEN** the user clicks the light mode toggle while in dark mode
- **THEN** the body background SHALL revert to the light-mode default
- **AND** all Card, Paper, and Drawer components SHALL use the light paper background

### Requirement: No hardcoded background in global CSS
The global CSS (index.css) SHALL NOT define a hardcoded `background-color` on `body`. The body background MUST be controlled solely by MUI's `CssBaseline` component reading from the active theme palette.

#### Scenario: CssBaseline controls body background
- **WHEN** the app renders in either light or dark mode
- **THEN** the body background color SHALL match `theme.palette.background.default` for the active mode

### Requirement: Component icon and text colors use theme tokens
All component-level colors for icons, text, and interactive elements SHALL use MUI theme tokens (e.g., `primary.main`, `error.main`, `text.primary`, `primary.contrastText`) instead of hardcoded hex values.

#### Scenario: SummaryCards icons use theme tokens
- **WHEN** the Dashboard renders SummaryCards in dark mode
- **THEN** each card's icon color SHALL reference a semantic MUI token (`primary.main`, `secondary.main`, `success.main`, `error.main`)
- **AND** the icon colors SHALL be visible against the dark card background

#### Scenario: PaymentColumns View button uses theme-aware color
- **WHEN** the Payment List page renders the data grid
- **THEN** the "View" action button SHALL use MUI's primary color from the theme (not a hardcoded `#1565C0`)
- **AND** the button SHALL be visible in both light and dark mode

#### Scenario: MiniCalendar hover uses theme contrastText
- **WHEN** the user hovers over a date with payments in the MiniCalendar
- **THEN** the hover text color SHALL use `primary.contrastText` (not hardcoded `'white'`)

### Requirement: ScheduleCalendar today highlight adapts to mode
The ScheduleCalendar's "today" date highlight SHALL use a semi-transparent primary color that is visible in both light and dark mode.

#### Scenario: Today cell is highlighted in dark mode
- **WHEN** the Schedule page renders the calendar in dark mode
- **THEN** the current day's cell SHALL have a background using `alpha(theme.palette.primary.main, 0.1)` or equivalent
- **AND** the highlight SHALL be visible against the dark paper background

### Requirement: Card shadows adapt to dark mode
Card components SHALL use MUI's elevation system or mode-adaptive shadows so that cards remain visually distinct in both light and dark mode.

#### Scenario: Cards are distinguishable in dark mode
- **WHEN** the app renders Card components in dark mode
- **THEN** cards SHALL be visually distinguishable from the surrounding background via MUI elevation or adaptive shadow
- **AND** the card shadow/elevation SHALL not be invisible (as `rgba(0,0,0,0.08)` would be on dark surfaces)