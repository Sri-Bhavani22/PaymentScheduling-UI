import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats INR by default', () => {
    const result = formatCurrency(1000);
    expect(result).toContain('1,000');
    expect(result).toContain('₹');
  });

  it('formats USD', () => {
    const result = formatCurrency(1000, 'USD');
    expect(result).toContain('$');
    expect(result).toContain('1,000.00');
  });

  it('formats EUR', () => {
    const result = formatCurrency(1000, 'EUR');
    expect(result).toContain('€');
  });

  it('formats GBP', () => {
    const result = formatCurrency(1000, 'GBP');
    expect(result).toContain('£');
  });

  it('falls back to en-IN locale for unknown currency', () => {
    const result = formatCurrency(1000, 'JPY');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('formats zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0.00');
  });

  it('formats negative values', () => {
    const result = formatCurrency(-500);
    expect(result).toContain('500');
  });

  it('formats large values', () => {
    const result = formatCurrency(9999999.99);
    expect(result).toContain('99');
  });
});