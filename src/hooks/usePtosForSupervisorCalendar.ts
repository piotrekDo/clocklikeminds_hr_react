import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosForUserCalendar } from '../service/PtoHttpService';

const usePtosRequestsForSupervisorCalendar = (acceptorId: number, start: string, end: string) => {
  const queryClient = useQueryClient();

  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['tempPto'],
    queryFn: () =>
      fetchPtosForUserCalendar(acceptorId, start, end).request.then(res =>
        res.map(pto => {
          const ptoStartLocal = new Date(pto.ptoStart);
          const ptoEndLocal = new Date(pto.ptoEnd);
          const ptoStart = new Date(
            Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate())
          );
          const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));
          return {
            ...pto,
            requestDateTime: new Date(pto.requestDateTime),
            ptoStart: ptoStart,
            ptoEnd: ptoEnd,
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
      
        queryClient.setQueryData(['ptosForSupervisorCalendar'], existingData);
      },
    enabled: acceptorId > 0,
  });
};

export default usePtosRequestsForSupervisorCalendar;
