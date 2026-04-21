## 1. Mock Data & Data Layer

- [x] 1.1 Rename `payeeName` → `paymentName` in all 20 entries in `src/mocks/payments.json`
- [x] 1.2 Rename `payeeName` → `paymentName` in filter logic in `src/api/paymentService.js`

## 2. Validation & Schema

- [x] 2.1 Rename `payeeName` → `paymentName` field key and update error message to "Payment name is required" in `src/components/payments/PaymentForm/validationSchema.js`
- [x] 2.2 Rename `payeeSchema` export → `recipientSchema` in `validationSchema.js`

## 3. Component Rename (PayeeStep → RecipientStep)

- [x] 3.1 Rename file `src/components/payments/PaymentForm/PayeeStep.jsx` → `RecipientStep.jsx`
- [x] 3.2 Rename component `PayeeStep` → `RecipientStep` inside the renamed file
- [x] 3.3 Update form field label from "Payee Name" to "Payment Name" and field name from `payeeName` to `paymentName` in `RecipientStep.jsx`

## 4. PaymentForm Stepper & Imports

- [x] 4.1 Update import from `./PayeeStep` → `./RecipientStep` in `src/components/payments/PaymentForm/index.jsx`
- [x] 4.2 Update `payeeSchema` → `recipientSchema` import and reference in `stepSchemas` in `PaymentForm/index.jsx`
- [x] 4.3 Rename stepper label from `'Payee Details'` → `'Recipient Details'` in `PaymentForm/index.jsx`
- [x] 4.4 Rename `payeeName` → `paymentName` in `defaultValues` in `PaymentForm/index.jsx`
- [x] 4.5 Update `<PayeeStep>` JSX → `<RecipientStep>` in `PaymentForm/index.jsx`

## 5. ReviewStep Labels

- [x] 5.1 Update section header from "Payee Details" → "Recipient Details" in `src/components/payments/PaymentForm/ReviewStep.jsx`
- [x] 5.2 Update field label from "Payee Name" → "Payment Name" and `values.payeeName` → `values.paymentName` in `ReviewStep.jsx`

## 6. Table Components

- [x] 6.1 Rename `headerName` from "Payee Name" → "Payment Name" and `field` stays `paymentName` in `src/components/payments/PaymentTable/PaymentColumns.jsx`
- [x] 6.2 Update column label from "Payee Name" → "Payment Name" and `p.payeeName` → `p.paymentName` references in `src/components/payments/PaymentTable/index.jsx`
- [x] 6.3 Update table header from "Payee" → "Payment Name" and `p.payeeName` → `p.paymentName` in `src/components/payments/DashboardWidgets/UpcomingTable.jsx`

## 7. Display Components

- [x] 7.1 Update `payment.payeeName` → `payment.paymentName` in `src/components/payments/PaymentCard/index.jsx`
- [x] 7.2 Update `p.payeeName` → `p.paymentName` references in `src/components/payments/ScheduleCalendar/index.jsx`
- [x] 7.3 Update `p.payeeName` → `p.paymentName` in `src/pages/SchedulePage.jsx`

## 8. Test Updates — API & Hooks

- [x] 8.1 Update `payeeName` → `paymentName` references in `src/api/__tests__/paymentService.test.js`
- [x] 8.2 Update `payeeName` → `paymentName` references in `src/hooks/__tests__/usePayments.test.jsx`

## 9. Test Updates — Components

- [x] 9.1 Update `payeeName` → `paymentName` and "Payee" text assertions in `src/components/payments/PaymentForm/__tests__/index.test.jsx`
- [x] 9.2 Update `payeeName` → `paymentName` in `src/components/payments/PaymentCard/__tests__/index.test.jsx`
- [x] 9.3 Update `payeeName` → `paymentName` in `src/components/payments/PaymentTable/__tests__/PaymentColumns.test.js`
- [x] 9.4 Update `payeeName` → `paymentName` in `src/components/payments/ScheduleCalendar/__tests__/index.test.jsx`
- [x] 9.5 Update `payeeName` → `paymentName` in `src/components/payments/DashboardWidgets/__tests__/UpcomingTable.test.jsx`
- [x] 9.6 Update `payeeName` → `paymentName` in `src/components/payments/DashboardWidgets/__tests__/MiniCalendar.test.jsx`

## 10. Test Updates — Pages

- [x] 10.1 Update "Payee Details" → "Recipient Details" assertion in `src/pages/__tests__/CreatePaymentPage.test.jsx`
- [x] 10.2 Update `payeeName` → `paymentName` in `src/pages/__tests__/DashboardPage.test.jsx`

## 11. Verification

- [x] 11.1 Run full test suite and verify all tests pass
- [x] 11.2 Global search for any remaining `payeeName`, `PayeeStep`, `payeeSchema`, or "Payee" references in `src/`
