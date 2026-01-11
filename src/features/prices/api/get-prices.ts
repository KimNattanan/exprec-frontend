import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Price } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPrices = (): Promise<Price[]> => {
  return api.get('/prices');
};

export const getPricesQueryOptions = ()=>{
  return queryOptions({
    queryKey: ['prices'],
    queryFn: async()=>{
      const res = await getPrices();
      const arr: Price[] = [];
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

type UsePricesOptions = {
  queryConfig?: QueryConfig<typeof getPricesQueryOptions>;
};

export const usePrices = ({
  queryConfig,
}: UsePricesOptions = {}) => {
  return useQuery({
    ...getPricesQueryOptions(),
    ...queryConfig,
  });
};