import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategories = (): Promise<Category[]> => {
  return api.get('/categories');
};

export const getCategoriesQueryOptions = ()=>{
  return queryOptions({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({
  queryConfig,
}: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};