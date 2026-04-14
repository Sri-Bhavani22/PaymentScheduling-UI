import axiosInstance from './axiosInstance';
import seedPayments from '../mocks/payments.json';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// Mutable in-memory store so creates/updates/deletes persist during the session
const mockPayments = [...seedPayments];

export const getMockStore = () => mockPayments;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPayments = async (params) => {
  if (useMocks) {
    await delay(400);
    let data = [...mockPayments];
    if (params?.status) {
      data = data.filter((p) => p.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter((p) => p.payeeName.toLowerCase().includes(q));
    }
    return { data };
  }
  return axiosInstance.get('/api/payments', { params });
};

export const getPaymentById = async (id) => {
  if (useMocks) {
    await delay(300);
    const payment = mockPayments.find((p) => p.id === id);
    if (!payment) throw new Error('Payment not found');
    return { data: payment };
  }
  return axiosInstance.get(`/api/payments/${encodeURIComponent(id)}`);
};

export const createPayment = async (data) => {
  if (useMocks) {
    await delay(500);
    const newPayment = {
      ...data,
      id: `PAY-${String(mockPayments.length + 1).padStart(3, '0')}`,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      timeline: [
        { event: 'Created', date: new Date().toISOString() },
        { event: 'Scheduled', date: new Date().toISOString() },
      ],
    };
    mockPayments.unshift(newPayment);
    return { data: newPayment };
  }
  return axiosInstance.post('/api/payments', data);
};

export const updatePayment = async (id, data) => {
  if (useMocks) {
    await delay(400);
    const index = mockPayments.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockPayments[index] = { ...mockPayments[index], ...data };
      return { data: mockPayments[index] };
    }
    return { data: { ...data, id } };
  }
  return axiosInstance.put(`/api/payments/${encodeURIComponent(id)}`, data);
};

export const cancelPayment = async (id) => {
  if (useMocks) {
    await delay(300);
    const index = mockPayments.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockPayments[index] = { ...mockPayments[index], status: 'Cancelled' };
      return { data: mockPayments[index] };
    }
    return { data: { id, status: 'Cancelled' } };
  }
  return axiosInstance.delete(`/api/payments/${encodeURIComponent(id)}`);
};
