import { useQuery } from '@tanstack/react-query';
import { Employee } from '../model/User';
import { fetchEmployeeDetails } from '../service/UsersHttpService';

const useEmployeeDetails = (employeeId: number) => {
  return useQuery<Employee, Error>({
    queryKey: ['employee', employeeId],
    queryFn: ({ signal }) => fetchEmployeeDetails(employeeId, signal),
    enabled: employeeId > 0,
  });
};

export default useEmployeeDetails;
