import { useQuery } from '@tanstack/react-query';
import { EmployeeBasic } from '../model/User';
import { Page } from '../model/Page';
import { fetchEmployeePage } from '../service/UsersHttpService';

const useEmployees = () => {
  return useQuery<Page<EmployeeBasic>, Error>({
    queryKey: ['employees'],
    queryFn: ({signal}) => fetchEmployeePage({ page: 0, pageSize: 200 }, signal),
  });
};

export default useEmployees;
