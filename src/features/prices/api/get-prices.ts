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
    queryFn: getPrices,
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