import { useQuery } from '@tanstack/react-query';
import { SupervisorDashboardFormatted } from '../model/Dashboard';
import { fetchSupervisorDashboardData } from '../service/DashboardService';
import { PtoRequestResponse } from '../model/Pto';

// returns -1 for inactiveEmployees and newEmployees if user is not admin

const useSupervisorDashboard = (supervisorId: number, calendarStart: string, calendarEnd: string) => {
  return useQuery<SupervisorDashboardFormatted, Error>({
    queryKey: ['supervisorDashboard', supervisorId],
    queryFn: async ({ signal }) => {
      const response = await fetchSupervisorDashboardData(supervisorId, calendarStart, calendarEnd, signal);
      const dashboardFormatted: SupervisorDashboardFormatted = {
        requestsForDashboardCalendar: response.requestsForDashboardCalendar.map((req: PtoRequestResponse) => {
          return {
            ...req,
            requestDateTime: new Date(req.requestDateTime),
            ptoStart: new Date(req.ptoStart),
            ptoEnd: new Date(req.ptoEnd),
            decisionDateTime: req.decisionDateTime ? new Date(req.decisionDateTime) : undefined,
            withdrawnDateTime: req.withdrawnDateTime ? new Date(req.withdrawnDateTime) : undefined,
          };
        }),
        unresolvedRequestsCount: response.unresolvedRequestsCount,
        requestToWithdraw: response.requestToWithdraw,
        newEmployees: response.newEmployees,
        inactiveEmployees: response.inactiveEmployees,
      };
      return dashboardFormatted;
    },
  });
};

export default useSupervisorDashboard;
