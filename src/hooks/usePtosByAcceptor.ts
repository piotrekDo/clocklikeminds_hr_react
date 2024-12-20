import { useQuery } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../model/Pto';
import { fetchPtosByAcceptor } from '../service/TimeOffHttpService';
import { mapPtoRequestResponseToFormatted } from '../utils';

const useLast10PtosByAcceptor = () => {
  return useQuery<PtoRequestFormatted[], Error>({
    queryKey: ['ptosByAcceptor'],
    queryFn: ({ signal }) =>
      fetchPtosByAcceptor(0, 10, signal).then(res => res.content.map(pto => mapPtoRequestResponseToFormatted(pto))),
    enabled: false,
  });
};

export default useLast10PtosByAcceptor;
