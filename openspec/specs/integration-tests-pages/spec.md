## ADDED Requirements

### Requirement: DashboardPage tests
The `DashboardPage` SHALL be tested for loading and loaded states.

#### Scenario: Loading state shows skeletons
- **WHEN** the page is loading (`isLoading: true`)
- **THEN** 4 skeleton cards are displayed

#### Scenario: Loaded state renders widgets
- **WHEN** payments data is loaded
- **THEN** SummaryCards, UpcomingTable, and MiniCalendar are rendered with the payment data

### Requirement: PaymentListPage tests
The `PaymentListPage` SHALL be tested for loading and content states.

#### Scenario: Loading shows spinner
- **WHEN** the page is loading
- **THEN** a LoadingSpinner with message `'Loading payments...'` is displayed

#### Scenario: Loaded shows table
- **WHEN** payments are loaded
- **THEN** the PaymentTable is rendered with the payments

### Requirement: PaymentDetailPage tests
The `PaymentDetailPage` SHALL be tested for loading, not found, content, and action states.

#### Scenario: Loading shows spinner
- **WHEN** the page is loading
- **THEN** a LoadingSpinner with message `'Loading payment details...'` is displayed

#### Scenario: Not found state
- **WHEN** payment data is null (not found)
- **THEN** the text `'Payment not found'` is displayed with a back button

#### Scenario: Renders payment card and timeline
- **WHEN** a valid payment is loaded
- **THEN** the PaymentCard and PaymentTimeline are rendered

#### Scenario: Cancel button for Scheduled status
- **WHEN** the payment has status `'Scheduled'`
- **THEN** Edit and Cancel buttons are visible

#### Scenario: Retry button for Failed status
- **WHEN** the payment has status `'Failed'`
- **THEN** a Retry button is visible

#### Scenario: Cancel action success
- **WHEN** the user clicks Cancel and the mutation succeeds
- **THEN** a success notification is shown and navigation occurs to `/payments`

#### Scenario: Cancel action failure
- **WHEN** the user clicks Cancel and the mutation fails
- **THEN** an error notification is shown

### Requirement: SchedulePage tests
The `SchedulePage` SHALL be tested for loading, view toggle, and content rendering.

#### Scenario: Loading shows spinner
- **WHEN** the page is loading
- **THEN** a LoadingSpinner is displayed

#### Scenario: Default calendar view
- **WHEN** the page loads with data
- **THEN** the ScheduleCalendar is rendered

#### Scenario: Toggle to list view
- **WHEN** the user toggles from calendar to list view
- **THEN** a grouped list of payments sorted by date is displayed

### Requirement: CreatePaymentPage tests
The `CreatePaymentPage` SHALL be tested for basic rendering.

#### Scenario: Renders heading and form
- **WHEN** the page renders
- **THEN** the heading `'Create Payment'` and the PaymentForm are displayed

### Requirement: NotFoundPage tests
The `NotFoundPage` SHALL be tested for content and navigation.

#### Scenario: Displays 404 content
- **WHEN** the page renders
- **THEN** the text `'404'` and `'Page not found'` are displayed

#### Scenario: Dashboard button navigates
- **WHEN** the user clicks `'Go to Dashboard'`
- **THEN** navigation occurs to `/`
