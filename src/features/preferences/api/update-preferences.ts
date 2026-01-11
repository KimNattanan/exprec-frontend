import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Preferences } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getPreferencesQueryOptions } from "./get-preferences";

export const updatePreferencesInputSchema = z.object({
  theme: z.string(),
});

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesInputSchema>;

export const updatePreferences = ({
  data,
}: {
  data: UpdatePreferencesInput;
}): Promise<Preferences> => {
  return api.patch('/preferences', data);
};

type UseUpdatePreferencesOptions = {
  mutationConfig?: MutationConfig<typeof updatePreferences>;
};

export const useUpdatePreferences = ({
  mutationConfig,
}: UseUpdatePreferencesOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPreferencesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updatePreferences,
  });
};