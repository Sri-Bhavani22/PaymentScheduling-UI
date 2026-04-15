import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useThemeMode } from '../ThemeContext';

describe('ThemeContext', () => {
  const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

  it('defaults to light mode', () => {
    const { result } = renderHook(() => useThemeMode(), { wrapper });
    expect(result.current.mode).toBe('light');
  });

  it('toggleTheme switches to dark', () => {
    const { result } = renderHook(() => useThemeMode(), { wrapper });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.mode).toBe('dark');
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useThemeMode());
    }).toThrow('useThemeMode must be used within ThemeProvider');
  });
});