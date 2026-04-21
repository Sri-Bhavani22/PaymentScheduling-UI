## Context

The Payment Scheduling UI currently uses "Payee" terminology throughout the codebase — in UI labels, data field names (`payeeName`), component names (`PayeeStep`), validation schemas (`payeeSchema`), mock data, and tests. The application is a Payment Scheduling system, and the terminology should reflect "Payment" semantics consistently.

The app uses local mock data (`src/mocks/payments.json`) with no real backend API, making this a self-contained rename with no external contract concerns.

The payment creation form has a 3-step stepper: `['Payee Details', 'Payment Details', 'Review & Confirm']`. Renaming step 0 to "Payment Details" would collide with step 1. This must be resolved.

## Goals / Non-Goals

**Goals:**
- Rename all user-visible "Payee" labels to use "Payment" terminology
- Rename the `payeeName` data field to `paymentName` across the entire codebase
- Rename `PayeeStep` component and file to `RecipientStep`
- Rename `payeeSchema` validation export to `recipientSchema`
- Resolve the stepper label collision (step 0 "Payee Details" → "Recipient Details", step 1 stays "Payment Details")
- Update all tests that reference old labels or field names
- All existing tests pass after the rename

**Non-Goals:**
- Changing the actual form fields collected (account number, IFSC, email stay the same)
- Modifying any business logic or validation rules
- Adding new features or UI changes beyond the rename
- Renaming other data fields (e.g., `accountNumber`, `bankIfsc`)

## Decisions

### 1. Stepper label: "Recipient Details" for step 0

**Decision**: Rename step 0 from "Payee Details" to "Recipient Details" (not "Payment Details").

**Rationale**: Step 1 is already named "Payment Details" and covers amount/schedule. Using "Recipient Details" for step 0 avoids the collision while accurately describing the step content (name, account number, IFSC, email — these are all about the payment recipient).

**Alternatives considered**:
- "Beneficiary Details" — too formal/banking-specific for a general UI
- "Payment Details" — collision with step 1
- Renaming step 1 instead — more disruptive, step 1 label accurately describes its content

### 2. Data field: `payeeName` → `paymentName`

**Decision**: Rename the data field key from `payeeName` to `paymentName` everywhere.

**Rationale**: The user chose Approach C (full rename), so data fields must change too. `paymentName` is the most natural equivalent that aligns with the "Payment" terminology goal.

**Alternatives considered**:
- `recipientName` — more accurate for the data but mismatches the column header goal of "Payment Name"
- Keep `payeeName` as internal key — inconsistent, confusing for future developers

### 3. Component rename: `PayeeStep` → `RecipientStep`

**Decision**: Rename the component and file to `RecipientStep` to match the new stepper label "Recipient Details".

**Rationale**: The component renders recipient information fields. Naming it `RecipientStep` aligns with both the stepper label and the semantic purpose.

### 4. Implementation order: Bottom-up (data → components → tests)

**Decision**: Rename mock data first, then services, then components, then tests.

**Rationale**: Bottom-up ensures each layer is consistent before the next layer references it. Starting with mock data means the `paymentName` field exists before components try to read it.

## Risks / Trade-offs

- **[Risk] Tests break during rename** → Mitigation: Batch all changes in one pass per file category. Run tests after each batch.
- **[Risk] Missed occurrence of `payeeName`/`Payee`** → Mitigation: Use global search to verify no remaining references after implementation.
- **[Risk] "Payment Name" column header may confuse users** → Mitigation: This is what the user requested. The term is clear in context of a payment list.
