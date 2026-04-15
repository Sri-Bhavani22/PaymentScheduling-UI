## ADDED Requirements

### Requirement: usePayments hook tests
The React Query hooks in `usePayments.js` SHALL be tested using `renderHook` with a QueryClient wrapper.

#### Scenario: usePayments fetches data
- **WHEN** `usePayments()` is called
- **THEN** it calls `getPayments` and returns the payment data

#### Scenario: usePayments passes filters
- **WHEN** `usePayments({ status: 'Pending' })` is called
- **THEN** it includes the filters in the query key

#### Scenario: usePayment disabled when no id
- **WHEN** `usePayment(null)` is called
- **THEN** the query is not executed (`enabled: false`)

#### Scenario: useCreatePayment invalidates queries on success
- **WHEN** `useCreatePayment` mutation succeeds
- **THEN** queries with key `['payments']` are invalidated

#### Scenario: useCancelPayment invalidates queries on success
- **WHEN** `useCancelPayment` mutation succeeds
- **THEN** queries with key `['payments']` are invalidated

### Requirement: useSchedule hook tests
The React Query hooks in `useSchedule.js` SHALL be tested.

#### Scenario: useSchedule disabled when params undefined
- **WHEN** `useSchedule(undefined, undefined)` is called
- **THEN** the query is not executed

#### Scenario: useScheduleByDate disabled when date falsy
- **WHEN** `useScheduleByDate(null)` is called
- **THEN** the query is not executed

### Requirement: AuthContext tests
The `AuthProvider` and `useAuth` hook SHALL be tested for state management and error handling.

#### Scenario: Initial user state
- **WHEN** `AuthProvider` renders
- **THEN** `useAuth()` returns a user object with name and role

#### Scenario: Login updates user
- **WHEN** `login({ name: 'Jane', role: 'viewer' })` is called
- **THEN** `useAuth()` returns the updated user

#### Scenario: Logout clears user and token
- **WHEN** `logout()` is called
- **THEN** `useAuth()` returns null for user and `authToken` is removed from localStorage

#### Scenario: useAuth outside provider throws
- **WHEN** `useAuth()` is called outside of `AuthProvider`
- **THEN** it throws an error with message `'useAuth must be used within AuthProvider'`

### Requirement: NotificationContext tests
The `NotificationProvider` and `useNotification` hook SHALL be tested.

#### Scenario: notify opens snackbar
- **WHEN** `notify('Success!', 'success')` is called
- **THEN** a Snackbar with the message `'Success!'` and severity `'success'` is displayed

#### Scenario: Clickaway does not close
- **WHEN** a clickaway event fires on the Snackbar
- **THEN** the notification remains open

#### Scenario: useNotification outside provider throws
- **WHEN** `useNotification()` is called outside of `NotificationProvider`
- **THEN** it throws an error with message `'useNotification must be used within NotificationProvider'`

### Requirement: ThemeContext tests
The `ThemeProvider` and `useThemeMode` hook SHALL be tested.

#### Scenario: Default light mode
- **WHEN** `ThemeProvider` renders
- **THEN** `useThemeMode()` returns `mode: 'light'`

#### Scenario: Toggle switches to dark
- **WHEN** `toggleTheme()` is called
- **THEN** `useThemeMode()` returns `mode: 'dark'`

#### Scenario: useThemeMode outside provider throws
- **WHEN** `useThemeMode()` is called outside of `ThemeProvider`
- **THEN** it throws an error
