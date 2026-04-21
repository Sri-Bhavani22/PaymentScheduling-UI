import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import ScheduleCalendar from '../index';

describe('ScheduleCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 3, 15));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const payments = [
    {
      id: 'PAY-001',
      paymentName: 'Acme Corp',
      amount: 250000,
      currency: 'INR',
      startDate: '2026-04-15',
      status: 'Scheduled',
      paymentType: 'Recurring',
    },
  ];

  it('renders month header and day labels', () => {
    render(<ScheduleCalendar payments={payments} />);
    expect(screen.getByText('April 2026')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    render(<ScheduleCalendar payments={payments} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await user.click(nextButton);
    expect(screen.getByText('May 2026')).toBeInTheDocument();
  });

  it('shows payment indicators on dates with payments', () => {
    render(<ScheduleCalendar payments={payments} />);
    expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
  });

  it('selects and deselects a date with payments', async () => {
    const user = userEvent.setup();
    render(<ScheduleCalendar payments={payments} />);

    // Click on the chip for the date with payment
    const chip = screen.getByText(/Acme Corp/);
    // Click on parent box (the day cell)
    await user.click(chip.closest('[class*="MuiBox-root"]'));

    // Should show the selected date payments list
    expect(screen.getByText(/Payments on/)).toBeInTheDocument();
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    render(<ScheduleCalendar payments={payments} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(screen.getByText('March 2026')).toBeInTheDocument();
  });

  it('renders multiple payments badge for dates with more than 2 payments', () => {
    const manyPayments = [
      { id: '1', paymentName: 'A Corp', amount: 100, currency: 'INR', startDate: '2026-04-15', status: 'Scheduled', paymentType: 'One-time' },
      { id: '2', paymentName: 'B Corp', amount: 200, currency: 'INR', startDate: '2026-04-15', status: 'Pending', paymentType: 'One-time' },
      { id: '3', paymentName: 'C Corp', amount: 300, currency: 'INR', startDate: '2026-04-15', status: 'Completed', paymentType: 'One-time' },
    ];
    render(<ScheduleCalendar payments={manyPayments} />);
    expect(screen.getByText('payments')).toBeInTheDocument();
  });
});