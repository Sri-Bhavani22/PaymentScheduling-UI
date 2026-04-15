import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import NotFoundPage from '../NotFoundPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('NotFoundPage', () => {
  it('displays 404 content', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('dashboard button navigates to /', async () => {
    const user = userEvent.setup();
    render(<NotFoundPage />);
    await user.click(screen.getByText('Go to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});