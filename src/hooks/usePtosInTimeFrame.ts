import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosInTimeFrame } from '../service/TimeOffHttpService';

const usePtosInTimeFrame = (acceptorId: number, start: string, end: string) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptosInTimeFrame', start, end],
    queryFn: ({ signal }) =>
      fetchPtosInTimeFrame(start, end, signal).then(res =>
        res.flatMap(res => res.requestsByTimeFrame).map(pto => {
          const ptoStartLocal = new Date(pto.ptoStart);
          const ptoEndLocal = new Date(pto.ptoEnd);
          const withdrawnLocal = pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined;
          const ptoStart = new Date(
            Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate())
          );
          const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));
          return {
            ...pto,
            requestDateTime: new Date(pto.requestDateTime),
            ptoStart: ptoStart,
            ptoEnd: ptoEnd,
            decisionDateTime: pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined,
            withdrawnDateTime: withdrawnLocal,
          };
        })
      ),
    enabled: acceptorId > 0,
  });
};

export default usePtosInTimeFrame;
