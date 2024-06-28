import { useQuery } from '@tanstack/react-query';
import { MetaData } from '../model/MetaData';
import { fetchMetaData } from '../service/MetaDataHttpService';

const useMetaData = (enabled: boolean) => {
  return useQuery<MetaData, Error>({
    queryKey: ['meta'],
    queryFn: () => fetchMetaData().request,
    staleTime: 86400000,
    enabled: enabled    
  });
};

export default useMetaData;
