import { AxiosResponse } from 'axios';
import { Page, PageQuery } from '../model/Page';
import {
  Employee,
  EmployeeBasic,
  EmployeeInfo,
  FinishRegistrationRequest,
  UpdateHireDataRequest,
  UpdateHolidayDataRequest,
  UpdatePositionHistoryRequest,
  UpdateUserPermissionRequest,
} from '../model/User';
import APIclient from './APIclient';

export const fetchUserdata = (id: number, signal?: AbortSignal) => {
  return APIclient.get<Employee>(`/api/v1/users/${id}`, { signal }).then((res: AxiosResponse<Employee>) => res.data);
};

export const fetchSupervisors = (signal?: AbortSignal) => {
  return APIclient.get<EmployeeBasic[]>('/api/v1/users/supervisors', { signal }).then(
    (res: AxiosResponse<EmployeeBasic[]>) => res.data
  );
};

export const fetchEmployeesForSupervisor = (supervisorId: number, signal?: AbortSignal) => {
  return APIclient.get<EmployeeInfo[]>('/api/v1/users/employees-by-supervisor', {
    signal,
    params: {
      supervisorId: supervisorId,
    },
  }).then((res: AxiosResponse<EmployeeInfo[]>) => res.data);
};

export const fetchEmployeePage = (page: PageQuery, signal?: AbortSignal) => {
  return APIclient.get<Page<EmployeeBasic>>('/api/v1/users/all-users', {
    signal,
    params: {
      page: page.page,
      size: page.pageSize,
    },
  }).then((res: AxiosResponse<Page<EmployeeBasic>>) => res.data);
};

export const fetchEmployeeDetails = (employeeId: number, signal?: AbortSignal) => {
  return APIclient.get<Employee>(`/api/v1/users/${employeeId}`, { signal }).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};

export const finishRegister = (request: FinishRegistrationRequest) => {
  return APIclient.post<Employee>('/api/v1/users/finish-register', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};

export const updateHireData = (request: UpdateHireDataRequest) => {
  return APIclient.post<Employee>('/api/v1/users/update-hire-data', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};

export const updateHolidayData = (request: UpdateHolidayDataRequest) => {
  return APIclient.post<Employee>('/api/v1/users/update-holiday-data', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};

export const updatePositionHistory = (request: UpdatePositionHistoryRequest[], employeeId: number) => {
  return APIclient.post<Employee>(`/api/v1/users/${employeeId}/update-position-history`, request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};

export const updateUserPermission = (request: UpdateUserPermissionRequest) => {
  return APIclient.post<Employee>('/api/v1/users/update-permission', request).then(
    (res: AxiosResponse<Employee>) => res.data
  );
};
