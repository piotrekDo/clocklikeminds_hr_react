import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted, PtoRequestResponse } from '../model/Pto';
import { getPtoRequestsForSelectedYear } from '../service/TimeOffHttpService';

const usePtoRequestsForSelectedYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoReqYear', userId, year],
    queryFn: async ({ signal }) => {
      const response = await getPtoRequestsForSelectedYear(year, userId, signal);
      return response.map((pto: PtoRequestResponse) => {
        return {
          ...pto,
          requestDateTime: new Date(pto.requestDateTime),
          ptoStart: new Date(pto.ptoStart),
          ptoEnd: new Date(pto.ptoEnd),
          decisionDateTime: pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined,
          withdrawnDateTime: pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined,
        };
      });
    },
    enabled: userId > 0 && year > 0,
  });
};

export default usePtoRequestsForSelectedYear;
