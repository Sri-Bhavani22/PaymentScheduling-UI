import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import CreatePaymentPage from '../CreatePaymentPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('../../hooks/useNotification', () => ({
  useNotification: () => ({ notify: vi.fn() }),
}));

vi.mock('../../hooks/usePayments', () => ({
  useCreatePayment: () => ({ mutateAsync: vi.fn() }),
}));

describe('CreatePaymentPage', () => {
  it('renders heading and PaymentForm', () => {
    render(<CreatePaymentPage />);
    expect(screen.getByText('Create Payment')).toBeInTheDocument();
    expect(screen.getByText('Recipient Details')).toBeInTheDocument();
  });
});