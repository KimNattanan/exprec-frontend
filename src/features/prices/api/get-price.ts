import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Price } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPrice = ({
  priceId,
}: {
  priceId: string;
}): Promise<Price> => {
  return api.get(`/prices/${priceId}`);
};

export const getPriceQueryOptions = (priceId: string) => {
  return queryOptions({
    queryKey: ['prices', priceId],
    queryFn: () => getPrice({ priceId }),
  });
};

type UsePriceOptions = {
  priceId: string;
  queryConfig?: QueryConfig<typeof getPriceQueryOptions>;
};

export const usePrice = ({
  priceId,
  queryConfig,
}: UsePriceOptions) => {
  return useQuery({
    ...getPriceQueryOptions(priceId),
    ...queryConfig,
  });
};