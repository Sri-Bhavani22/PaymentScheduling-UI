import * as yup from 'yup';

export const recipientSchema = yup.object({
  paymentName: yup
    .string()
    .required('Payment name is required')
    .min(2, 'Minimum 2 characters')
    .max(100, 'Maximum 100 characters'),
  accountNumber: yup
    .string()
    .required('Account number is required')
    .matches(/^\d{8,16}$/, 'Must be 8-16 digits'),
  bankIfsc: yup
    .string()
    .required('Bank/IFSC is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC format (e.g. SBIN0001234)'),
  email: yup.string().email('Invalid email format').notRequired(),
});

export const paymentSchema = yup.object({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Must be greater than 0')
    .max(10000000, 'Maximum 10,000,000'),
  currency: yup.string().required('Currency is required'),
  paymentType: yup.string().required('Payment type is required'),
  frequency: yup.string().when('paymentType', {
    is: 'Recurring',
    then: (schema) => schema.required('Frequency is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().when('paymentType', {
    is: 'Recurring',
    then: (schema) => schema.required('End date is required for recurring payments'),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: yup.string().max(250, 'Maximum 250 characters').notRequired(),
});

export const fullSchema = recipientSchema.concat(paymentSchema);
