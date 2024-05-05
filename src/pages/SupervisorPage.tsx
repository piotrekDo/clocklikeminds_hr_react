import { Box, HStack, Heading, Spinner, VStack, Text } from '@chakra-ui/react';
import { SupervisorCalendar } from '../components/supervisor/SupervisorCalendat/SupervisorCalendar';
import usePtosByAcceptor from '../hooks/usePtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useEmployeeDetails from '../hooks/useEmployeeDetails';
import { useEffect, useState } from 'react';
import { PtoRequestFormatted } from '../model/Pto';
import { Calendar } from '../components/supervisor/SupervisorCalendat/Calendar';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useHttpErrorState from '../state/useHttpErrorState';
import { PtoToAcceptCard } from '../components/supervisor/PtoToAcceptCard';

export const SupervisorPage = () => {
  // const [ptosToAccept, setPtosToAccept] = useState<PtoRequestFormatted[]>([]);
  // const {
  //   data: supervisor,
  //   isFetching: isSupervisorFetching,
  //   isError: isSupervisorFetchingError,
  // } = useEmployeeDetails(appUser?.userId || -1);
  // const {
  //   data: ptosByAcceptor,
  //   isFetching: isPtosFetching,
  //   isLoading: isPtosLoading,
  //   isError: isPtosFetchingError,
  //   refetch: refetchPtos,
  // } = usePtosByAcceptor(appUser?.userId || -1);

  // useEffect(() => {
  //   const ptosToAccept = (ptosByAcceptor && ptosByAcceptor?.filter(p => !p.decisionDateTime)) || [];
  //   setPtosToAccept(ptosToAccept);
  // }, [ptosByAcceptor]);

  // return (
  //   <VStack w={'100%'} h={'100%'}>
  //     <Calendar ptos={ptosByAcceptor?.sort((x,y) => x.ptoStart.getTime() - y.ptoEnd.getTime()) || []}/>
  //   </VStack>
  // );

  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const {
    data: unresolvedPtos,
    isFetching: isUnresolvedPtosFetching,
    isLoading: isUnresolvedPtosLoading,
    isError: isUnresolvedPtosError,
    error: unresolvedPtosError,
  } = useUnresolvedPtosByAcceptor(appUser?.userId || -1);

  useEffect(() => {
    isUnresolvedPtosError && setError(unresolvedPtosError);
  }, [isUnresolvedPtosError]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <VStack w={'100%'}>
        <Heading>Wnioski do rozpatrzenia</Heading>
        <VStack>
          {unresolvedPtos &&
            unresolvedPtos.length > 0 &&
            unresolvedPtos.map((pto, index) => <PtoToAcceptCard key={pto.id} pto={pto} />)}
        </VStack>
      </VStack>
    </VStack>
  );
};
