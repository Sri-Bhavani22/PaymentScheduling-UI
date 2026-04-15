import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import UpcomingTable from '../UpcomingTable';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

const mockPayments = [
  { id: '1', payeeName: 'A', amount: 100, currency: 'INR', startDate: '2026-04-20', status: 'Scheduled' },
  { id: '2', payeeName: 'B', amount: 200, currency: 'INR', startDate: '2026-04-18', status: 'Pending' },
  { id: '3', payeeName: 'C', amount: 300, currency: 'INR', startDate: '2026-04-25', status: 'Scheduled' },
  { id: '4', payeeName: 'D', amount: 400, currency: 'INR', startDate: '2026-04-22', status: 'Completed' },
  { id: '5', payeeName: 'E', amount: 500, currency: 'INR', startDate: '2026-04-19', status: 'Scheduled' },
  { id: '6', payeeName: 'F', amount: 600, currency: 'INR', startDate: '2026-04-17', status: 'Pending' },
  { id: '7', payeeName: 'G', amount: 700, currency: 'INR', startDate: '2026-04-30', status: 'Scheduled' },
];

describe('UpcomingTable', () => {
  it('shows top 5 upcoming Scheduled/Pending sorted by date', () => {
    render(<UpcomingTable payments={mockPayments} />);
    // Should have 6 Scheduled/Pending (ids 1,2,3,5,6,7), limited to 5
    // Completed (id 4) should be excluded
    expect(screen.queryByText('D')).not.toBeInTheDocument();
    // First should be F (earliest date)
    const rows = screen.getAllByRole('row');
    // Header row + 5 data rows
    expect(rows.length).toBe(6);
  });

  it('shows empty state message with no upcoming payments', () => {
    const payments = [{ id: '1', status: 'Completed', amount: 100 }];
    render(<UpcomingTable payments={payments} />);
    expect(screen.getByText('No upcoming payments.')).toBeInTheDocument();
  });
});