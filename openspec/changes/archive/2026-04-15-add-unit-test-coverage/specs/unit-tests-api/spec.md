## ADDED Requirements

### Requirement: axiosInstance interceptor tests
The axios instance request and response interceptors SHALL be tested for token injection and error handling.

#### Scenario: Auth token attached to requests
- **WHEN** a request is made and `localStorage` contains an `authToken`
- **THEN** the request headers include `Authorization: Bearer <token>`

#### Scenario: No token when absent
- **WHEN** a request is made and `localStorage` does not contain `authToken`
- **THEN** the request headers do not include an `Authorization` header

#### Scenario: 401 response clears token and redirects
- **WHEN** a response returns status 401
- **THEN** `authToken` is removed from `localStorage` and `window.location.href` is set to `/login`

#### Scenario: Non-401 errors pass through
- **WHEN** a response returns status 500
- **THEN** the error is rejected without redirect or token removal

### Requirement: paymentService mock-mode tests
The `paymentService` functions SHALL be tested in mock mode covering CRUD, filtering, and error cases.

#### Scenario: getPayments returns all payments
- **WHEN** `getPayments()` is called with no filters
- **THEN** it returns all payments from the mock store

#### Scenario: getPayments filters by status
- **WHEN** `getPayments({ status: 'Pending' })` is called
- **THEN** it returns only payments with status `'Pending'`

#### Scenario: getPayments filters by search
- **WHEN** `getPayments({ search: 'john' })` is called
- **THEN** it returns only payments whose payeeName contains `'john'` (case-insensitive)

#### Scenario: getPaymentById returns matching payment
- **WHEN** `getPaymentById('PAY-001')` is called with an existing ID
- **THEN** it returns the matching payment object

#### Scenario: getPaymentById throws for missing ID
- **WHEN** `getPaymentById('NONEXISTENT')` is called
- **THEN** it throws an error

#### Scenario: createPayment adds to store
- **WHEN** `createPayment({ payeeName: 'Test', amount: 100 })` is called
- **THEN** it returns a new payment with a generated ID, `'Scheduled'` status, `createdAt` timestamp, and a timeline array

#### Scenario: updatePayment merges data
- **WHEN** `updatePayment('PAY-001', { amount: 999 })` is called
- **THEN** the payment in the store has the updated amount while retaining other fields

#### Scenario: cancelPayment sets status to Cancelled
- **WHEN** `cancelPayment('PAY-001')` is called
- **THEN** the returned payment has status `'Cancelled'`

### Requirement: scheduleService mock-mode tests
The `scheduleService` functions SHALL be tested in mock mode for month/year and date filtering.

#### Scenario: getSchedule filters by month and year
- **WHEN** `getSchedule(3, 2026)` is called
- **THEN** it returns only payments whose `startDate` falls in April 2026 (month index 3)

#### Scenario: getScheduleByDate filters by exact date
- **WHEN** `getScheduleByDate('2026-04-15')` is called
- **THEN** it returns only payments with `startDate` equal to `'2026-04-15'`

#### Scenario: No matching schedule returns empty
- **WHEN** `getSchedule(11, 2099)` is called for a month with no payments
- **THEN** it returns an empty array
