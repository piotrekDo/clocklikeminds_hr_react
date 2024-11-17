import { useQuery } from '@tanstack/react-query';
import { Page } from '../model/Page';
import { PtoRequestResponse } from '../model/Pto';
import { fetchPtosByAppliersId } from '../service/TimeOffHttpService';

const useEmployeePtoRequestsSimplePagination = (empId: number, page: number, size: number) => {
  return useQuery<Page<PtoRequestResponse>, Error>({
    queryKey: ['ptosByEmployee', empId],
    queryFn: ({ signal }) => fetchPtosByAppliersId(empId, page, size, signal),
    keepPreviousData: true,
    enabled: empId > 0,
  });
};

export default useEmployeePtoRequestsSimplePagination;
