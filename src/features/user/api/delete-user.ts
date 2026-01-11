import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteUser = (_: void): Promise<void> => {
  return api.delete(`/me`);
};

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: deleteUser,
  });
};
