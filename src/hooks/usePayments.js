import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  cancelPayment,
} from '../api/paymentService';

export const usePayments = (filters) => {
  return useQuery({
    queryKey: ['payments', filters],
    queryFn: () => getPayments(filters).then((res) => res.data),
  });
};

export const usePayment = (id) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => getPaymentById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPayment(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePayment(id, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useCancelPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => cancelPayment(id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};
