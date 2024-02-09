import { AxiosResponse } from 'axios';
import { Page, PageQuery } from '../model/Page';
import { EmployeeBasic, Employee } from '../model/User';
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
  const httpRequest = APIclient.get<Employee>(`/api/v1/users/${employeeId}`, {
  }).then((res: AxiosResponse<Employee>) => res.data);
  return { request: httpRequest, cancel: () => controller.abort() };
};
