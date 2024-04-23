import { Box, HStack, Heading, Spinner, VStack } from '@chakra-ui/react';
import { SupervisorCalendar } from '../components/supervisor/SupervisorCalendat/SupervisorCalendar';
import usePtosByAcceptor from '../hooks/usePtoToAccept';
import useAuthentication from '../state/useAuthentication';
import useEmployeeDetails from '../hooks/useEmployeeDetails';
import { useEffect, useState } from 'react';
import { PtoRequestFormatted } from '../model/Pto';

export const SupervisorPage = () => {
  const [ptosToAccept, setPtosToAccept] = useState<PtoRequestFormatted[]>([]);
  const appUser = useAuthentication(s => s.appUser);
  const {
    data: supervisor,
    isFetching: isSupervisorFetching,
    isError: isSupervisorFetchingError,
  } = useEmployeeDetails(appUser?.userId || -1);
  const {
    data: ptosByAcceptor,
    isFetching: isPtosFetching,
    isLoading: isPtosLoading,
    isError: isPtosFetchingError,
    refetch: refetchPtos,
  } = usePtosByAcceptor(appUser?.userId || -1);

  useEffect(() => {
    const ptosToAccept = (ptosByAcceptor && ptosByAcceptor?.filter(p => !p.decisionDateTime)) || [];
    setPtosToAccept(ptosToAccept);
  }, [ptosByAcceptor]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack w={'100%'} h={'100%'} flexShrink={0}>
        <VStack h={'100%'} flexBasis={'100%'}>
          <VStack p={5} w={'100%'} minH={'300px'}>
            <Heading>Wnioski do akceptacji</Heading>
            {isPtosFetching && <Spinner />}
            {!isPtosFetching && !isPtosFetchingError && ptosToAccept.length === 0 && (
              <Heading>Brak wniosków do rozpatrzenia</Heading>
            )}
            {!isPtosFetching &&
              !isPtosFetchingError &&
              ptosToAccept.length > 0 &&
              ptosToAccept.map((pto, index) => <Box key={index}>{pto.applierEmail}</Box>)}
          </VStack>
        </VStack>
        <VStack h={'100%'} flexBasis={'40%'} minW={'300px'} p={5}>
          <Heading>Podwładni</Heading>
          {isSupervisorFetching && <Spinner />}
          {!isSupervisorFetching &&
            !isSupervisorFetchingError &&
            supervisor &&
            supervisor.subordinates.length === 0 && <Heading>Brak podwładnych do wyświetlenia.</Heading>}
          {!isSupervisorFetching &&
            !isSupervisorFetchingError &&
            supervisor &&
            supervisor.subordinates.length > 0 &&
            supervisor.subordinates.map((emp, index) => (
              <Box key={index}>
                {emp.firstName} {emp.lastName}
              </Box>
            ))}
        </VStack>
      </HStack>
      {isPtosFetching ||
        (isSupervisorFetching && (
          <VStack w={'100%'} justify={'center'} align={'center'}>
            <Spinner />
          </VStack>
        ))}
      {!isPtosFetching && !isSupervisorFetching && ptosByAcceptor &&(
        <SupervisorCalendar
          ptosToRender={
            (ptosByAcceptor &&
              ptosByAcceptor.filter(p => !p.decisionDateTime || (p.decisionDateTime && p.wasAccepted))) ||
            []
          }
        />
      )}
    </VStack>
  );
};
