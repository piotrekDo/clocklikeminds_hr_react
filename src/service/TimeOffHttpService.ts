import { AxiosResponse } from 'axios';
import { Page } from '../model/Page';
import {
  HolidayOnSaturday,
  HolidayOnSaturdayAdminSummary,
  HolidayOnSaturdayByUser,
  NewPtoRequest,
  PtoRequestResponse,
  RequestsForUserCalendar,
  ResolvePtoRequest,
  TimeOffByQueryRequest,
  TimeOffRequestsByEmployeeResponse,
  UserPtoSummary,
  WithdrawResponse,
} from '../model/Pto';
import APIclient from './APIclient';

export const fetchUserPtoSummary = (userId: number, signal?: AbortSignal) => {
  return APIclient.get<UserPtoSummary>('/api/v1/pto/summary', {
    signal,
    params: {
      id: userId,
    },
  }).then((res: AxiosResponse<UserPtoSummary>) => res.data);
};

export const fetchRequestsForuserCalendar = (year: number, signal?: AbortSignal) => {
  return APIclient.get<RequestsForUserCalendar>('/api/v1/pto/requests-for-user-calendar', {
    signal,
    params: {
      year: year,
    },
  }).then((res: AxiosResponse<RequestsForUserCalendar>) => res.data);
};

export const fetchUnresolvedPtosByAcceptor = (acceptorId: number, signal?: AbortSignal) => {
  return APIclient.get<PtoRequestResponse[]>('/api/v1/pto/unresolved-by-acceptor', {
    signal,
    params: {
      id: acceptorId,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
};

export const fetchPtosByAcceptor = (page: number, size: number, signal?: AbortSignal) => {
  return APIclient.get<Page<PtoRequestResponse>>('/api/v1/pto/requests-by-acceptor', {
    signal,
    params: {
      page: page,
      size: size,
    },
  }).then((res: AxiosResponse<Page<PtoRequestResponse>>) => res.data);
};

export const fetchPtosInTimeFrame = (start: string, end: string, signal?: AbortSignal) => {
  return APIclient.get<TimeOffRequestsByEmployeeResponse[]>(
    '/api/v1/pto/requests-for-supervisor-calendar-by-employees',
    {
      signal,
      params: {
        start: start,
        end: end,
      },
    }
  ).then((res: AxiosResponse<TimeOffRequestsByEmployeeResponse[]>) => res.data);
};

export const fetchPtosByAppliersId = (applierId: number, page: number, size: number, signal?: AbortSignal) => {
  return APIclient.get<Page<PtoRequestResponse>>('/api/v1/pto/byId', {
    signal,
    params: {
      id: applierId,
      page: page,
      size: size,
    },
  }).then((res: AxiosResponse<Page<PtoRequestResponse>>) => res.data);
};

export const fetchAllRequestsForYearForUser = (year: number, userId: number, signal?: AbortSignal) => {
  return APIclient.get<PtoRequestResponse[]>('/api/v1/pto/all-requests-for-user', {
    signal,
    params: {
      userId: userId,
      year: year,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
};

export const getPtoRequestsForSelectedYear = (year: number, userId: number, signal?: AbortSignal) => {
  return APIclient.get<PtoRequestResponse[]>('/api/v1/pto/requests-for-year', {
    signal,
    params: {
      userId: userId,
      year: year,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
};

export const fetchSaturdayHolidayForAdmin = (year: number, signal?: AbortSignal) => {
  return APIclient.get<HolidayOnSaturdayAdminSummary>('/api/v1/pto/holidays-on-saturday-admin', {
    signal,
    params: {
      year: year,
    },
  }).then((res: AxiosResponse<HolidayOnSaturdayAdminSummary>) => res.data);
};

export const fetchSaturDayOnHolidayByUsers = (holidayId: number, supervisorId: number, signal?: AbortSignal) => {
  return APIclient.get<HolidayOnSaturdayByUser[]>('/api/v1/pto/holiday-on-saturday-by-users', {
    signal,
    params: {
      holidayId: holidayId,
      supervisorId: supervisorId,
    },
  }).then((res: AxiosResponse<HolidayOnSaturdayByUser[]>) => res.data);
};

export const fetchRequestsByCriteriaAdmin = (query: TimeOffByQueryRequest, signal?: AbortSignal) => {
  return APIclient.get<PtoRequestResponse[]>('/api/v1/pto/by-criteria-admin', {
    signal,
    params: {
      id: query.id,
      employeeId: query.employeeId,
      employeeEmail: query.employeeEmail,
      acceptorId: query.acceptorId,
      acceptorEmail: query.acceptorEmail,
      wasAccepted: query.wasAccepted,
      wasRejected: query.wasRejected,
      isPending: query.isPending,
      requestDateFrom: query.requestDateFrom,
      requestDateTo: query.requestDateTo,
      ptoStartFrom: query.ptoStartFrom,
      ptoStartTo: query.ptoStartTo,
      ptoEndFrom: query.ptoEndFrom,
      ptoEndTo: query.ptoEndTo,
      useOr: query.useOr,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
};

export const fetchRequestsByCriteriaSupervisor = (query: TimeOffByQueryRequest, signal?: AbortSignal) => {
  return APIclient.get<PtoRequestResponse[]>('/api/v1/pto/by-criteria-supervisor', {
    signal,
    params: {
      id: query.id,
      employeeId: query.employeeId,
      employeeEmail: query.employeeEmail,
      acceptorId: query.acceptorId,
      acceptorEmail: query.acceptorEmail,
      wasAccepted: query.wasAccepted,
      wasRejected: query.wasRejected,
      isPending: query.isPending,
      requestDateFrom: query.requestDateFrom,
      requestDateTo: query.requestDateTo,
      ptoStartFrom: query.ptoStartFrom,
      ptoStartTo: query.ptoStartTo,
      ptoEndFrom: query.ptoEndFrom,
      ptoEndTo: query.ptoEndTo,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
};

export const requestNewHolidayOnSaturday = (request: HolidayOnSaturday) => {
  return APIclient.post<HolidayOnSaturday>('/api/v1/pto/new-saturday-holiday', request).then(
    (res: AxiosResponse<HolidayOnSaturday>) => res.data
  );
};

export const withdrawTimeOffRequest = (requestId: number, applierNotes: string | undefined) => {
  return APIclient.post(`/api/v1/pto/withdraw?requestId=${requestId}&applierNotes=${applierNotes}`).then(
    (res: AxiosResponse<WithdrawResponse>) => res.data
  );
};

export const sendNewPtoRequest = (request: NewPtoRequest) => {
  return APIclient.post<PtoRequestResponse>('/api/v1/pto/request-new', request).then(
    (res: AxiosResponse<PtoRequestResponse>) => res.data
  );
};

export const resolvePto = (resolve: ResolvePtoRequest) => {
  return APIclient.post<PtoRequestResponse>('/api/v1/pto/resolve-request', resolve).then(
    (res: AxiosResponse<PtoRequestResponse>) => res.data
  );
};

export const resendMailRequest = (requestId: number) => {
  return APIclient.get<boolean>('/api/v1/pto/resend-request-by-mail', {
    params: {
      requestId,
    },
  }).then((res: AxiosResponse<boolean>) => res.data);
};

export const generateTimeOffPdf = async (timeOffId: number, setIsGeneratingPdf: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsGeneratingPdf(true)
  APIclient.get<Blob>('/api/v1/pto/generate-pdf', {
    responseType: 'blob',
    params: {
      timeOffId,
    },
  })
    .then((response: AxiosResponse<Blob>) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Wniosek.pdf');
      document.body.appendChild(link);
      link.click();

      // Sprzątanie
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsGeneratingPdf(false)
    })
    .catch(error => {
      console.error('Error while generating the template:', error);
      setIsGeneratingPdf(false)
    });
};
