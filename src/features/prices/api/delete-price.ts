import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPricesQueryOptions } from "./get-prices";

export const deletePrice = ({
  priceId,
}: {
  priceId: string;
}) => {
  return api.delete(`/prices/${priceId}`);
};

type UseDeletePriceOptions = {
  mutationConfig?: MutationConfig<typeof deletePrice>;
};

export const useDeletePrice = ({
  mutationConfig,
}: UseDeletePriceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getPricesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deletePrice,
  });
};