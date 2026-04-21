import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('paymentService (mock mode)', () => {
  let paymentService;
  let getMockStore;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv('VITE_USE_MOCKS', 'true');
    const mod = await import('../paymentService');
    paymentService = mod;
    getMockStore = mod.getMockStore;
  });

  describe('getPayments', () => {
    it('returns all payments with no filters', async () => {
      const result = await paymentService.getPayments();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('filters by status', async () => {
      const result = await paymentService.getPayments({ status: 'Scheduled' });
      result.data.forEach((p) => {
        expect(p.status).toBe('Scheduled');
      });
    });

    it('filters by search (case-insensitive)', async () => {
      const result = await paymentService.getPayments({ search: 'acme' });
      result.data.forEach((p) => {
        expect(p.paymentName.toLowerCase()).toContain('acme');
      });
    });
  });

  describe('getPaymentById', () => {
    it('returns matching payment', async () => {
      const result = await paymentService.getPaymentById('PAY-001');
      expect(result.data).toBeDefined();
      expect(result.data.id).toBe('PAY-001');
    });

    it('throws for missing ID', async () => {
      await expect(paymentService.getPaymentById('NONEXISTENT')).rejects.toThrow(
        'Payment not found'
      );
    });
  });

  describe('createPayment', () => {
    it('generates ID, Scheduled status, and timeline', async () => {
      const result = await paymentService.createPayment({
        paymentName: 'Test User',
        amount: 500,
      });
      expect(result.data.id).toMatch(/^PAY-/);
      expect(result.data.status).toBe('Scheduled');
      expect(result.data.createdAt).toBeDefined();
      expect(result.data.timeline).toBeDefined();
      expect(result.data.timeline.length).toBe(2);
    });
  });

  describe('updatePayment', () => {
    it('merges data into existing payment', async () => {
      const result = await paymentService.updatePayment('PAY-001', {
        amount: 999,
      });
      expect(result.data.amount).toBe(999);
      expect(result.data.id).toBe('PAY-001');
      expect(result.data.paymentName).toBeDefined();
    });
  });

  describe('cancelPayment', () => {
    it('sets status to Cancelled', async () => {
      const result = await paymentService.cancelPayment('PAY-001');
      expect(result.data.status).toBe('Cancelled');
    });
  });
});