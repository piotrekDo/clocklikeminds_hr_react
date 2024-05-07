import { VStack } from '@chakra-ui/react';

import { Calendar } from '../components/supervisor/SupervisorCalendat/Calendar';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';

export const PtoCalendar = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);

  return (
    <VStack w={'100%'} h={'100%'} p={5}>
      <Calendar />
    </VStack>
  );
};
