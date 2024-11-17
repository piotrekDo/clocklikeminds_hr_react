import { AxiosResponse } from 'axios';
import { SupervisorDashboardResponse } from '../model/Dashboard';
import APIclient from './APIclient';

export const fetchSupervisorDashboardData = (
  supervisorId: number,
  calendarStart: string,
  calendarEnd: string,
  signal?: AbortSignal
) => {
  return APIclient.get<SupervisorDashboardResponse>('/api/v1/dashboard/supervisor', {
    signal,
    params: {
      supervisor_id: supervisorId,
      calendarStart: calendarStart,
      calendarEnd: calendarEnd,
    },
  }).then((res: AxiosResponse<SupervisorDashboardResponse>) => res.data);
};
