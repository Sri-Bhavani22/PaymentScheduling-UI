## Why

The UI currently uses "Payee" terminology (e.g., "Payee Name", "Payee Details") which is inconsistent with the broader domain language of the application. The application is a **Payment Scheduling** system, and "Payment Details" better describes the information being captured. This rename improves clarity and consistency across the entire codebase — from UI labels, to data field names, component names, mock data, validation schemas, and tests.

## What Changes

- **BREAKING**: Rename the `payeeName` data field to `paymentName` across the entire codebase (mock data, services, components, hooks, tests)
- Rename all user-visible "Payee" labels to "Payment" equivalents:
  - Stepper step label: `'Payee Details'` → `'Recipient Details'` (to avoid collision with existing `'Payment Details'` step)
  - Column headers: `'Payee Name'` → `'Payment Name'`
  - Table header: `'Payee'` → `'Payment Name'`
  - Form field label: `'Payee Name'` → `'Payment Name'`
  - Review section header: `'Payee Details'` → `'Recipient Details'`
  - Review field label: `'Payee Name'` → `'Payment Name'`
  - Validation message: `'Payee name is required'` → `'Payment name is required'`
- Rename `PayeeStep` component → `RecipientStep` (file and component name)
- Rename `payeeSchema` validation export → `recipientSchema`
- Update all test assertions that match on "Payee" text or `payeeName` field

## Capabilities

### New Capabilities
- `rename-payee-fields`: Full rename of the "Payee" terminology and `payeeName` data field to "Payment"/"Payment Name" terminology and `paymentName` field across UI labels, data layer, components, mock data, validation, and tests.

### Modified Capabilities

## Impact

- **Components**: `PayeeStep.jsx` (renamed to `RecipientStep.jsx`), `PaymentColumns.jsx`, `PaymentTable/index.jsx`, `UpcomingTable.jsx`, `ScheduleCalendar/index.jsx`, `PaymentCard/index.jsx`, `PaymentForm/index.jsx`, `ReviewStep.jsx`
- **Validation**: `validationSchema.js` — `payeeSchema` renamed, `payeeName` field key renamed
- **API layer**: `paymentService.js` — filter logic references `payeeName`
- **Mock data**: `payments.json` — all 20 entries have `payeeName` field
- **Hooks**: `usePayments.js` — passes through `payeeName` data
- **Tests**: ~15 test files contain `payeeName` or "Payee" text assertions that need updating
- **No backend API changes** — this app uses local mock data, so the rename is self-contained
