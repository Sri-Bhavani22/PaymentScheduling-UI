import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import PaymentDetailPage from '../PaymentDetailPage';

const mockNavigate = vi.fn();
const mockNotify = vi.fn();
const mockMutateAsync = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'PAY-001' }),
  };
});

vi.mock('../../hooks/usePayments', () => ({
  usePayment: vi.fn(),
  useCancelPayment: () => ({ mutateAsync: mockMutateAsync }),
}));

vi.mock('../../hooks/useNotification', () => ({
  useNotification: () => ({ notify: mockNotify }),
}));

import { usePayment } from '../../hooks/usePayments';

const mockPayment = {
  id: 'PAY-001',
  paymentName: 'Acme Corp',
  accountNumber: '12345678901234',
  bankIfsc: 'SBIN0001234',
  amount: 250000,
  currency: 'INR',
  paymentType: 'Recurring',
  frequency: 'Monthly',
  startDate: '2026-04-15',
  status: 'Scheduled',
  timeline: [
    { event: 'Created', date: '2026-04-01T10:00:00Z' },
    { event: 'Scheduled', date: '2026-04-01T10:05:00Z' },
  ],
};

describe('PaymentDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner', () => {
    usePayment.mockReturnValue({ data: undefined, isLoading: true });
    render(<PaymentDetailPage />);
    expect(screen.getByText('Loading payment details...')).toBeInTheDocument();
  });

  it('shows not found state', () => {
    usePayment.mockReturnValue({ data: null, isLoading: false });
    render(<PaymentDetailPage />);
    expect(screen.getByText('Payment not found')).toBeInTheDocument();
  });

  it('renders payment card and timeline', () => {
    usePayment.mockReturnValue({ data: mockPayment, isLoading: false });
    render(<PaymentDetailPage />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('shows Cancel and Edit buttons for Scheduled status', () => {
    usePayment.mockReturnValue({ data: mockPayment, isLoading: false });
    render(<PaymentDetailPage />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows Retry button for Failed status', () => {
    usePayment.mockReturnValue({
      data: { ...mockPayment, status: 'Failed' },
      isLoading: false,
    });
    render(<PaymentDetailPage />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('cancel success shows notification and navigates', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockResolvedValue({});
    usePayment.mockReturnValue({ data: mockPayment, isLoading: false });
    render(<PaymentDetailPage />);

    await user.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Payment cancelled successfully', 'success');
      expect(mockNavigate).toHaveBeenCalledWith('/payments');
    });
  });

  it('cancel failure shows error notification', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockRejectedValue(new Error('Fail'));
    usePayment.mockReturnValue({ data: mockPayment, isLoading: false });
    render(<PaymentDetailPage />);

    await user.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Failed to cancel payment', 'error');
    });
  });
});