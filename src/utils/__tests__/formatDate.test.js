import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime } from '../formatDate';

describe('formatDate', () => {
  it('returns default format DD MMM YYYY', () => {
    expect(formatDate('2026-03-15')).toBe('15 Mar 2026');
  });

  it('applies custom format', () => {
    expect(formatDate('2026-03-15', 'YYYY/MM/DD')).toBe('2026/03/15');
  });

  it('accepts a Date object', () => {
    const result = formatDate(new Date(2026, 2, 15));
    expect(result).toBe('15 Mar 2026');
  });
});

describe('formatDateTime', () => {
  it('returns date with time in DD MMM YYYY, hh:mm A format', () => {
    const result = formatDateTime('2026-03-15T14:30:00');
    expect(result).toMatch(/15 Mar 2026, \d{2}:\d{2} [AP]M/);
  });
});