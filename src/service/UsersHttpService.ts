import { AxiosResponse } from 'axios';
import { Page, PageQuery } from '../model/Page';
import {
  Employee,
  EmployeeBasic,
  FinishRegistrationRequest,
  UpdateHireDataRequest,
  UpdateHolidayDataRequest,
  UpdatePositionHistoryRequest,
  UpdateUserPermissionRequest,
} from '../model/User';
import APIclient from './APIclient';

export const fetchEmployeePage = (page: PageQuery) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<Page<EmployeeBasic>>('/api/v1/users/all-users', {
    params: {
      page: page.page,
      size: page.pageSize,
    },
  }).then((res: AxiosResponse<Page<EmployeeBasic>>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const fetchEmployeeDetails = (employeeId: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.get<Employee>(`/api/v1/users/${employeeId}`, {}).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const finishRegister = (request: FinishRegistrationRequest) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<Employee>('/api/v1/users/finish-register', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const updateHireData = (request: UpdateHireDataRequest) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<Employee>('/api/v1/users/update-hire-data', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const updateHolidayData = (request: UpdateHolidayDataRequest) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<Employee>('/api/v1/users/update-holiday-data', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const updatePositionHistory = (request: UpdatePositionHistoryRequest[], employeeId: number) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<Employee>(`/api/v1/users/${employeeId}/update-position-history`, request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};

export const updateUserPermission = (request: UpdateUserPermissionRequest) => {
  const controller = new AbortController();
  const httpRequest = APIclient.post<Employee>('/api/v1/users/update-permission', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
  return { request: httpRequest, cancel: () => controller.abort() };
};
