import { useQuery } from '@tanstack/react-query';
import { Page } from '../model/Page';
import { PtoRequestResponse } from '../model/Pto';
import { fetchPtosByAppliersId } from '../service/PtoHttpService';

const useEmployeePtoRequestsSimplePagination = (empId: number, page: number, size: number) => {
  return useQuery<Page<PtoRequestResponse>, Error>({
    queryKey: ['ptosByEmployee', empId],
    queryFn: () => fetchPtosByAppliersId(empId, page, size).request,
    keepPreviousData: true,
    enabled: empId > 0,
  });
};

export default useEmployeePtoRequestsSimplePagination;
