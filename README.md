# Payment Scheduling UI

A modern **React 19** single-page application for creating, viewing, editing, and managing scheduled payments. Built with **Vite**, **Material UI**, and **TanStack Query**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![MUI](https://img.shields.io/badge/MUI-6-007FFF?logo=mui)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- **Dashboard** — Summary cards (scheduled, total amount, completed, failed), upcoming payments table, mini calendar
- **Create Payment** — Multi-step form (Payee → Payment Details → Review) with real-time Yup validation
- **Payment List** — Sortable, filterable table with search, status filters, pagination, and CSV export
- **Payment Detail** — Full payment summary with event timeline history, cancel/edit/retry actions
- **Schedule** — Calendar and list view toggle with payment dots and status color coding
- **Dark/Light Theme** — Toggle between themes
- **Responsive Layout** — Collapsible sidebar, mobile-friendly hamburger menu
- **Toast Notifications** — Success/error/warning/info alerts
- **Error Boundary** — Graceful crash recovery with retry

---

## Tech Stack

| Category | Technologies |
|---|---|
| **UI Library** | React 19, React DOM 19 |
| **Build Tool** | Vite 8 |
| **Component Library** | Material UI (MUI) 6, MUI Icons, MUI Lab, MUI X Date Pickers |
| **Routing** | React Router DOM 7 |
| **Forms** | React Hook Form + Yup + @hookform/resolvers |
| **Server State** | TanStack Query (React Query) v5 |
| **HTTP Client** | Axios |
| **Date Handling** | Day.js |
| **Styling** | Emotion (CSS-in-JS) |

---

## Project Structure

```
src/
├── api/                          # Axios instance & service modules
│   ├── axiosInstance.js
│   ├── paymentService.js
│   └── scheduleService.js
├── components/
│   ├── common/                   # ErrorBoundary, FormField, LoadingSpinner, Skeletons, StatusChip
│   ├── layout/                   # AppBar, Sidebar, Footer, MainLayout
│   └── payments/                 # PaymentForm, PaymentTable, PaymentCard, PaymentTimeline, ScheduleCalendar, DashboardWidgets
├── contexts/                     # AuthContext, ThemeContext, NotificationContext
├── hooks/                        # usePayments, useSchedule, useNotification
├── mocks/                        # Mock payment data (20 records)
├── pages/                        # DashboardPage, CreatePaymentPage, PaymentListPage, PaymentDetailPage, SchedulePage, NotFoundPage
├── routes/                       # AppRoutes (lazy-loaded)
├── theme/                        # MUI theme customization
├── utils/                        # formatCurrency, formatDate, validators
├── App.jsx                       # Root component with providers
├── main.jsx                      # Entry point
└── index.css                     # Global styles
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 22.x
- **npm** >= 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Sri-Bhavani22/PaymentScheduling-UI.git
cd PaymentScheduling-UI

# Install dependencies
npm install
```

### Environment Setup

Copy the example env file:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend API base URL |
| `VITE_USE_MOCKS` | `true` | Use in-memory mock data (no backend needed) |

### Run Development Server

```bash
npm run dev
```

The app opens at **http://localhost:3000**.

### Build for Production

```bash
npm run build
npm run preview    # Preview the production build locally
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Summary cards, upcoming payments, mini calendar |
| `/create` | Create Payment | 3-step form with validation |
| `/payments` | Payment List | Searchable, sortable DataGrid |
| `/payments/:id` | Payment Detail | Summary card + timeline |
| `/schedule` | Schedule | Calendar / list toggle view |
| `*` | 404 | Not found page |

---

## Mock Data

The app ships with **20 sample payment records** in `src/mocks/payments.json`. When `VITE_USE_MOCKS=true`, all API calls resolve against an in-memory store — no backend required. New payments created during a session persist until the page is refreshed.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
