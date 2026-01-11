import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Record } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getRecordsQueryOptions } from './get-records';

export const createRecordInputSchema = z.object({
  created_at: z.string(),
  amount: z.number().max(10000000, "Must less than 10000000").min(-10000000, "Must more than -10000000"),
  category: z.string(),
  category_bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color."),
  note: z.string().optional(),
});

export type CreateRecordInput = z.infer<typeof createRecordInputSchema>;

export const createRecord = ({
  data,
}: {
  data: CreateRecordInput;
}): Promise<Record> => {
  return api.post('/records', data);
};

type UseCreateRecordOptions = {
  mutationConfig?: MutationConfig<typeof createRecord>;
};

export const useCreateRecord = ({
  mutationConfig,
}: UseCreateRecordOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getRecordsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createRecord,
  });
};