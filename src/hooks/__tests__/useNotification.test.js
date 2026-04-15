import { describe, it, expect } from 'vitest';
import { useNotification } from '../useNotification';

describe('useNotification re-export', () => {
  it('exports useNotification function', () => {
    expect(typeof useNotification).toBe('function');
  });
});