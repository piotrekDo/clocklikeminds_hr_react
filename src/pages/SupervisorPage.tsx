import { HStack, VStack } from '@chakra-ui/react';
import { SupervisorCalendar } from '../components/supervisor/SupervisorCalendat/SupervisorCalendar';
import usePtoToAccept from '../hooks/usePtoToAccept';
import useAuthentication from '../state/useAuthentication';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const { data: ptosToAccept, isFetching, isLoading, isError, refetch } = usePtoToAccept(appUser?.userId || -1);

  return (
    <VStack w={'100%'} h={'100%'}>
      <SupervisorCalendar />
      <HStack bg={'blue.100'} w={'100%'} h={'100%'} flexShrink={0}></HStack>
    </VStack>
  );
};
