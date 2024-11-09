import { AxiosResponse } from 'axios';
import { SupervisorDashboardResponse } from '../model/Dashboard';
import APIclient from './APIclient';

export const fetchSupervisorDashboardData = (supervisorId: number, calendarStart: string, calendarEnd: string) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<SupervisorDashboardResponse>('/api/v1/dashboard/supervisor', {
    params: {
      supervisor_id: supervisorId,
      calendarStart: calendarStart,
      calendarEnd: calendarEnd,
    },
  }).then((res: AxiosResponse<SupervisorDashboardResponse>) => res.data);

  return { request: httpRequest, cancel: () => controller.abort() };
};
