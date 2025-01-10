import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TimeOffRequestsByEmployeeFormatted } from '../model/Pto';
import { fetchPtosInTimeFrame } from '../service/TimeOffHttpService';

const usePtosRequestsForSupervisorCalendar = (start: string, end: string, type: string[]) => {
  const queryClient = useQueryClient();

  return useQuery<TimeOffRequestsByEmployeeFormatted[], Error>({
    queryKey: ['tempPto'],
    queryFn: ({ signal }) =>
      fetchPtosInTimeFrame(start, end, signal).then(res =>
        res.map(resp => {
          return {
            employee: resp.employee,
            requestsByTimeFrame: resp.requestsByTimeFrame.map(request => {
              const ptoStartLocal = new Date(request.ptoStart);
              const ptoEndLocal = new Date(request.ptoEnd);
              const withdrawnLocal = request.withdrawnDateTime ? new Date(request.withdrawnDateTime) : undefined;
              const ptoStart = new Date(
                ptoStartLocal.getFullYear(),
                ptoStartLocal.getMonth(),
                ptoStartLocal.getDate(),
                0,
                0,
                0,
                0
              );
              const ptoEnd = new Date(
                ptoEndLocal.getFullYear(),
                ptoEndLocal.getMonth(),
                ptoEndLocal.getDate(),
                0,
                0,
                0,
                0
              );
              return {
                ...request,
                requestDateTime: new Date(request.requestDateTime),
                ptoStart: ptoStart,
                ptoEnd: ptoEnd,
                decisionDateTime: request.decisionDateTime ? new Date(request.decisionDateTime) : undefined,
                withdrawnDateTime: withdrawnLocal,
              };
            }),
          };
        })
      ),
    onSuccess: data => {
      queryClient.setQueryData(type, data);
    },
  });
};

export default usePtosRequestsForSupervisorCalendar;
