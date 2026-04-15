import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import PaymentCard from '../index';

const mockPayment = {
  id: 'PAY-001',
  payeeName: 'Acme Corp',
  accountNumber: '12345678901234',
  bankIfsc: 'SBIN0001234',
  email: 'accounts@acme.com',
  amount: 250000,
  currency: 'INR',
  paymentType: 'Recurring',
  frequency: 'Monthly',
  startDate: '2026-04-15',
  status: 'Scheduled',
  description: 'Monthly vendor payment',
};

describe('PaymentCard', () => {
  it('displays all payment fields', () => {
    render(<PaymentCard payment={mockPayment} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('12345678901234')).toBeInTheDocument();
    expect(screen.getByText('SBIN0001234')).toBeInTheDocument();
    expect(screen.getByText('INR')).toBeInTheDocument();
    expect(screen.getByText(/15 Apr 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Recurring/)).toBeInTheDocument();
    expect(screen.getByText('accounts@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Monthly vendor payment')).toBeInTheDocument();
  });

  it('renders nothing when payment is null', () => {
    const { container } = render(<PaymentCard payment={null} />);
    expect(container.innerHTML).toBe('');
  });

  it('does not show email and description when absent', () => {
    const paymentNoOptional = { ...mockPayment, email: '', description: '' };
    render(<PaymentCard payment={paymentNoOptional} />);
    expect(screen.queryByText('accounts@acme.com')).not.toBeInTheDocument();
  });
});