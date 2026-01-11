import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Price } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getPriceQueryOptions } from "./get-price";
import { getPricesQueryOptions } from "./get-prices";

export const updatePriceInputSchema = z.object({
  prev_id: z.string().optional(),
  next_id: z.string().optional(),
  amount: z.number().max(10000000, "Must less than 10000000").min(-10000000, "Must more than -10000000").optional(),
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color.").optional(),
});

export type UpdatePriceInput = z.infer<typeof updatePriceInputSchema>;

export const updatePrice = ({
  priceId,
  data,
}: {
  priceId: string;
  data: UpdatePriceInput;
}): Promise<Price> => {
  return api.patch(`/prices/${priceId}`, data);
};

type UseUpdatePriceOptions = {
  mutationConfig?: MutationConfig<typeof updatePrice>;
};

export const useUpdatePrice = ({
  mutationConfig,
}: UseUpdatePriceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPriceQueryOptions(data.id).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getPricesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updatePrice,
  });
};