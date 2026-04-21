import { describe, it, expect } from 'vitest';
import { recipientSchema, paymentSchema, fullSchema } from '../validationSchema';

describe('recipientSchema', () => {
  const validRecipient = {
    paymentName: 'John Doe',
    accountNumber: '12345678',
    bankIfsc: 'SBIN0001234',
  };

  it('passes with valid data', async () => {
    await expect(recipientSchema.validate(validRecipient)).resolves.toBeDefined();
  });

  it('fails when required fields are missing', async () => {
    await expect(recipientSchema.validate({})).rejects.toThrow();
  });

  it('fails when accountNumber is too short', async () => {
    await expect(
      recipientSchema.validate({ ...validRecipient, accountNumber: '1234' })
    ).rejects.toThrow(/8-16 digits/);
  });

  it('fails when accountNumber is too long', async () => {
    await expect(
      recipientSchema.validate({ ...validRecipient, accountNumber: '12345678901234567' })
    ).rejects.toThrow(/8-16 digits/);
  });

  it('fails when bankIfsc has invalid format', async () => {
    await expect(
      recipientSchema.validate({ ...validRecipient, bankIfsc: 'INVALID' })
    ).rejects.toThrow(/IFSC/);
  });

  it('passes with optional email', async () => {
    await expect(
      recipientSchema.validate({ ...validRecipient, email: 'test@example.com' })
    ).resolves.toBeDefined();
  });

  it('fails with invalid email', async () => {
    await expect(
      recipientSchema.validate({ ...validRecipient, email: 'invalid' })
    ).rejects.toThrow(/email/i);
  });
});

describe('paymentSchema', () => {
  const validPayment = {
    amount: 100,
    currency: 'INR',
    paymentType: 'One-time',
    startDate: '2026-04-20',
  };

  it('passes with valid data', async () => {
    await expect(paymentSchema.validate(validPayment)).resolves.toBeDefined();
  });

  it('fails when amount is 0', async () => {
    await expect(
      paymentSchema.validate({ ...validPayment, amount: 0 })
    ).rejects.toThrow();
  });

  it('fails when amount is negative', async () => {
    await expect(
      paymentSchema.validate({ ...validPayment, amount: -10 })
    ).rejects.toThrow();
  });

  it('fails when amount exceeds max', async () => {
    await expect(
      paymentSchema.validate({ ...validPayment, amount: 10000001 })
    ).rejects.toThrow(/10,000,000/);
  });

  it('requires frequency when paymentType is Recurring', async () => {
    await expect(
      paymentSchema.validate(
        { ...validPayment, paymentType: 'Recurring', endDate: '2026-12-31' }
      )
    ).rejects.toThrow(/[Ff]requency/);
  });

  it('requires endDate when paymentType is Recurring', async () => {
    await expect(
      paymentSchema.validate({
        ...validPayment,
        paymentType: 'Recurring',
        frequency: 'Monthly',
      })
    ).rejects.toThrow(/[Ee]nd date/);
  });

  it('passes for Recurring with frequency and endDate', async () => {
    await expect(
      paymentSchema.validate({
        ...validPayment,
        paymentType: 'Recurring',
        frequency: 'Monthly',
        endDate: '2026-12-31',
      })
    ).resolves.toBeDefined();
  });

  it('fails when description exceeds 250 characters', async () => {
    await expect(
      paymentSchema.validate({ ...validPayment, description: 'a'.repeat(251) })
    ).rejects.toThrow(/250/);
  });
});

describe('fullSchema', () => {
  it('passes with complete valid data', async () => {
    const completeData = {
      paymentName: 'John Doe',
      accountNumber: '12345678',
      bankIfsc: 'SBIN0001234',
      amount: 100,
      currency: 'INR',
      paymentType: 'One-time',
      startDate: '2026-04-20',
    };
    await expect(fullSchema.validate(completeData)).resolves.toBeDefined();
  });
});