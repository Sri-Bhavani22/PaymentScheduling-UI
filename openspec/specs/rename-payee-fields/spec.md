## ADDED Requirements

### Requirement: Payment name data field
The system SHALL use `paymentName` as the data field key for the payment recipient name across all components, services, mock data, and validation schemas. The previous field key `payeeName` SHALL NOT exist anywhere in the codebase.

#### Scenario: Mock data uses paymentName field
- **WHEN** the mock data file `payments.json` is loaded
- **THEN** each payment record SHALL have a `paymentName` field and SHALL NOT have a `payeeName` field

#### Scenario: Payment service filters by paymentName
- **WHEN** a user searches payments with a query string
- **THEN** the service SHALL filter on the `paymentName` field

#### Scenario: Form default values use paymentName
- **WHEN** the payment creation form initializes
- **THEN** the default values object SHALL include `paymentName` (not `payeeName`)

#### Scenario: Validation schema validates paymentName
- **WHEN** the form is submitted without a payment name
- **THEN** the validation error message SHALL read "Payment name is required"

### Requirement: Payment Name column in tables
The system SHALL display "Payment Name" as the column header wherever the payment recipient name is shown in a table.

#### Scenario: Payment list table header
- **WHEN** the payment list table is rendered
- **THEN** the column header for the recipient name SHALL display "Payment Name"

#### Scenario: Dashboard upcoming table header
- **WHEN** the dashboard upcoming payments table is rendered
- **THEN** the table header for the recipient name SHALL display "Payment Name"

### Requirement: Recipient Details stepper label
The payment creation form stepper SHALL display "Recipient Details" as the label for step 0 (the step that collects recipient name, account number, IFSC code, and email).

#### Scenario: Stepper displays Recipient Details
- **WHEN** the payment creation form is rendered
- **THEN** the first stepper label SHALL read "Recipient Details"
- **AND** the second stepper label SHALL remain "Payment Details"

#### Scenario: Review section header shows Recipient Details
- **WHEN** the user reaches the Review & Confirm step
- **THEN** the review section for recipient information SHALL be titled "Recipient Details"

### Requirement: Payment Name form field label
The form field for entering the payment recipient name SHALL display "Payment Name" as its label.

#### Scenario: Form field label on create payment
- **WHEN** the payment creation form renders the recipient step
- **THEN** the input field for the recipient name SHALL have the label "Payment Name"

#### Scenario: Review step shows Payment Name label
- **WHEN** the review step is rendered
- **THEN** the field label for the recipient name SHALL display "Payment Name"

### Requirement: RecipientStep component naming
The form step component for recipient details SHALL be named `RecipientStep` (file: `RecipientStep.jsx`). The validation schema export for the recipient step SHALL be named `recipientSchema`.

#### Scenario: RecipientStep component exists
- **WHEN** the payment form imports the recipient step component
- **THEN** it SHALL import from `./RecipientStep` (not `./PayeeStep`)

#### Scenario: recipientSchema export exists
- **WHEN** the validation schema module is imported
- **THEN** it SHALL export `recipientSchema` (not `payeeSchema`)
