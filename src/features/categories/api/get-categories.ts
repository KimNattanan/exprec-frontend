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
    queryFn: async()=>{
      const res = await getCategories();
      const arr: Category[] = [];
      let x = res.find(e => !e.prev_id);
      while(x){
        arr.push(x);
        if(!x.next_id) break;
        x = res.find(e => e.id === (x ? x.next_id : ''));
      }
      return arr;
    },
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