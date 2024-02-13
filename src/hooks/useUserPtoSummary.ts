import { useQuery } from '@tanstack/react-query';
import { UserPtoSummary } from '../model/Pto';
import { fetchUserPtoSummary } from '../service/PtoHttpService';

const useUserPtoSummary = (userId: number) => {
  return useQuery<UserPtoSummary, Error>({
    queryKey: ['ptoSummary', userId],
    queryFn: () => fetchUserPtoSummary(userId).request,
    enabled: userId > 0,
  });
};

export default useUserPtoSummary;
