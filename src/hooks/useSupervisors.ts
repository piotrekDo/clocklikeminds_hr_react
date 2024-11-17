import { useQuery } from '@tanstack/react-query';
import { EmployeeBasic } from '../model/User';
import { fetchSupervisors } from '../service/UsersHttpService';

const useSupervisors = () => {
  return useQuery<EmployeeBasic[], Error>({
    queryKey: ['supervisors'],
    queryFn: ({signal}) => fetchSupervisors(signal),
  });
};

export default useSupervisors;
