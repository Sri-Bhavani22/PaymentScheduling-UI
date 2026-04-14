import { useQuery } from '@tanstack/react-query';
import { getSchedule, getScheduleByDate } from '../api/scheduleService';

export const useSchedule = (month, year) => {
  return useQuery({
    queryKey: ['schedule', month, year],
    queryFn: () => getSchedule(month, year).then((res) => res.data),
    enabled: month !== undefined && year !== undefined,
  });
};

export const useScheduleByDate = (date) => {
  return useQuery({
    queryKey: ['schedule', date],
    queryFn: () => getScheduleByDate(date).then((res) => res.data),
    enabled: !!date,
  });
};
