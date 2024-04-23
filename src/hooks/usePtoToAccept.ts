import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosByAcceptor } from '../service/PtoHttpService';

const usePtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoToAccept', acceptorId],
    queryFn: () =>
      fetchPtosByAcceptor(acceptorId).request.then(res =>
        res.map(pto => ({
          ...pto,
          requestDateTime: new Date(pto.requestDateTime),
          ptoStart: new Date(pto.ptoStart),
          ptoEnd: new Date(pto.ptoEnd),
        }))
      ),
    enabled: acceptorId > 0,
  });
};

export default usePtosByAcceptor;
