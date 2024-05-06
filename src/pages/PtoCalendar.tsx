import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import useEmployeeDetails from '../hooks/useEmployeeDetails';
import usePtosByAcceptor from '../hooks/usePtosByAcceptor';
import { PtoRequestFormatted } from '../model/Pto';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import { Calendar } from '../components/supervisor/SupervisorCalendat/Calendar';

export const PtoCalendar = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const [ptosToAccept, setPtosToAccept] = useState<PtoRequestFormatted[]>([]);
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
    <VStack w={'100%'} h={'100%'} p={5}>
      <Calendar ptos={ptosByAcceptor?.sort((x, y) => x.ptoStart.getTime() - y.ptoEnd.getTime()) || []} />
    </VStack>
  );
};
