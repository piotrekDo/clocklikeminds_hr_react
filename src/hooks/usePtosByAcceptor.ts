import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosByAcceptor } from '../service/PtoHttpService';

const usePtosByAcceptor = (acceptorId: number) => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptoToAccept', acceptorId],
    queryFn: () =>
      fetchPtosByAcceptor(acceptorId).request.then(res =>
        res.map(pto => {
          const ptoStart =  new Date(pto.ptoStart);
          ptoStart.setHours(0, 0, 0, 0);
          const ptoEnd = new Date(pto.ptoEnd);
          ptoEnd.setHours(0, 0, 0, 0);
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
