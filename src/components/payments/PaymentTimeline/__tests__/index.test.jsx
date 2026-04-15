import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import PaymentTimeline from '../index';

describe('PaymentTimeline', () => {
  it('renders timeline events with dates', () => {
    const timeline = [
      { event: 'Created', date: '2026-04-01T10:00:00Z' },
      { event: 'Scheduled', date: '2026-04-01T10:05:00Z' },
    ];
    render(<PaymentTimeline timeline={timeline} />);
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
  });

  it('shows empty state text when timeline is empty', () => {
    render(<PaymentTimeline timeline={[]} />);
    expect(screen.getByText('No timeline events.')).toBeInTheDocument();
  });

  it('displays event reason when present', () => {
    const timeline = [
      { event: 'Failed', date: '2026-04-01T00:03:00Z', reason: 'Insufficient funds' },
    ];
    render(<PaymentTimeline timeline={timeline} />);
    expect(screen.getByText(/Insufficient funds/)).toBeInTheDocument();
  });
});