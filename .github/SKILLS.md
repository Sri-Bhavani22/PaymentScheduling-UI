# Payment Scheduling UI — Skills & Technology Stack

## Core Technologies

| Technology       | Version / Detail          | Purpose                                  |
|------------------|---------------------------|------------------------------------------|
| Node.js          | v22.14.0                  | JavaScript runtime                       |
| npm              | 10.9.2                    | Package manager                          |
| React            | 19.x (latest)             | UI library                               |
| React DOM        | 19.x                      | DOM rendering                            |
| React Router DOM | 7.x                       | Client-side routing                      |
| Vite             | 6.x                       | Build tool & dev server (fast HMR)       |

## UI & Styling

| Library               | Purpose                                                |
|-----------------------|--------------------------------------------------------|
| Material UI (MUI) 6.x | Pre-built accessible components (DataGrid, Stepper, Dialog, etc.) |
| @mui/x-date-pickers  | Date picker components for scheduling                  |
| @emotion/react + styled | CSS-in-JS styling engine used by MUI                |
| @mui/icons-material   | Icon set                                               |

## Form & Validation

| Library          | Purpose                                      |
|------------------|----------------------------------------------|
| React Hook Form  | Lightweight, performant form state management |
| Yup              | Schema-based form validation                 |
| @hookform/resolvers | Connect Yup schemas to React Hook Form    |

## State Management

| Library   | Purpose                                                  |
|-----------|----------------------------------------------------------|
| React Context + useReducer | App-level state (auth, theme, notifications) |
| React Query (TanStack Query) v5 | Server-state caching, refetching, polling |

## HTTP & API

| Library | Purpose              |
|---------|----------------------|
| Axios   | HTTP client with interceptors for auth tokens & error handling |

## Date Handling

| Library | Purpose                                    |
|---------|--------------------------------------------|
| Day.js  | Lightweight date manipulation (2 KB gzip)  |

## Developer Experience

| Tool / Config     | Purpose                                  |
|-------------------|------------------------------------------|
| ESLint 9.x        | Linting with flat config                |
| Prettier           | Code formatting                         |
| Vite plugin react  | Fast Refresh for React in Vite          |

## Key Skills Required

### React 19 Patterns
- Functional components only (no class components)
- Hooks: `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`, `useRef`
- Custom hooks for reusable logic (e.g., `usePayments`, `useSchedule`)
- React 19 `use()` hook for reading resources in render

### Component Architecture
- **Atomic Design** approach: atoms → molecules → organisms → pages
- Each component in its own folder: `ComponentName/index.jsx` + `ComponentName.styles.js`
- Prop-types or JSDoc comments for component APIs

### Form Handling Pattern
- One `useForm()` hook per form
- Yup schema co-located with the form component
- Controlled inputs via `Controller` from React Hook Form
- Reusable `FormField` wrapper for consistent layout & error display

### API Layer Pattern
- Centralized Axios instance (`src/api/axiosInstance.js`) with base URL and interceptors
- Service modules per domain: `paymentService.js`, `scheduleService.js`
- TanStack Query hooks wrapping service calls: `usePayments()`, `useCreatePayment()`

### Error Handling
- Axios response interceptor for global error toasts
- React Error Boundaries for runtime crashes
- Form-level and field-level validation messages

### Security Practices
- Input sanitization on all user inputs
- CSRF token handling via Axios interceptors
- No secrets or tokens in client-side code
- Content Security Policy headers (configured on server)
- XSS prevention: avoid `dangerouslySetInnerHTML`

### Accessibility (a11y)
- MUI components provide ARIA attributes out of the box
- Keyboard navigation for date pickers, dialogs, tables
- Color contrast ratios meeting WCAG 2.1 AA
