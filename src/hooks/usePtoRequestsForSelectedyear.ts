import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted, PtoRequestResponse } from '../model/Pto';
import { getPtoRequestsForSelectedYear } from '../service/TimeOffHttpService';
import { mapPtoRequestResponseToFormatted } from '../utils';

const usePtoRequestsForSelectedYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoReqYear', userId, year],
    queryFn: async ({ signal }) => {
      const response = await getPtoRequestsForSelectedYear(year, userId, signal);
      return response.map((pto) => mapPtoRequestResponseToFormatted(pto));
    },
    enabled: userId > 0 && year > 0,
  });
};

export default usePtoRequestsForSelectedYear;
