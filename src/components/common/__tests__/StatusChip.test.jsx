import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import StatusChip from '../StatusChip';

describe('StatusChip', () => {
  it('renders with correct label for known status', () => {
    render(<StatusChip status="Completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders with correct label for unknown status', () => {
    render(<StatusChip status="Unknown" />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});