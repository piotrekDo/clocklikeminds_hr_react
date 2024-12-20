import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosByAcceptor } from '../service/TimeOffHttpService';
import { mapPtoRequestResponseToFormatted } from '../utils';

const usePtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoToAccept', acceptorId],
    queryFn: ({signal}) =>
      fetchPtosByAcceptor(acceptorId, signal).then(res =>
        res.map(pto => mapPtoRequestResponseToFormatted(pto))
      ),
    enabled: acceptorId > 0,
  });
};

export default usePtosByAcceptor;
