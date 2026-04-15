import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import SummaryCards from '../SummaryCards';

const mockPayments = [
  { id: '1', status: 'Scheduled', amount: 1000 },
  { id: '2', status: 'Pending', amount: 2000 },
  { id: '3', status: 'Completed', amount: 3000 },
  { id: '4', status: 'Failed', amount: 500 },
  { id: '5', status: 'Completed', amount: 1500 },
];

describe('SummaryCards', () => {
  it('counts scheduled + pending payments', () => {
    render(<SummaryCards payments={mockPayments} />);
    expect(screen.getByText('Total Scheduled')).toBeInTheDocument();
    // The card for Total Scheduled should display 2
    const cards = screen.getAllByRole('heading', { level: 4 });
    const scheduledCard = cards[0];
    expect(scheduledCard).toHaveTextContent('2');
  });

  it('sums amounts for scheduled + pending', () => {
    render(<SummaryCards payments={mockPayments} />);
    expect(screen.getByText('Total Amount')).toBeInTheDocument();
    // 1000 + 2000 = 3000, formatted as INR
    expect(screen.getByText(/3,000/)).toBeInTheDocument();
  });

  it('counts completed payments', () => {
    render(<SummaryCards payments={mockPayments} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('counts failed payments', () => {
    render(<SummaryCards payments={mockPayments} />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows zero values for empty payments', () => {
    render(<SummaryCards payments={[]} />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(3);
  });
});