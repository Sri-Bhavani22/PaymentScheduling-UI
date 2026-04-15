import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import PaymentTable from '../index';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

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
  {
    id: 'PAY-002',
    payeeName: 'Global Traders',
    amount: 75000,
    currency: 'INR',
    startDate: '2026-04-16',
    frequency: null,
    status: 'Pending',
    paymentType: 'One-time',
  },
  {
    id: 'PAY-003',
    payeeName: 'CloudServe Ltd',
    amount: 45000,
    currency: 'USD',
    startDate: '2026-04-01',
    frequency: 'Monthly',
    status: 'Completed',
    paymentType: 'Recurring',
  },
];

describe('PaymentTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders payment rows', () => {
    render(<PaymentTable payments={mockPayments} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Global Traders')).toBeInTheDocument();
    expect(screen.getByText('CloudServe Ltd')).toBeInTheDocument();
  });

  it('filters by search', async () => {
    const user = userEvent.setup();
    render(<PaymentTable payments={mockPayments} />);

    await user.type(screen.getByPlaceholderText(/search payee/i), 'acme');

    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.queryByText('Global Traders')).not.toBeInTheDocument();
  });

  it('navigates on row click', async () => {
    const user = userEvent.setup();
    render(<PaymentTable payments={mockPayments} />);

    await user.click(screen.getByText('Acme Corp'));
    expect(mockNavigate).toHaveBeenCalledWith('/payments/PAY-001');
  });

  it('sorts by column on header click', async () => {
    const user = userEvent.setup();
    render(<PaymentTable payments={mockPayments} />);

    // Click on Payee Name header to sort
    await user.click(screen.getByText('Payee Name'));

    // Should still render all rows
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('CloudServe Ltd')).toBeInTheDocument();
  });

  it('exports CSV when clicking Export CSV', async () => {
    const user = userEvent.setup();
    const mockCreateObjectURL = vi.fn(() => 'blob:test');
    const mockRevokeObjectURL = vi.fn();
    URL.createObjectURL = mockCreateObjectURL;
    URL.revokeObjectURL = mockRevokeObjectURL;

    render(<PaymentTable payments={mockPayments} />);
    await user.click(screen.getByText(/export csv/i));

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });
});