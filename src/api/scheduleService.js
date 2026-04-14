import dayjs from 'dayjs';
import { getMockStore } from './paymentService';
import axiosInstance from './axiosInstance';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSchedule = async (month, year) => {
  if (useMocks) {
    await delay(300);
    const data = getMockStore().filter((p) => {
      const d = dayjs(p.startDate);
      return d.month() === month && d.year() === year;
    });
    return { data };
  }
  return axiosInstance.get('/api/schedule', { params: { month, year } });
};

export const getScheduleByDate = async (date) => {
  if (useMocks) {
    await delay(200);
    const target = dayjs(date).format('YYYY-MM-DD');
    const data = getMockStore().filter((p) => p.startDate === target);
    return { data };
  }
  return axiosInstance.get(`/api/schedule/${encodeURIComponent(date)}`);
};
