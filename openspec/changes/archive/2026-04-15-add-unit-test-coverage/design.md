## Context

The Payment Scheduling UI is a React 19 + Vite 8 application with MUI 9, React Hook Form, React Query, and Yup. It currently has no test runner, no test files, and no testing libraries. The project has ~35 source files across utils, API services, hooks, contexts, components, and pages.

The build tooling is Vite-based, making Vitest the natural test runner choice — it reuses the same config, handles import.meta.env, JSX transform, and module resolution with zero extra setup.

## Goals / Non-Goals

**Goals:**
- Achieve 80%+ code coverage across the entire src/ directory
- Establish a repeatable testing pattern with shared test utilities and provider wrappers
- Test all business logic: validation schemas, API service CRUD, component filtering/sorting/pagination, form stepper flow, and context providers
- Use Vitest + React Testing Library as the testing stack
- Keep tests co-located with source code in __tests__/ directories

**Non-Goals:**
- End-to-end (E2E) testing with Playwright or Cypress — that's a separate concern
- Visual regression / screenshot testing
- Modifying any production source code
- Testing third-party library internals (MUI, React Query, React Hook Form)
- Achieving 100% coverage — diminishing returns on trivial presentational components

## Decisions

### 1. Vitest over Jest

**Choice:** Vitest as the test runner.
**Rationale:** The project uses Vite 8. Vitest reuses the Vite config, natively handles import.meta.env, ESM, and the JSX transform. Jest would require separate Babel/SWC config, import.meta.env polyfills, and ESM workarounds.
**Alternative considered:** Jest — rejected due to config overhead with Vite/ESM projects.

### 2. jsdom as test environment

**Choice:** jsdom environment via itest.config or inline in ite.config.js.
**Rationale:** All components render to DOM. happy-dom is faster but has occasional MUI compatibility issues. jsdom is the safer default.
**Alternative considered:** happy-dom — would revisit if test speed becomes an issue.

### 3. Co-located __tests__/ directories over root-level 	ests/

**Choice:** Test files live in __tests__/ folders alongside source files.
**Rationale:** Keeps tests discoverable next to the code they test. Standard React Testing Library convention. Import paths are short and obvious.
**Alternative considered:** Top-level 	ests/ mirror — rejected because it creates navigation friction and duplicate directory structures.

### 4. Shared test wrapper with all providers

**Choice:** A src/test/test-utils.jsx file that exports a custom ender() wrapping QueryClientProvider, ThemeProvider, AuthProvider, NotificationProvider, and MemoryRouter.
**Rationale:** Almost every component depends on 2+ providers. A shared wrapper eliminates boilerplate and ensures consistent test environments.

### 5. Test mock-mode services directly (no MSW)

**Choice:** Test paymentService.js and scheduleService.js mock-mode paths directly by setting VITE_USE_MOCKS=true.
**Rationale:** The services already have a well-structured mock mode with an in-memory store. Testing this path covers the filtering, CRUD, and error logic. MSW would add a dependency for marginal gain at this stage.
**Alternative considered:** MSW for HTTP-level mocking — deferred; can be added later for true integration tests through React Query.

### 6. Mock React Query hooks for component tests

**Choice:** For component tests (Tier 4 & 5), mock the custom hooks (usePayments, usePayment, etc.) rather than providing a real QueryClient with MSW.
**Rationale:** Component tests should focus on rendering logic, not data fetching. Mocking hooks gives direct control over loading/error/success states without network setup.

### 7. i.setSystemTime() for calendar determinism

**Choice:** Use Vitest's fake timers to lock Date.now() and dayjs() in calendar-related tests.
**Rationale:** MiniCalendar, ScheduleCalendar, and UpcomingTable all compare against "today". Non-deterministic dates cause flaky tests.

## Risks / Trade-offs

- **[Mock drift]** Mock-mode services may diverge from real API behavior over time → Mitigate by adding MSW-based integration tests in a future change
- **[MUI rendering in jsdom]** Some MUI components (DatePicker, portals) render differently in jsdom → Mitigate by targeting user-visible text/roles rather than internal MUI structure
- **[Coverage gaps in trivial components]** Presentational components (LoadingSpinner, Footer) have little logic → Accept; covering them would pad numbers without catching bugs
- **[Import.meta.env in tests]** VITE_USE_MOCKS is read at module level → Mitigate with i.stubEnv() before imports, or use dynamic imports in tests
