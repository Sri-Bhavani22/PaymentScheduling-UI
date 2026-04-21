import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import ReviewStep from '../ReviewStep';

const values = {
  paymentName: 'Test Payee',
  accountNumber: '12345678',
  bankIfsc: 'SBIN0001234',
  email: 'test@example.com',
  amount: 5000,
  currency: 'INR',
  paymentType: 'Recurring',
  frequency: 'Monthly',
  startDate: '2026-04-15',
  endDate: '2026-12-31',
  description: 'Test payment description',
};

describe('ReviewStep', () => {
  it('displays all recipient and payment fields', () => {
    const onEditStep = vi.fn();
    render(<ReviewStep values={values} onEditStep={onEditStep} />);

    expect(screen.getByText('Test Payee')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('SBIN0001234')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('INR')).toBeInTheDocument();
    expect(screen.getByText('Recurring')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Test payment description')).toBeInTheDocument();
  });

  it('Edit buttons call onEditStep with correct step', async () => {
    const user = userEvent.setup();
    const onEditStep = vi.fn();
    render(<ReviewStep values={values} onEditStep={onEditStep} />);

    const editButtons = screen.getAllByText('Edit');
    await user.click(editButtons[0]); // Recipient Details Edit
    expect(onEditStep).toHaveBeenCalledWith(0);

    await user.click(editButtons[1]); // Payment Details Edit
    expect(onEditStep).toHaveBeenCalledWith(1);
  });

  it('hides frequency when not Recurring', () => {
    const oneTimeValues = { ...values, paymentType: 'One-time', frequency: '', endDate: '' };
    render(<ReviewStep values={oneTimeValues} onEditStep={vi.fn()} />);
    expect(screen.queryByText('Monthly')).not.toBeInTheDocument();
  });

  it('displays dash for empty optional fields', () => {
    const noEmail = { ...values, email: '' };
    render(<ReviewStep values={noEmail} onEditStep={vi.fn()} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});