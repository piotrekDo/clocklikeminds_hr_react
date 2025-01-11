import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchAllRequestsForYearForUser } from '../service/TimeOffHttpService';
import { mapPtoRequestResponseToFormatted } from '../utils';

const useAllUserRequestsPerYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['allPtoReqYear', userId, year],
    queryFn: async ({ signal }) => {
      const response = await fetchAllRequestsForYearForUser(year, userId, signal);
      return response.map(pto => mapPtoRequestResponseToFormatted(pto));
    },
    enabled: userId > 0 && year > 0,
  });
};

export default useAllUserRequestsPerYear