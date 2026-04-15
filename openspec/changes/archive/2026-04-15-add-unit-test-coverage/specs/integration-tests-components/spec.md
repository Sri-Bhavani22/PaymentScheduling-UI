## ADDED Requirements

### Requirement: PaymentForm stepper tests
The multi-step `PaymentForm` component SHALL be tested for navigation, per-step validation, submission, and error handling.

#### Scenario: Renders step 0 initially
- **WHEN** the PaymentForm renders
- **THEN** the Payee Details step is visible with fields for payeeName, accountNumber, bankIfsc, and email

#### Scenario: Validation gates Next button
- **WHEN** the user clicks Next on step 0 without filling required fields
- **THEN** validation errors are displayed and the step does not advance

#### Scenario: Step navigation forward and back
- **WHEN** the user fills valid payee data and clicks Next, then clicks Back
- **THEN** the form returns to step 0 with previously entered data preserved

#### Scenario: Review step shows entered data
- **WHEN** the user completes steps 0 and 1 and reaches step 2
- **THEN** the ReviewStep displays all entered values (payee name, amount, dates, etc.)

#### Scenario: Edit buttons jump to correct step
- **WHEN** the user clicks Edit on the Payee Details section in the ReviewStep
- **THEN** the form navigates back to step 0

#### Scenario: Successful submission
- **WHEN** the user submits the form and `createPayment` succeeds
- **THEN** a success notification is shown and navigation occurs to `/payments/:id`

#### Scenario: Failed submission
- **WHEN** the user submits the form and `createPayment` fails
- **THEN** an error notification is shown

### Requirement: PaymentTable filter, sort, paginate, and export tests
The `PaymentTable` component SHALL be tested for search, status filter, column sorting, pagination, and CSV export.

#### Scenario: Renders all payment rows
- **WHEN** PaymentTable receives an array of payments
- **THEN** payment rows are rendered in the table

#### Scenario: Search filters by payee name
- **WHEN** the user types a search query
- **THEN** only payments whose payeeName matches the query are shown

#### Scenario: Status filter
- **WHEN** the user selects a status from the filter dropdown
- **THEN** only payments with that status are shown

#### Scenario: Column sort toggles
- **WHEN** the user clicks a sortable column header
- **THEN** the rows are sorted ascending; clicking again sorts descending

#### Scenario: Pagination
- **WHEN** there are more payments than the page size
- **THEN** only the current page's rows are displayed and pagination controls work

#### Scenario: Row click navigates
- **WHEN** the user clicks a payment row
- **THEN** navigation occurs to `/payments/:id`

#### Scenario: CSV export
- **WHEN** the user clicks the Export CSV button
- **THEN** a CSV file is generated containing the correct headers and filtered payment data

### Requirement: PaymentCard rendering tests
The `PaymentCard` component SHALL be tested for data display and conditional fields.

#### Scenario: Displays payment details
- **WHEN** a payment object is passed as prop
- **THEN** the payee name, amount (formatted), currency, date, type, account, and IFSC are displayed

#### Scenario: Null payment returns nothing
- **WHEN** `payment` prop is null
- **THEN** the component renders nothing

#### Scenario: Conditional email and description
- **WHEN** the payment has an email and description
- **THEN** those fields are visible; when absent, they are not rendered

### Requirement: PaymentTimeline rendering tests
The `PaymentTimeline` component SHALL be tested for event rendering and empty state.

#### Scenario: Renders timeline events
- **WHEN** a timeline array with events is passed
- **THEN** each event is rendered with its name and formatted date

#### Scenario: Empty timeline
- **WHEN** an empty timeline array is passed
- **THEN** the text `'No timeline events.'` is displayed

#### Scenario: Event with reason
- **WHEN** an event includes a `reason` field
- **THEN** the reason text is displayed

### Requirement: ScheduleCalendar tests
The `ScheduleCalendar` component SHALL be tested for calendar rendering, navigation, and date selection.

#### Scenario: Renders month header and day grid
- **WHEN** ScheduleCalendar renders
- **THEN** the current month name and year are displayed with a 7-column day grid

#### Scenario: Previous and next month navigation
- **WHEN** the user clicks the previous or next month button
- **THEN** the displayed month changes accordingly

#### Scenario: Days with payments show indicators
- **WHEN** payments exist for specific dates
- **THEN** those calendar dates show chip or badge indicators

#### Scenario: Date selection toggles
- **WHEN** the user clicks a date that has payments
- **THEN** that date is selected and its payments are listed; clicking again deselects

### Requirement: SummaryCards aggregation tests
The `SummaryCards` component SHALL be tested for correct computation of each card's value.

#### Scenario: Counts scheduled and pending
- **WHEN** payments with mixed statuses are passed
- **THEN** the `Total Scheduled` card shows the count of Scheduled + Pending payments

#### Scenario: Sums amounts
- **WHEN** payments are passed
- **THEN** the `Total Amount` card shows the formatted sum of Scheduled + Pending amounts

#### Scenario: Counts completed and failed
- **WHEN** payments are passed
- **THEN** the `Completed` card shows the correct count and the `Failed` card shows the correct count

#### Scenario: Empty payments
- **WHEN** an empty array is passed
- **THEN** all cards show zero values

### Requirement: UpcomingTable tests
The `UpcomingTable` component SHALL be tested for filtering, sorting, and limiting results.

#### Scenario: Shows top 5 upcoming
- **WHEN** payments with various statuses and dates are passed
- **THEN** only Scheduled/Pending payments are shown, sorted by date, limited to 5

#### Scenario: Empty state
- **WHEN** no Scheduled or Pending payments exist
- **THEN** the text `'No upcoming payments.'` is displayed

### Requirement: ErrorBoundary tests
The `ErrorBoundary` component SHALL be tested for catching errors and recovery.

#### Scenario: Renders children normally
- **WHEN** children render without errors
- **THEN** the children are visible

#### Scenario: Catches error and shows fallback
- **WHEN** a child component throws an error
- **THEN** the fallback UI with `'Something went wrong'` is displayed

#### Scenario: Try Again resets error
- **WHEN** the user clicks the `'Try Again'` button
- **THEN** the error state is cleared and children are rendered again

### Requirement: StatusChip renders correct color
The `StatusChip` component SHALL render the correct MUI Chip color for each status.

#### Scenario: Known statuses
- **WHEN** `StatusChip` receives status `'Completed'`
- **THEN** a Chip with color `'success'` is rendered

#### Scenario: Unknown status
- **WHEN** `StatusChip` receives an unknown status string
- **THEN** a Chip with color `'default'` is rendered
