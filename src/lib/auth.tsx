import { User } from "@/types/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api-client";

export const getUser = async(): Promise<User> => {
  const response = (await api.get('/me')) as User;
  return response;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const useLogout = ({ onSuccess }: { onSuccess?: ()=>void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};