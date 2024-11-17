import { useInfiniteQuery } from '@tanstack/react-query';
import { Page } from '../model/Page';
import { PtoRequestResponse } from '../model/Pto';
import { fetchPtosByAppliersId } from '../service/TimeOffHttpService';

const usePtoByUser = (applierId: number) => {
  return useInfiniteQuery<Page<PtoRequestResponse>, Error>({
    queryKey: ['ptoByUser', applierId],
    queryFn: ({ pageParam = 1, signal }) => fetchPtosByAppliersId(applierId, pageParam - 1, 10, signal),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.size > 0 && lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 2 : undefined;
    },
  });
};

export default usePtoByUser;
