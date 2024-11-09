import { PtoRequestFormatted, PtoRequestResponse } from './Pto';

export interface SupervisorDashboardResponse {
  requestsForDashboardCalendar: PtoRequestResponse[];
  unresolvedRequestsCount: number;
  requestToWithdraw: number;
  newEmployees: number;
  inactiveEmployees: number;
}

export interface SupervisorDashboardFormatted {
    requestsForDashboardCalendar: PtoRequestFormatted[];
    unresolvedRequestsCount: number;
    requestToWithdraw: number;
    newEmployees: number;
    inactiveEmployees: number;
}
