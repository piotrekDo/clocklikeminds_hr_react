import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosInTimeFrame } from '../service/TimeOffHttpService';

const usePtosRequestsForSupervisorCalendar = (acceptorId: number, start: string, end: string, type: string[]) => {
  const queryClient = useQueryClient();

  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['tempPto'],
    queryFn: ({ signal }) =>
      fetchPtosInTimeFrame(acceptorId, start, end, signal).then(res =>
        res.map(pto => {
          const ptoStartLocal = new Date(pto.ptoStart);
          const ptoEndLocal = new Date(pto.ptoEnd);
          const withdrawnLocal = pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined;
          const ptoStart = new Date(
            ptoStartLocal.getFullYear(),
            ptoStartLocal.getMonth(),
            ptoStartLocal.getDate(),
            0,
            0,
            0,
            0
          );
          const ptoEnd = new Date(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate(), 0, 0, 0, 0);
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
    onSuccess: data => {
      data.sort((a, b) => {
        const aStart = a.ptoStart.getTime();
        const bStart = b.ptoStart.getTime();
        const aEnd = a.ptoEnd.getTime();
        const bEnd = b.ptoEnd.getTime();
        if (bStart <= aEnd && bEnd >= aStart) {
          return 0;
        }
        return aStart - bStart;
      });

      queryClient.setQueryData(type, data);
    },
    enabled: acceptorId > 0,
  });
};

export default usePtosRequestsForSupervisorCalendar;
