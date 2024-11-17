import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted, PtoRequestResponse } from '../model/Pto';
import { fetchUnresolvedPtosByAcceptor } from '../service/TimeOffHttpService';

const useUnresolvedPtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoUnresolved', acceptorId],
    queryFn: async ({signal}) => {
      const response = await fetchUnresolvedPtosByAcceptor(acceptorId, signal);
      return response.map((pto: PtoRequestResponse) => {
        return {
          ...pto,
          requestDateTime: new Date(pto.requestDateTime),
          ptoStart: new Date(pto.ptoStart),
          ptoEnd: new Date(pto.ptoEnd),
          decisionDateTime: pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined,
          withdrawnDateTime: pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined,
        };
      });
    },
    enabled: acceptorId > 0,
  });
};

export default useUnresolvedPtosByAcceptor;
