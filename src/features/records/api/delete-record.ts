import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecordsQueryOptions } from "./get-records";

export const deleteRecord = ({
  recordId,
}: {
  recordId: string;
}) => {
  return api.delete(`/records/${recordId}`);
};

type UseDeleteRecordOptions = {
  mutationConfig?: MutationConfig<typeof deleteRecord>;
};

export const useDeleteRecord = ({
  mutationConfig,
}: UseDeleteRecordOptions = {}) => {
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
    mutationFn: deleteRecord,
  });
};