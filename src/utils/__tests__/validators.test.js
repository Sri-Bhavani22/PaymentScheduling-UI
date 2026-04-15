import { describe, it, expect } from 'vitest';
import { isValidIFSC, isNumericString, getStatusColor } from '../validators';

describe('isValidIFSC', () => {
  it('returns true for valid IFSC', () => {
    expect(isValidIFSC('SBIN0001234')).toBe(true);
  });

  it('returns false for lowercase', () => {
    expect(isValidIFSC('sbin0001234')).toBe(false);
  });

  it('returns false for wrong format (missing 0 at position 5)', () => {
    expect(isValidIFSC('SBIN1001234')).toBe(false);
  });

  it('returns false for too short', () => {
    expect(isValidIFSC('SBI')).toBe(false);
  });
});

describe('isNumericString', () => {
  it('returns true for digit-only string', () => {
    expect(isNumericString('12345')).toBe(true);
  });

  it('returns false for mixed characters', () => {
    expect(isNumericString('123a5')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isNumericString('')).toBe(false);
  });
});

describe('getStatusColor', () => {
  it('returns info for Pending', () => {
    expect(getStatusColor('Pending')).toBe('info');
  });

  it('returns info for Scheduled', () => {
    expect(getStatusColor('Scheduled')).toBe('info');
  });

  it('returns warning for Processing', () => {
    expect(getStatusColor('Processing')).toBe('warning');
  });

  it('returns success for Completed', () => {
    expect(getStatusColor('Completed')).toBe('success');
  });

  it('returns error for Failed', () => {
    expect(getStatusColor('Failed')).toBe('error');
  });

  it('returns default for Cancelled', () => {
    expect(getStatusColor('Cancelled')).toBe('default');
  });

  it('returns default for unknown status', () => {
    expect(getStatusColor('Unknown')).toBe('default');
  });
});