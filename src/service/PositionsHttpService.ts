import { AxiosResponse } from 'axios';
import APIclient from './APIclient';
import { EmployeePosition } from '../model/User';

export const fetchJobPositions = () => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<EmployeePosition[]>('/api/v1/positions/all').then(
    (res: AxiosResponse<EmployeePosition[]>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};
