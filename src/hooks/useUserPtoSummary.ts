import { useQuery } from '@tanstack/react-query';
import { UserPtoSummary } from '../model/Pto';
import { fetchUserPtoSummary } from '../service/TimeOffHttpService';

const useUserPtoSummary = (userId: number) => {
  return useQuery<UserPtoSummary, Error>({
    queryKey: ['ptoSummary', userId],
    queryFn: ({ signal }) => fetchUserPtoSummary(userId, signal),
    enabled: userId > 0,
  });
};

export default useUserPtoSummary;
