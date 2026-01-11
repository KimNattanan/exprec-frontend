import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Category } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getCategoriesQueryOptions } from './get-categories';

export const createCategoryInputSchema = z.object({
  position: z.number(),
  title: z.string().optional(),
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color.").optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export const createCategory = ({
  data,
}: {
  data: CreateCategoryInput;
}): Promise<Category> => {
  if(!data.title) data.title = "Untitled";
  if(!data.bg_color) data.bg_color = '#ffffff';
  return api.post('/categories', data);
};

type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({
  mutationConfig,
}: UseCreateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      })
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCategory,
  });
};