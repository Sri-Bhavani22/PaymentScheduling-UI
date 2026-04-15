## ADDED Requirements

### Requirement: Vitest test runner configured
The project SHALL use Vitest as the test runner with jsdom environment configured in vite.config.js.

#### Scenario: Running tests
- **WHEN** a developer runs `npm test`
- **THEN** Vitest executes all `*.test.{js,jsx}` files in the `src/` directory

#### Scenario: Running coverage
- **WHEN** a developer runs `npm run test:coverage`
- **THEN** Vitest generates a coverage report showing line, branch, function, and statement coverage

### Requirement: Testing libraries installed
The project SHALL have @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, and jsdom as devDependencies.

#### Scenario: Dev dependencies present
- **WHEN** a developer runs `npm install`
- **THEN** vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, and jsdom are installed

### Requirement: Global test setup file
The project SHALL have a `src/test/setup.js` file that imports @testing-library/jest-dom for extended matchers and performs cleanup after each test.

#### Scenario: Matchers available globally
- **WHEN** any test file runs
- **THEN** jest-dom matchers such as `toBeInTheDocument`, `toHaveTextContent`, and `toBeDisabled` are available without explicit import

### Requirement: Shared test utilities wrapper
The project SHALL have a `src/test/test-utils.jsx` file that exports a custom `render` function wrapping components in QueryClientProvider, ThemeProvider, AuthProvider, NotificationProvider, and MemoryRouter.

#### Scenario: Rendering a component with all providers
- **WHEN** a test calls `render(<MyComponent />)` using the custom render
- **THEN** the component has access to React Query, theme context, auth context, notification context, and routing

#### Scenario: Fresh QueryClient per test
- **WHEN** each test renders a component
- **THEN** a new QueryClient instance is created to prevent state leaking between tests
