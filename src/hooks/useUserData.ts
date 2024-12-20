import { useQuery } from '@tanstack/react-query';
import { Employee } from '../model/User';
import { fetchUserdata } from '../service/UsersHttpService';

const useUserData = (userId: number) => {
  return useQuery<Employee, Error>({
    queryKey: ['userData', userId],
    queryFn: ({ signal }) => fetchUserdata(userId, signal),
    enabled: userId > 0,
  });
};

export default useUserData;
