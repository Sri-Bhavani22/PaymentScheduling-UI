import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import DashboardPage from '../DashboardPage';

vi.mock('../../hooks/usePayments', () => ({
  usePayments: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

import { usePayments } from '../../hooks/usePayments';

describe('DashboardPage', () => {
  it('shows skeletons when loading', () => {
    usePayments.mockReturnValue({ data: [], isLoading: true });
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // SkeletonCards rendered — look for skeleton elements
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders widgets when loaded', () => {
    const mockPayments = [
      { id: '1', paymentName: 'Test', amount: 1000, currency: 'INR', status: 'Scheduled', startDate: '2026-04-15' },
    ];
    usePayments.mockReturnValue({ data: mockPayments, isLoading: false });
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Scheduled')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Payments')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
});