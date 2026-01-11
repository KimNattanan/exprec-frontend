import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Preferences } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPreferences = (_: void): Promise<Preferences> => {
  return api.get('/preferences');
};

export const getPreferencesQueryOptions = () => {
  return queryOptions({
    queryKey: ['preferences'],
    queryFn: () => getPreferences(),
  });
};

type UsePreferencesOptions = {
  queryConfig?: QueryConfig<typeof getPreferencesQueryOptions>;
};

export const usePreferences = ({
  queryConfig,
}: UsePreferencesOptions = {}) => {
  return useQuery({
    ...getPreferencesQueryOptions(),
    ...queryConfig,
  });
};