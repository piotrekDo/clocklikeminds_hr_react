import { useQuery, useQueryClient } from '@tanstack/react-query';
import { switchMailingHrEnabled } from '../service/SettingsService';

const useMailingEnabledHr = () => {
  const queryClient = useQueryClient();

  return useQuery<boolean, Error>({
    queryKey: ['settings', 'mailingHrEnabled'],
    queryFn: () => switchMailingHrEnabled(),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
    },
    enabled: false,
  });
};

export default useMailingEnabledHr;
