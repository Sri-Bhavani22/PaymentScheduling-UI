import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import SchedulePage from '../SchedulePage';

vi.mock('../../hooks/usePayments', () => ({
  usePayments: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

import { usePayments } from '../../hooks/usePayments';

describe('SchedulePage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 3, 15));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows loading spinner when loading', () => {
    usePayments.mockReturnValue({ data: [], isLoading: true });
    render(<SchedulePage />);
    expect(screen.getByText('Loading schedule...')).toBeInTheDocument();
  });

  it('renders calendar view by default', () => {
    const payments = [
      { id: '1', paymentName: 'Test', amount: 100, currency: 'INR', startDate: '2026-04-15', status: 'Scheduled', paymentType: 'One-time' },
    ];
    usePayments.mockReturnValue({ data: payments, isLoading: false });
    render(<SchedulePage />);
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('April 2026')).toBeInTheDocument();
  });

  it('toggles to list view', async () => {
    const user = userEvent.setup();
    const payments = [
      { id: '1', paymentName: 'Test Payee', amount: 100, currency: 'INR', startDate: '2026-04-15', status: 'Scheduled', paymentType: 'One-time' },
    ];
    usePayments.mockReturnValue({ data: payments, isLoading: false });
    render(<SchedulePage />);

    await user.click(screen.getByText('List'));

    expect(screen.getByText('Test Payee')).toBeInTheDocument();
  });
});