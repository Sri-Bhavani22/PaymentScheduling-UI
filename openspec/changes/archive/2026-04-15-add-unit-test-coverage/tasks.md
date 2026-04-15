## 1. Test Infrastructure Setup

- [x] 1.1 Install dev dependencies: vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
- [x] 1.2 Add Vitest `test` configuration block to `vite.config.js` with jsdom environment, setup files, and coverage settings
- [x] 1.3 Add `test` and `test:coverage` scripts to `package.json`
- [x] 1.4 Create `src/test/setup.js` — import @testing-library/jest-dom and configure afterEach cleanup
- [x] 1.5 Create `src/test/test-utils.jsx` — export a custom `render` wrapping QueryClientProvider (fresh per call), ThemeProvider, AuthProvider, NotificationProvider, and MemoryRouter

## 2. Utility and Schema Tests (Tier 1)

- [x] 2.1 Create `src/utils/__tests__/formatCurrency.test.js` — test INR default, USD/EUR/GBP, unknown currency fallback, zero/negative/large values
- [x] 2.2 Create `src/utils/__tests__/formatDate.test.js` — test default format, custom format, Date object input, formatDateTime output
- [x] 2.3 Create `src/utils/__tests__/validators.test.js` — test isValidIFSC (valid, lowercase, wrong format, too short), isNumericString (digits, mixed, empty), getStatusColor (all 6 statuses + unknown)
- [x] 2.4 Create `src/components/payments/PaymentForm/__tests__/validationSchema.test.js` — test payeeSchema (required fields, account regex, IFSC regex, optional email), paymentSchema (amount constraints, conditional frequency/endDate for Recurring, description max length), fullSchema combined

## 3. API Service Tests (Tier 2)

- [x] 3.1 Create `src/api/__tests__/axiosInstance.test.js` — test request interceptor (token attached when present, omitted when absent), response interceptor (401 clears token + redirects, non-401 passes through)
- [x] 3.2 Create `src/api/__tests__/paymentService.test.js` — test mock mode: getPayments (all, filter by status, filter by search), getPaymentById (found, not found throws), createPayment (generates ID, Scheduled status, timeline), updatePayment (merges data), cancelPayment (sets Cancelled)
- [x] 3.3 Create `src/api/__tests__/scheduleService.test.js` — test mock mode: getSchedule (filters by month/year), getScheduleByDate (filters by exact date), empty results for no matches

## 4. Hook and Context Tests (Tier 3)

- [x] 4.1 Create `src/hooks/__tests__/usePayments.test.js` — test usePayments (fetches data, passes filters), usePayment (fetches by id, disabled when null), useCreatePayment (invalidates queries on success), useCancelPayment (invalidates on success)
- [x] 4.2 Create `src/hooks/__tests__/useSchedule.test.js` — test useSchedule (disabled when params undefined), useScheduleByDate (disabled when date falsy)
- [x] 4.3 Create `src/contexts/__tests__/AuthContext.test.jsx` — test initial user state, login updates user, logout clears user + removes token, useAuth outside provider throws
- [x] 4.4 Create `src/contexts/__tests__/NotificationContext.test.jsx` — test notify opens snackbar, clickaway does not close, useNotification outside provider throws
- [x] 4.5 Create `src/contexts/__tests__/ThemeContext.test.jsx` — test default light mode, toggleTheme switches to dark, useThemeMode outside provider throws

## 5. Component Tests (Tier 4)

- [x] 5.1 Create `src/components/payments/PaymentForm/__tests__/index.test.jsx` — test initial step rendering, validation gates Next, step navigation forward/back, ReviewStep data display, Edit buttons jump to step, successful submission (navigate + notify), failed submission (error notify)
- [x] 5.2 Create `src/components/payments/PaymentForm/__tests__/PaymentStep.test.jsx` — test conditional frequency and endDate fields appear only when paymentType is Recurring
- [x] 5.3 Create `src/components/payments/PaymentTable/__tests__/index.test.jsx` — test renders rows, search filters, status filter, column sort toggle, pagination, row click navigates, CSV export generates correct content
- [x] 5.4 Create `src/components/payments/PaymentTable/__tests__/PaymentColumns.test.js` — test column definitions return correct fields and formatters
- [x] 5.5 Create `src/components/payments/PaymentCard/__tests__/index.test.jsx` — test displays all payment fields, null payment renders nothing, conditional email/description
- [x] 5.6 Create `src/components/payments/PaymentTimeline/__tests__/index.test.jsx` — test renders events with dates, empty state text, event with reason displayed
- [x] 5.7 Create `src/components/payments/ScheduleCalendar/__tests__/index.test.jsx` — test month header and grid, prev/next navigation, payment date indicators, date selection toggle
- [x] 5.8 Create `src/components/payments/DashboardWidgets/__tests__/SummaryCards.test.jsx` — test scheduled+pending count, amount sum, completed count, failed count, empty payments zeros
- [x] 5.9 Create `src/components/payments/DashboardWidgets/__tests__/UpcomingTable.test.jsx` — test top 5 upcoming sorted by date, empty state message
- [x] 5.10 Create `src/components/payments/DashboardWidgets/__tests__/MiniCalendar.test.jsx` — test month display, prev/next navigation, payment date badges, date click navigates
- [x] 5.11 Create `src/components/common/__tests__/ErrorBoundary.test.jsx` — test renders children, catches error shows fallback, Try Again resets
- [x] 5.12 Create `src/components/common/__tests__/StatusChip.test.jsx` — test known status colors, unknown status defaults

## 6. Page Tests (Tier 5)

- [x] 6.1 Create `src/pages/__tests__/DashboardPage.test.jsx` — test loading state shows skeletons, loaded state renders SummaryCards + UpcomingTable + MiniCalendar
- [x] 6.2 Create `src/pages/__tests__/PaymentListPage.test.jsx` — test loading spinner, loaded state shows PaymentTable
- [x] 6.3 Create `src/pages/__tests__/PaymentDetailPage.test.jsx` — test loading spinner, not found state, renders card + timeline, Cancel/Edit for Scheduled, Retry for Failed, cancel success notification + navigate, cancel failure notification
- [x] 6.4 Create `src/pages/__tests__/SchedulePage.test.jsx` — test loading spinner, default calendar view, toggle to list view
- [x] 6.5 Create `src/pages/__tests__/CreatePaymentPage.test.jsx` — test renders heading and PaymentForm
- [x] 6.6 Create `src/pages/__tests__/NotFoundPage.test.jsx` — test displays 404 content, dashboard button navigates

## 7. Coverage Verification

- [x] 7.1 Run `npm run test:coverage` and verify overall coverage meets 80% threshold across lines, branches, functions, and statements
- [x] 7.2 Identify and address any coverage gaps below 80% in individual source files with meaningful logic
