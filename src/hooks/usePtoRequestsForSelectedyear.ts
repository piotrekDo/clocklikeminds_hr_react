import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { getPtoRequestsForSelectedYear } from '../service/PtoHttpService';

const usePtoRequestsForSelectedYear = (userId: number, year: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoReqYear', userId, year],
    queryFn: () => getPtoRequestsForSelectedYear(year, userId).request
    .then(res => res.map(pto => ({
        ...pto,
        requestDateTime: new Date(pto.requestDateTime),
        ptoStart: new Date(pto.ptoStart),
        ptoEnd: new Date(pto.ptoEnd)
    }))),
    enabled: userId > 0,
  });
};

export default usePtoRequestsForSelectedYear