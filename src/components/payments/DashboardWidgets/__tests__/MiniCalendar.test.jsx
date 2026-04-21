import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import MiniCalendar from '../MiniCalendar';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('MiniCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 3, 15));
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const payments = [
    { id: '1', startDate: '2026-04-15', paymentName: 'Test' },
  ];

  it('displays current month and year', () => {
    render(<MiniCalendar payments={payments} />);
    expect(screen.getByText('April 2026')).toBeInTheDocument();
  });

  it('navigates months with prev/next', async () => {
    const user = userEvent.setup();
    render(<MiniCalendar payments={payments} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[buttons.length - 1]);
    expect(screen.getByText('May 2026')).toBeInTheDocument();
  });

  it('navigates on date click for dates with payments', async () => {
    const user = userEvent.setup();
    render(<MiniCalendar payments={payments} />);

    await user.click(screen.getByText('15'));
    expect(mockNavigate).toHaveBeenCalledWith('/schedule?date=2026-04-15');
  });
});