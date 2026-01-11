import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { DashboardData, Record } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getDashboard = ({
  timeStart,
  timeEnd,
}: {
  timeStart: string;
  timeEnd: string;
}): Promise<DashboardData> => {
  return api.get('/records/dashboard-data', {
    params: {
      timeStart,
      timeEnd,
    },
  });
};

export const getDashboardQueryOptions = (
  timeStart: string = '',
  timeEnd: string = '',
) => {
  return queryOptions({
    queryKey: ['dashboard', timeStart, timeEnd],
    queryFn: async() => {
      const dashboard = await getDashboard({ timeStart, timeEnd });
      dashboard.amount_by_category = new Map<string,number>(Object.entries(dashboard.amount_by_category));
      dashboard.category_color = new Map<string,string>(Object.entries(dashboard.category_color));
      dashboard.records = dashboard.records as Record[];
      return dashboard;
    },
  });
};

type UseDashboardOptions = {
  timeStart: string,
  timeEnd: string,
  queryConfig?: QueryConfig<typeof getDashboardQueryOptions>;
};

export const useDashboard = ({
  timeStart,
  timeEnd,
  queryConfig,
}: UseDashboardOptions) => {
  return useQuery({
    ...getDashboardQueryOptions(timeStart,timeEnd),
    ...queryConfig,
  });
};