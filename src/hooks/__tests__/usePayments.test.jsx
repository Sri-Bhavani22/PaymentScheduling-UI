import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePayments, usePayment, useCreatePayment, useCancelPayment } from '../usePayments';

vi.mock('../../api/paymentService', () => ({
  getPayments: vi.fn(),
  getPaymentById: vi.fn(),
  createPayment: vi.fn(),
  cancelPayment: vi.fn(),
}));

import * as paymentService from '../../api/paymentService';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('usePayments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches payments data', async () => {
    const mockData = [{ id: 'PAY-001', payeeName: 'Test' }];
    paymentService.getPayments.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => usePayments(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('passes filters to getPayments', async () => {
    paymentService.getPayments.mockResolvedValue({ data: [] });

    renderHook(() => usePayments({ status: 'Pending' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(paymentService.getPayments).toHaveBeenCalledWith({ status: 'Pending' })
    );
  });
});

describe('usePayment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches payment by id', async () => {
    const mockPayment = { id: 'PAY-001', payeeName: 'Test' };
    paymentService.getPaymentById.mockResolvedValue({ data: mockPayment });

    const { result } = renderHook(() => usePayment('PAY-001'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPayment);
  });

  it('is disabled when id is null', () => {
    const { result } = renderHook(() => usePayment(null), {
      wrapper: createWrapper(),
    });
    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useCreatePayment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invalidates queries on success', async () => {
    const newPayment = { id: 'PAY-099', payeeName: 'New' };
    paymentService.createPayment.mockResolvedValue({ data: newPayment });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const spy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreatePayment(), { wrapper });

    result.current.mutate({ payeeName: 'New', amount: 100 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ['payments'] });
  });
});

describe('useCancelPayment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invalidates queries on success', async () => {
    paymentService.cancelPayment.mockResolvedValue({
      data: { id: 'PAY-001', status: 'Cancelled' },
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const spy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCancelPayment(), { wrapper });

    result.current.mutate('PAY-001');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(spy).toHaveBeenCalledWith({ queryKey: ['payments'] });
  });
});