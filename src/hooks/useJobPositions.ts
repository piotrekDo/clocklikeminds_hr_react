import { useQuery } from '@tanstack/react-query';
import { EmployeePosition } from '../model/User';
import { fetchJobPositions } from '../service/PositionsHttpService';

const useJobPostitions = () => {
  return useQuery<EmployeePosition[], Error>({
    queryKey: ['positions'],
    queryFn: () => fetchJobPositions().request,
  });
};

export default useJobPostitions;
