import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Pagination, Record } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getRecords = ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}): Promise<{ data: Record[]; pagination: Pagination }> => {
  return api.get('/records', {
    params: {
      page,
      limit,
    },
  });
};

export const getRecordsQueryOptions = (
  page: number = 1,
  limit: number = 5,
) => {
  return queryOptions({
    queryKey: ['records', page, limit],
    queryFn: async() => {
      const records = await getRecords({ page, limit });
      if(records.pagination.totalPages < 1){
        records.pagination.totalPages = 1;
      }
      return records;
    },
  });
};

type UseRecordsOptions = {
  page?: number;
  limit?: number;
  queryConfig?: QueryConfig<typeof getRecordsQueryOptions>;
};

export const useRecords = ({
  page = 1,
  limit = 5,
  queryConfig,
}: UseRecordsOptions = {}) => {
  return useQuery({
    ...getRecordsQueryOptions(page,limit),
    ...queryConfig,
  });
};