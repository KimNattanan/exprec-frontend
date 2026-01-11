import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Category } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getCategoryQueryOptions } from "./get-category";
import { getCategoriesQueryOptions } from "./get-categories";

export const updateCategoryInputSchema = z.object({
  position: z.number(),
  title: z.string().optional(),
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color.").optional(),
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;

export const updateCategory = ({
  categoryId,
  data,
}: {
  categoryId: string;
  data: UpdateCategoryInput;
}): Promise<Category> => {
  return api.patch(`/categories/${categoryId}`, data);
};

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({
  mutationConfig,
}: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoryQueryOptions(data.id).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCategory,
  });
};