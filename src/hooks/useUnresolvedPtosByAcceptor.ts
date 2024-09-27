import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted, PtoRequestResponse } from '../model/Pto';
import { fetchUnresolvedPtosByAcceptor } from '../service/TimeOffHttpService';

const useUnresolvedPtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoUnresolved', acceptorId],
    queryFn: async () => {
      const response = await fetchUnresolvedPtosByAcceptor(acceptorId).request;
      return response.map((pto: PtoRequestResponse) => {
        return {
          ...pto,
          requestDateTime: new Date(pto.requestDateTime),
          ptoStart: new Date(pto.ptoStart),
          ptoEnd: new Date(pto.ptoEnd),
          decisionDateTime: new Date(pto.decisionDateTime),
          withdrawnDateTime: pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined,
        };
      });
    },
    enabled: acceptorId > 0,
  });
};

export default useUnresolvedPtosByAcceptor;
