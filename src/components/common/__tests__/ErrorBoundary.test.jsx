import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

let shouldThrow = false;

function ThrowError() {
  if (shouldThrow) throw new Error('Test error');
  return <div>Children content</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = false;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children normally', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('catches error and shows fallback', () => {
    shouldThrow = true;
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('Try Again resets error state', async () => {
    const user = userEvent.setup();
    shouldThrow = true;

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Stop throwing, then click Try Again
    shouldThrow = false;
    await user.click(screen.getByText('Try Again'));

    expect(screen.getByText('Children content')).toBeInTheDocument();
  });
});