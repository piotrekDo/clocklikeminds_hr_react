import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted, TimeOffByQueryRequest } from '../model/Pto';
import { fetchRequestsByCriteriaAdmin } from '../service/TimeOffHttpService';
import { mapPtoRequestResponseToFormatted } from '../utils';

const usePtosByCriteriaForAdmin = (query: TimeOffByQueryRequest) => {
    return useQuery<PtoRequestFormatted[], Error>({
        queryKey: ['ptoByCriteria'],
        queryFn: ({signal}) =>
          fetchRequestsByCriteriaAdmin(query, signal).then(res =>
            res.map(pto => mapPtoRequestResponseToFormatted(pto))
          ),
      });
}

export default usePtosByCriteriaForAdmin;