import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';

describe('NotificationContext', () => {
  it('notify opens snackbar with message and severity', async () => {
    function TestComponent() {
      const { notify } = useNotification();
      return (
        <button onClick={() => notify('Success!', 'success')}>Notify</button>
      );
    }

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      screen.getByText('Notify').click();
    });

    expect(await screen.findByText('Success!')).toBeInTheDocument();
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useNotification());
    }).toThrow('useNotification must be used within NotificationProvider');
  });
});