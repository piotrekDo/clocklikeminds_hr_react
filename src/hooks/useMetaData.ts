import { useQuery } from '@tanstack/react-query';
import { MetaData } from '../model/MetaData';
import { fetchMetaData } from '../service/MetaDataHttpService';

const useMetaData = () => {
  return useQuery<MetaData, Error>({
    queryKey: ['employees'],
    queryFn: () => fetchMetaData().request,
    staleTime: 86400000,
  });
};

export default useMetaData;
