## Why

The project has zero test coverage — no test runner, no test files, no testing libraries. Any code change is a blind push. Adding comprehensive unit and integration tests (targeting 80%+ coverage) will catch regressions early, document expected behavior, and enable confident refactoring as the codebase grows.

## What Changes

- Add Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, and jsdom as dev dependencies
- Add Vitest configuration in ite.config.js
- Add a shared test setup file (src/test/setup.js) and a test utilities wrapper (src/test/test-utils.jsx) providing all required providers (QueryClient, Theme, Auth, Notification, Router)
- Add ~155-200 unit/integration tests across 5 tiers:
  - **Tier 1** — Pure utility functions and Yup validation schemas (~30-40 tests)
  - **Tier 2** — API service layer: mock-mode CRUD, axios interceptors (~22-29 tests)
  - **Tier 3** — Custom hooks (React Query wrappers) and context providers (~23-30 tests)
  - **Tier 4** — Components with business logic: PaymentForm stepper, PaymentTable sort/filter/paginate/export, ScheduleCalendar, SummaryCards aggregation, ErrorBoundary (~58-77 tests)
  - **Tier 5** — Page-level integration tests: DashboardPage, PaymentDetailPage, PaymentListPage, SchedulePage (~21-27 tests)
- Add 	est and 	est:coverage npm scripts

## Capabilities

### New Capabilities
- 	est-infrastructure: Vitest setup, configuration, shared test utilities, and provider wrappers
- unit-tests-utils: Tests for pure utility functions (formatCurrency, formatDate, validators) and Yup validation schemas
- unit-tests-api: Tests for API service layer (paymentService, scheduleService, axiosInstance)
- unit-tests-hooks-contexts: Tests for custom React Query hooks and context providers (Auth, Notification, Theme)
- integration-tests-components: Tests for business-logic-heavy components (PaymentForm, PaymentTable, ScheduleCalendar, DashboardWidgets, ErrorBoundary)
- integration-tests-pages: Page-level tests for DashboardPage, PaymentDetailPage, PaymentListPage, SchedulePage, CreatePaymentPage, NotFoundPage

### Modified Capabilities

_None — no existing specs or requirements are changing._

## Impact

- **Dependencies**: New devDependencies — vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
- **Config**: ite.config.js gains a 	est block; package.json gains 	est and 	est:coverage scripts
- **New files**: ~30 test files across __tests__/ directories, plus src/test/setup.js and src/test/test-utils.jsx
- **Existing code**: No changes to production source files
- **CI**: Test scripts can be wired into CI pipelines after this change
