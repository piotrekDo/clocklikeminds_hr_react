import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosInTimeFrame } from '../service/TimeOffHttpService';

const usePtosRequestsForSupervisorCalendar = (acceptorId: number, start: string, end: string) => {
  const queryClient = useQueryClient();

  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['tempPto'],
    queryFn: () =>
      fetchPtosInTimeFrame(acceptorId, start, end).request.then(res =>
        res.map(pto => {
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
            withdrawnDateTime: withdrawnLocal
          };
        })
      ),
    onSuccess: data => {
      let existingData = queryClient.getQueryData<PtoRequestFormatted[]>(['ptosForSupervisorCalendar']) ?? [];

      data.forEach(newData => {
        const found = existingData.find(existing => existing.id === newData.id);
        if (found) {
          if (newData.decisionDateTime && !newData.wasAccepted) {
            existingData = existingData.filter(x => x.id !== newData.id);
          } else {
            const index = existingData.indexOf(found);
            existingData[index] = newData;
          }
        } else {
          if (!newData.decisionDateTime || (newData.decisionDateTime && newData.wasAccepted)) {
            existingData.push(newData);
          }
        }
      });

      existingData.sort((a, b) => {
        const aStart = a.ptoStart.getTime();
        const bStart = b.ptoStart.getTime();
        const aEnd = a.ptoEnd.getTime();
        const bEnd = b.ptoEnd.getTime();
        if (bStart <= aEnd && bEnd >= aStart) {
          return 0;
        }
        return aStart - bStart;
      });
      queryClient.setQueryData(['ptosForSupervisorCalendar'], existingData);
    },
    enabled: acceptorId > 0,
  });
};

export default usePtosRequestsForSupervisorCalendar;
