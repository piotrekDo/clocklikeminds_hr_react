import { useQuery } from '@tanstack/react-query';
import { EmployeeInfo } from '../model/User';
import { fetchEmployeesForSupervisor } from '../service/UsersHttpService';

const useEmployeesForSupervisor = (supervisorId: number) => {
  return useQuery<EmployeeInfo[], Error>({
    queryKey: ['employees-by-supervisor', supervisorId],
    queryFn: () => fetchEmployeesForSupervisor(supervisorId).request,
    enabled: supervisorId > -1,
  });
};

export default useEmployeesForSupervisor;
