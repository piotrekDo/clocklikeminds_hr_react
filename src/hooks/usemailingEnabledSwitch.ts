import { useQuery } from '@tanstack/react-query';
import { switchMailingEnabled } from '../service/SettingsService';

const useSwitchMailing = () => {
  return useQuery<boolean, Error>({
    queryKey: ['settings', 'mailingEnabled'],
    queryFn: () => switchMailingEnabled(),
    enabled: false,
  });
};

export default useSwitchMailing;
