import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSchedule, useScheduleByDate } from '../useSchedule';

vi.mock('../../api/scheduleService', () => ({
  getSchedule: vi.fn(),
  getScheduleByDate: vi.fn(),
}));

import * as scheduleService from '../../api/scheduleService';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useSchedule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is disabled when params are undefined', () => {
    const { result } = renderHook(() => useSchedule(undefined, undefined), {
      wrapper: createWrapper(),
    });
    expect(result.current.fetchStatus).toBe('idle');
  });

  it('fetches data when params are provided', async () => {
    scheduleService.getSchedule.mockResolvedValue({ data: [{ id: '1' }] });
    const { result } = renderHook(() => useSchedule(3, 2026), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: '1' }]);
  });
});

describe('useScheduleByDate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is disabled when date is null', () => {
    const { result } = renderHook(() => useScheduleByDate(null), {
      wrapper: createWrapper(),
    });
    expect(result.current.fetchStatus).toBe('idle');
  });

  it('fetches data when date is provided', async () => {
    scheduleService.getScheduleByDate.mockResolvedValue({ data: [{ id: '1' }] });
    const { result } = renderHook(() => useScheduleByDate('2026-04-15'), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: '1' }]);
  });
});