import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategory = ({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> => {
  return api.get(`/categories/${categoryId}`);
};

export const getCategoryQueryOptions = (categoryId: string) => {
  return queryOptions({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategory({ categoryId }),
  });
};

type UseCategoryOptions = {
  categoryId: string;
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
};

export const useCategory = ({
  categoryId,
  queryConfig,
}: UseCategoryOptions) => {
  return useQuery({
    ...getCategoryQueryOptions(categoryId),
    ...queryConfig,
  });
};