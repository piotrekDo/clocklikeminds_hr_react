import { useQuery, useQueryClient } from '@tanstack/react-query';
import { switchMailingLocalEnabled } from '../service/SettingsService';

const useSwitchMailingLocal = () => {
  const queryClient = useQueryClient();

  return useQuery<boolean, Error>({
    queryKey: ['settings', 'mailingEnabled'],
    queryFn: () => switchMailingLocalEnabled(),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
    },
    enabled: false,
  });
};

export default useSwitchMailingLocal;
