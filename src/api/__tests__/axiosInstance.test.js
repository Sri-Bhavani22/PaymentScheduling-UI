import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

describe('axiosInstance', () => {
  let axiosInstance;

  beforeEach(async () => {
    // Clear module cache so interceptors re-register
    vi.resetModules();
    localStorage.clear();
    // Reset window.location
    delete window.location;
    window.location = { href: '' };

    const mod = await import('../axiosInstance');
    axiosInstance = mod.default;
  });

  describe('request interceptor', () => {
    it('attaches Authorization header when token is present', async () => {
      localStorage.setItem('authToken', 'test-token-123');
      // Use interceptors directly
      const config = { headers: {} };
      const fulfilled = axiosInstance.interceptors.request.handlers[0].fulfilled;
      const result = fulfilled(config);
      expect(result.headers.Authorization).toBe('Bearer test-token-123');
    });

    it('does not attach Authorization header when token is absent', () => {
      const config = { headers: {} };
      const fulfilled = axiosInstance.interceptors.request.handlers[0].fulfilled;
      const result = fulfilled(config);
      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('response interceptor', () => {
    it('clears token and redirects on 401', async () => {
      localStorage.setItem('authToken', 'test-token');
      const rejected = axiosInstance.interceptors.response.handlers[0].rejected;
      const error = { response: { status: 401 } };

      await expect(rejected(error)).rejects.toEqual(error);
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(window.location.href).toBe('/login');
    });

    it('passes through non-401 errors without redirect', async () => {
      localStorage.setItem('authToken', 'test-token');
      const rejected = axiosInstance.interceptors.response.handlers[0].rejected;
      const error = { response: { status: 500 } };

      await expect(rejected(error)).rejects.toEqual(error);
      expect(localStorage.getItem('authToken')).toBe('test-token');
      expect(window.location.href).not.toBe('/login');
    });
  });
});