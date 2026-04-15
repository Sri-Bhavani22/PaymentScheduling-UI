import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import PaymentListPage from '../PaymentListPage';

vi.mock('../../hooks/usePayments', () => ({
  usePayments: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

import { usePayments } from '../../hooks/usePayments';

describe('PaymentListPage', () => {
  it('shows loading spinner when loading', () => {
    usePayments.mockReturnValue({ data: [], isLoading: true });
    render(<PaymentListPage />);
    expect(screen.getByText('Loading payments...')).toBeInTheDocument();
  });

  it('renders PaymentTable when loaded', () => {
    const mockPayments = [
      {
        id: 'PAY-001',
        payeeName: 'Acme Corp',
        amount: 250000,
        currency: 'INR',
        startDate: '2026-04-15',
        frequency: 'Monthly',
        status: 'Scheduled',
        paymentType: 'Recurring',
      },
    ];
    usePayments.mockReturnValue({ data: mockPayments, isLoading: false });
    render(<PaymentListPage />);
    expect(screen.getByText('Payment List')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });
});