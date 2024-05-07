import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import useEmployeeDetails from '../hooks/useEmployeeDetails';
import usePtosByAcceptor from '../hooks/usePtosByAcceptor';
import { PtoRequestFormatted } from '../model/Pto';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import { Calendar } from '../components/supervisor/SupervisorCalendat/Calendar';
import usePtosRequestsForSupervisorCalendar from '../hooks/usePtosForSupervisorCalendar';

export const PtoCalendar = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);


  return (
    <VStack w={'100%'} h={'100%'} p={5}>
      <Calendar />
    </VStack>
  );
};
