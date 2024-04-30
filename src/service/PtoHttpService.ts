import { AxiosResponse } from 'axios';
import APIclient from './APIclient';
import { NewPtoRequest, PtoRequestResponse, UserPtoSummary } from '../model/Pto';
import { Page } from '../model/Page';

export const fetchUserPtoSummary = (userId: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<UserPtoSummary>('/api/v1/pto/summary', {
    params: {
      id: userId,
    },
  }).then((res: AxiosResponse<UserPtoSummary>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const fetchPtosByAcceptor = (acceptorId: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<PtoRequestResponse[]>('/api/v1/pto/requests-by-acceptor', {
    params: {
      acceptorId: acceptorId,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const fetchPtosByAppliersId = (applierId: number, page: number, size: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<Page<PtoRequestResponse>>('/api/v1/pto/byId', {
    params: {
      id: applierId,
      page: page,
      size: size,
    },
  }).then((res: AxiosResponse<Page<PtoRequestResponse>>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const sendNewPtoRequest = (request: NewPtoRequest) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<PtoRequestResponse>('/api/v1/pto/request-new', request).then(
    (res: AxiosResponse<PtoRequestResponse>) => res.data
  );

  return { request: httpRequest, cancel: () => controller.abort() };
};

export const getPtoRequestsForSelectedYear = (year: number, userId: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<PtoRequestResponse[]>('/api/v1/pto/requests-for-year', {
    params: {
      userId: userId,
      year: year,
    },
  }).then((res: AxiosResponse<PtoRequestResponse[]>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};
