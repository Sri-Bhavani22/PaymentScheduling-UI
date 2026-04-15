import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('scheduleService (mock mode)', () => {
  let scheduleService;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv('VITE_USE_MOCKS', 'true');
    const mod = await import('../scheduleService');
    scheduleService = mod;
  });

  describe('getSchedule', () => {
    it('filters by month and year', async () => {
      // April 2026 = month index 3
      const result = await scheduleService.getSchedule(3, 2026);
      expect(Array.isArray(result.data)).toBe(true);
      result.data.forEach((p) => {
        const date = new Date(p.startDate);
        expect(date.getMonth()).toBe(3);
        expect(date.getFullYear()).toBe(2026);
      });
    });

    it('returns empty for month with no payments', async () => {
      const result = await scheduleService.getSchedule(11, 2099);
      expect(result.data).toEqual([]);
    });
  });

  describe('getScheduleByDate', () => {
    it('filters by exact date', async () => {
      const result = await scheduleService.getScheduleByDate('2026-04-15');
      expect(Array.isArray(result.data)).toBe(true);
      result.data.forEach((p) => {
        expect(p.startDate).toBe('2026-04-15');
      });
    });

    it('returns empty for date with no matches', async () => {
      const result = await scheduleService.getScheduleByDate('2099-01-01');
      expect(result.data).toEqual([]);
    });
  });
});