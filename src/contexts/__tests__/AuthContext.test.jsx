import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  it('provides initial user state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual({ name: 'John Doe', role: 'admin' });
  });

  it('login updates user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ name: 'Jane', role: 'viewer' });
    });
    expect(result.current.user).toEqual({ name: 'Jane', role: 'viewer' });
  });

  it('logout clears user and removes token', () => {
    localStorage.setItem('authToken', 'test-token');
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within AuthProvider');
  });
});