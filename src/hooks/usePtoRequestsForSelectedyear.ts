import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { getPtoRequestsForSelectedYear } from '../service/PtoHttpService';

const usePtoRequestsForSelectedYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoReqYear', userId, year],
    queryFn: () =>
      getPtoRequestsForSelectedYear(year, userId).request.then(res =>
        res.map(pto => {
          const ptoStartLocal =  new Date(pto.ptoStart);
          const ptoEndLocal = new Date(pto.ptoEnd);
          const ptoStart = new Date(Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate()));
          const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));
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
