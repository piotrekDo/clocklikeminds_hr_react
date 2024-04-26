import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { getPtoRequestsForSelectedYear } from '../service/PtoHttpService';

const usePtoRequestsForSelectedYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoReqYear', userId, year],
    queryFn: () =>
      getPtoRequestsForSelectedYear(year, userId).request.then(res =>
        res.map(pto => {
          const ptoStart =  new Date(pto.ptoStart);
          ptoStart.setHours(0, 0, 0, 0);
          const ptoEnd = new Date(pto.ptoEnd);
          ptoEnd.setHours(0, 0, 0, 0);
          return {
            ...pto,
            requestDateTime: new Date(pto.requestDateTime),
            ptoStart: ptoStart,
            ptoEnd: ptoEnd,
          };
        })
      ),
    enabled: userId > 0,
  });
};

export default usePtoRequestsForSelectedYear;
