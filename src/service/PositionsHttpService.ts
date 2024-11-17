import { AxiosResponse } from 'axios';
import APIclient from './APIclient';
import { EmployePositionRequest, EmployeePosition } from '../model/User';

export const fetchJobPositions = (signal?: AbortSignal) => {
  return APIclient.get<EmployeePosition[]>('/api/v1/positions/all', { signal }).then(
    (res: AxiosResponse<EmployeePosition[]>) => res.data
  );
};

export const requestNewJobPosition = (request: EmployePositionRequest) => {
  return APIclient.post<EmployeePosition>('/api/v1/positions', request).then(
    (res: AxiosResponse<EmployeePosition>) => res.data
  );
};
