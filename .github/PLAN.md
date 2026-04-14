# Payment Scheduling UI — Implementation Plan

## 📌 Project Overview

Build a **React 19** single-page application for creating, viewing, editing, and managing scheduled payments. The app uses **Vite** as the build tool, **Material UI** for the component library, and follows modern React patterns.

---

## Phase 1 — Project Scaffolding & Configuration

### 1.1 Initialize Vite + React project
```bash
npm create vite@latest . -- --template react
npm install
```

### 1.2 Install core dependencies
```bash
# UI Framework
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Date pickers
npm install @mui/x-date-pickers dayjs

# Routing
npm install react-router-dom

# Forms & Validation
npm install react-hook-form yup @hookform/resolvers

# HTTP & Server State
npm install axios @tanstack/react-query

# Dev dependencies
npm install -D eslint prettier
```

### 1.3 Configure project structure
```
src/
├── api/                    # Axios instance & service modules
│   ├── axiosInstance.js
│   ├── paymentService.js
│   └── scheduleService.js
├── assets/                 # Static assets (logos, images)
├── components/             # Reusable UI components
│   ├── common/             # Buttons, Inputs, Loaders, ErrorBoundary
│   ├── layout/             # AppBar, Sidebar, Footer
│   └── payments/           # Payment-specific components
│       ├── PaymentForm/
│       ├── PaymentTable/
│       ├── PaymentCard/
│       ├── ScheduleCalendar/
│       └── PaymentStepper/
├── contexts/               # React Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/                  # Custom hooks
│   ├── usePayments.js
│   ├── useSchedule.js
│   └── useNotification.js
├── pages/                  # Route-level page components
│   ├── DashboardPage.jsx
│   ├── CreatePaymentPage.jsx
│   ├── PaymentListPage.jsx
│   ├── PaymentDetailPage.jsx
│   ├── SchedulePage.jsx
│   └── NotFoundPage.jsx
├── routes/                 # Route definitions
│   └── AppRoutes.jsx
├── theme/                  # MUI theme customization
│   └── theme.js
├── utils/                  # Helper functions
│   ├── formatCurrency.js
│   ├── formatDate.js
│   └── validators.js
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

### 1.4 Set up MUI Theme
- Custom color palette (primary: brand blue, secondary: green for success)
- Typography scale
- Component-level overrides (rounded buttons, card elevation)

### 1.5 Set up React Router
- Define routes in `AppRoutes.jsx`
- Wrap app in `BrowserRouter`
- Add route guards for authenticated pages (future use)

**Deliverable:** Empty app running with routing, MUI theme, and folder structure.

---

## Phase 2 — Layout & Navigation

### 2.1 App Shell
- **AppBar** with logo, app title, notification bell, user avatar
- **Sidebar** (collapsible) with navigation links:
  - Dashboard
  - Create Payment
  - Payment List
  - Schedule
- **Main Content Area** with router outlet
- **Footer** (minimal)

### 2.2 Responsive Design
- Sidebar collapses to hamburger menu on mobile (`<768px`)
- Content fills available width
- MUI `useMediaQuery` for breakpoints

**Deliverable:** Navigable shell with all routes accessible.

---

## Phase 3 — Dashboard Page

### 3.1 Summary Cards (top row)
| Card               | Data                        | Icon            |
|--------------------|-----------------------------|-----------------|
| Total Scheduled    | Count of upcoming payments  | CalendarMonth   |
| Total Amount       | Sum of scheduled amounts    | AttachMoney     |
| Completed Today    | Payments processed today    | CheckCircle     |
| Failed Payments    | Payments that failed        | Error           |

### 3.2 Upcoming Payments Table
- Next 5 upcoming payments in a compact `DataGrid`
- Columns: Payee, Amount, Date, Status, Action (View)

### 3.3 Mini Calendar Widget
- Highlight dates that have scheduled payments
- Click date → navigate to schedule page filtered by that date

**Deliverable:** Functional dashboard with mock data.

---

## Phase 4 — Create Payment Page (Multi-step Form)

### 4.1 Payment Stepper (3 steps)

**Step 1 — Payee Details**
| Field           | Type          | Validation                     |
|-----------------|---------------|--------------------------------|
| Payee Name      | Text          | Required, 2-100 chars          |
| Account Number  | Text          | Required, numeric, 8-16 digits |
| Bank / IFSC     | Text          | Required, valid format          |
| Email           | Email         | Optional, valid email format   |

**Step 2 — Payment Details**
| Field           | Type           | Validation                     |
|-----------------|----------------|--------------------------------|
| Amount          | Number (currency) | Required, > 0, max 10,000,000 |
| Currency        | Select         | INR, USD, EUR, GBP             |
| Payment Type    | Radio          | One-time / Recurring           |
| Frequency       | Select         | Daily / Weekly / Monthly (shown if Recurring) |
| Start Date      | Date Picker    | Required, >= today             |
| End Date        | Date Picker    | Required if Recurring, > Start |
| Description     | Textarea       | Optional, max 250 chars        |

**Step 3 — Review & Confirm**
- Read-only summary of all fields
- Edit button per section to jump back
- "Schedule Payment" button

### 4.2 Form Architecture
- `useForm()` with Yup resolver
- Step validation: validate only current step's fields before advancing
- Success → redirect to Payment Detail page with toast notification

**Deliverable:** Working multi-step form with validation and mock submission.

---

## Phase 5 — Payment List Page

### 5.1 DataGrid Table
| Column       | Type    | Features                    |
|--------------|---------|-----------------------------|
| Payment ID   | String  | Sortable                    |
| Payee Name   | String  | Sortable, Filterable        |
| Amount       | Currency| Sortable, right-aligned     |
| Scheduled Date | Date  | Sortable, Filterable        |
| Frequency    | Chip    | One-time / Weekly / Monthly |
| Status       | Chip    | Pending / Completed / Failed|
| Actions      | Buttons | View, Edit, Cancel          |

### 5.2 Toolbar
- Search bar (filter by payee name)
- Status filter dropdown
- Date range filter
- "New Payment" button
- Export to CSV button

### 5.3 Features
- Pagination (server-side ready, client-side with mock data)
- Row click → navigate to Payment Detail
- Bulk selection → bulk cancel

**Deliverable:** Searchable, sortable payment list with mock data.

---

## Phase 6 — Payment Detail Page

### 6.1 Content
- Payment summary card (payee, amount, dates, status)
- Timeline / history of payment events:
  - Created → Scheduled → Processing → Completed/Failed
- Actions: Edit, Cancel, Retry (if failed)
- Related recurring payments (if part of a series)

**Deliverable:** Detail page with mock timeline data.

---

## Phase 7 — Schedule / Calendar Page

### 7.1 Calendar View
- Month view calendar showing payment dots on dates
- Click date → expand to see list of payments for that day
- Color coding by status (blue: pending, green: completed, red: failed)

### 7.2 List View Toggle
- Switch between calendar and chronological list view
- Group by date

**Deliverable:** Interactive calendar with mock scheduled payments.

---

## Phase 8 — API Integration Layer

### 8.1 Axios Setup
```javascript
// src/api/axiosInstance.js
- Base URL from environment variable (VITE_API_BASE_URL)
- Request interceptor: attach auth token
- Response interceptor: handle 401 (redirect to login), 500 (toast error)
```

### 8.2 Service Modules
```javascript
// paymentService.js
- getPayments(params)       → GET /api/payments
- getPaymentById(id)        → GET /api/payments/:id
- createPayment(data)       → POST /api/payments
- updatePayment(id, data)   → PUT /api/payments/:id
- cancelPayment(id)         → DELETE /api/payments/:id

// scheduleService.js
- getSchedule(month, year)  → GET /api/schedule
- getScheduleByDate(date)   → GET /api/schedule/:date
```

### 8.3 TanStack Query Hooks
```javascript
// hooks/usePayments.js
- usePayments(filters)       → useQuery
- usePayment(id)             → useQuery
- useCreatePayment()         → useMutation
- useUpdatePayment()         → useMutation
- useCancelPayment()         → useMutation
```

### 8.4 Mock Data (until backend is ready)
- `src/mocks/payments.json` — 20+ sample payment records
- Service modules conditionally return mock data when `VITE_USE_MOCKS=true`

**Deliverable:** Complete API layer with mock data fallback.

---

## Phase 9 — Notifications & Error Handling

### 9.1 Toast Notifications
- MUI `Snackbar` + `Alert` component
- `NotificationContext` + `useNotification()` hook
- Types: success, error, warning, info

### 9.2 Error Boundary
- Global error boundary wrapping the app
- Fallback UI with "Something went wrong" message and retry button

### 9.3 Loading States
- Skeleton loaders on dashboard cards and tables
- Spinner overlay during form submission

**Deliverable:** Consistent error handling and loading UX.

---

## Phase 10 — Polish & Optimization

### 10.1 Performance
- `React.memo` on list items and cards
- `useMemo` / `useCallback` where profiling shows benefit
- Lazy-load route pages with `React.lazy` + `Suspense`
- Bundle analysis with `rollup-plugin-visualizer`

### 10.2 Accessibility Audit
- Tab order verification
- Screen reader testing
- Color contrast check

### 10.3 Final Cleanup
- Remove unused imports and dead code
- Consistent file naming and exports
- README update with setup instructions

**Deliverable:** Production-ready, optimized UI.

---

## Execution Order (Quick Reference)

| Phase | Description              | Dependencies |
|-------|--------------------------|-------------|
| 1     | Scaffolding & Config     | None        |
| 2     | Layout & Navigation      | Phase 1     |
| 3     | Dashboard Page           | Phase 2     |
| 4     | Create Payment Form      | Phase 2     |
| 5     | Payment List Page        | Phase 2     |
| 6     | Payment Detail Page      | Phase 5     |
| 7     | Schedule / Calendar Page | Phase 2     |
| 8     | API Integration Layer    | Phase 3-7   |
| 9     | Notifications & Errors   | Phase 2     |
| 10    | Polish & Optimization    | All         |

> **Phases 3, 4, 5, 7, 9 can be developed in parallel** after Phase 2 is complete.

---

## How to Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCKS=true
```

---

*Plan created: April 14, 2026*
