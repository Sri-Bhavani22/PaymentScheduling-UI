## ADDED Requirements

### Requirement: formatCurrency tests
The `formatCurrency` utility SHALL be tested for all supported currency codes and edge cases.

#### Scenario: Default INR formatting
- **WHEN** `formatCurrency(1000)` is called with no currency argument
- **THEN** it returns a string formatted with INR locale (en-IN) and currency symbol

#### Scenario: Supported currency codes
- **WHEN** `formatCurrency(1000, 'USD')` or `formatCurrency(1000, 'EUR')` or `formatCurrency(1000, 'GBP')` is called
- **THEN** it returns a string formatted with the corresponding locale and currency symbol

#### Scenario: Unknown currency code
- **WHEN** `formatCurrency(1000, 'JPY')` is called with an unmapped currency
- **THEN** it falls back to en-IN locale

#### Scenario: Edge values
- **WHEN** `formatCurrency(0)`, `formatCurrency(-500)`, or `formatCurrency(9999999.99)` is called
- **THEN** it returns properly formatted strings with 2 decimal places

### Requirement: formatDate tests
The `formatDate` and `formatDateTime` utilities SHALL be tested for various input types and formats.

#### Scenario: Default format
- **WHEN** `formatDate('2026-03-15')` is called with no format argument
- **THEN** it returns `'15 Mar 2026'`

#### Scenario: Custom format
- **WHEN** `formatDate('2026-03-15', 'YYYY/MM/DD')` is called
- **THEN** it returns `'2026/03/15'`

#### Scenario: Date object input
- **WHEN** `formatDate(new Date(2026, 2, 15))` is called with a Date object
- **THEN** it returns the formatted date string

#### Scenario: formatDateTime output
- **WHEN** `formatDateTime('2026-03-15T14:30:00')` is called
- **THEN** it returns a string in `'DD MMM YYYY, hh:mm A'` format including time

### Requirement: validators tests
The `isValidIFSC`, `isNumericString`, and `getStatusColor` functions SHALL be tested for valid and invalid inputs.

#### Scenario: Valid IFSC code
- **WHEN** `isValidIFSC('SBIN0001234')` is called
- **THEN** it returns `true`

#### Scenario: Invalid IFSC codes
- **WHEN** `isValidIFSC('sbin0001234')` (lowercase), `isValidIFSC('SBIN1001234')` (missing 0 at position 5), or `isValidIFSC('SBI')` (too short) is called
- **THEN** it returns `false`

#### Scenario: Numeric string validation
- **WHEN** `isNumericString('12345')` is called
- **THEN** it returns `true`

#### Scenario: Non-numeric strings
- **WHEN** `isNumericString('123a5')` or `isNumericString('')` is called
- **THEN** it returns `false`

#### Scenario: Status color mapping
- **WHEN** `getStatusColor('Completed')` is called
- **THEN** it returns `'success'`

#### Scenario: Unknown status color
- **WHEN** `getStatusColor('Unknown')` is called
- **THEN** it returns `'default'`

### Requirement: validationSchema tests
The Yup schemas (`payeeSchema`, `paymentSchema`, `fullSchema`) SHALL be tested for all fields and conditional rules.

#### Scenario: Valid payee data passes
- **WHEN** `payeeSchema.validate({ payeeName: 'John', accountNumber: '12345678', bankIfsc: 'SBIN0001234' })` is called
- **THEN** validation passes without errors

#### Scenario: Missing required payee fields
- **WHEN** `payeeSchema.validate({})` is called
- **THEN** validation fails with errors for payeeName, accountNumber, and bankIfsc

#### Scenario: Account number regex
- **WHEN** `payeeSchema` validates an accountNumber shorter than 8 digits or longer than 16 digits
- **THEN** validation fails with a regex error message

#### Scenario: IFSC format validation
- **WHEN** `payeeSchema` validates a bankIfsc that does not match `/^[A-Z]{4}0[A-Z0-9]{6}$/`
- **THEN** validation fails with an invalid IFSC error

#### Scenario: Optional email validation
- **WHEN** `payeeSchema` validates with `email: 'invalid'`
- **THEN** validation fails with an invalid email error

#### Scenario: Valid payment data passes
- **WHEN** `paymentSchema.validate({ amount: 100, currency: 'INR', paymentType: 'One-time', startDate: '2026-04-20' })` is called
- **THEN** validation passes

#### Scenario: Amount constraints
- **WHEN** amount is 0, negative, or greater than 10000000
- **THEN** validation fails with the appropriate error message

#### Scenario: Conditional frequency for recurring
- **WHEN** paymentType is `'Recurring'` and frequency is empty
- **THEN** validation fails requiring frequency

#### Scenario: Conditional endDate for recurring
- **WHEN** paymentType is `'Recurring'` and endDate is empty
- **THEN** validation fails requiring end date

#### Scenario: Description max length
- **WHEN** description exceeds 250 characters
- **THEN** validation fails with max length error

#### Scenario: Full schema combines both
- **WHEN** `fullSchema.validate(completeData)` is called with valid payee + payment data
- **THEN** validation passes
