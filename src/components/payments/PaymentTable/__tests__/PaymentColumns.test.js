import { describe, it, expect, vi } from 'vitest';
import PaymentColumns from '../PaymentColumns';

describe('PaymentColumns', () => {
  const mockNavigate = vi.fn();
  const columns = PaymentColumns(mockNavigate);

  it('returns an array of column definitions', () => {
    expect(Array.isArray(columns)).toBe(true);
    expect(columns.length).toBeGreaterThan(0);
  });

  it('includes expected fields', () => {
    const fields = columns.map((c) => c.field);
    expect(fields).toContain('id');
    expect(fields).toContain('paymentName');
    expect(fields).toContain('amount');
    expect(fields).toContain('startDate');
    expect(fields).toContain('frequency');
    expect(fields).toContain('status');
    expect(fields).toContain('actions');
  });

  it('amount column has a valueFormatter', () => {
    const amountCol = columns.find((c) => c.field === 'amount');
    expect(amountCol.valueFormatter).toBeDefined();
    const result = amountCol.valueFormatter(1000);
    expect(result).toContain('1,000');
  });

  it('startDate column has a valueFormatter', () => {
    const dateCol = columns.find((c) => c.field === 'startDate');
    expect(dateCol.valueFormatter).toBeDefined();
    const result = dateCol.valueFormatter('2026-04-15');
    expect(result).toBeDefined();
  });
});