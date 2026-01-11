import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Price } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getPricesQueryOptions } from './get-prices';

export const createPriceInputSchema = z.object({
  position: z.number(),
  amount: z.number().max(10000000, "Must less than 10000000").min(-10000000, "Must more than -10000000").optional(),
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color.").optional(),
});

export type CreatePriceInput = z.infer<typeof createPriceInputSchema>;

export const createPrice = ({
  data,
}: {
  data: CreatePriceInput;
}): Promise<Price> => {
  if(!data.amount) data.amount = 100;
  if(!data.bg_color) data.bg_color = '#ffffff';
  return api.post('/prices', data);
};

type UseCreatePriceOptions = {
  mutationConfig?: MutationConfig<typeof createPrice>;
};

export const useCreatePrice = ({
  mutationConfig,
}: UseCreatePriceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getPricesQueryOptions().queryKey,
      })
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPrice,
  });
};