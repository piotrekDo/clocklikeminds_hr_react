import { useQuery } from '@tanstack/react-query';
import { Setting } from '../model/Setting';
import { fetchSettings } from '../service/SettingsService';

const useSettings = (shouldFetch: boolean) => {
  return useQuery<Setting[], Error>({
    queryKey: ['settings'],
    queryFn: () => fetchSettings().request,
    enabled: shouldFetch,
  });
};

export default useSettings;
