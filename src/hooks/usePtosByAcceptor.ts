import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosByAcceptor } from '../service/PtoHttpService';

const usePtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoToAccept', acceptorId],
    queryFn: () =>
      fetchPtosByAcceptor(acceptorId).request.then(res =>
        res.map(pto => {
          const ptoStartLocal =  new Date(pto.ptoStart);
          const ptoEndLocal = new Date(pto.ptoEnd);
          const ptoStart = new Date(Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate()));
          const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));
          return {
            ...pto,
            requestDateTime: new Date(pto.requestDateTime),
            ptoStart: ptoStart,
            ptoEnd: ptoEnd,
          };
        })
      ),
    enabled: acceptorId > 0,
  });
};

export default usePtosByAcceptor;
