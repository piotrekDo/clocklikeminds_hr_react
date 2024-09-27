import { Box, HStack, Spinner, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PtoCompareModal } from '../components/supervisor/requests/PtoCompareModal';
import { TimeOffRequestsSetToWithdraw } from '../components/supervisor/requests/TimeOffRequestsSetToWithdraw';
import { TimeOffRequestsToResolve } from '../components/supervisor/requests/TimeOffRequestsToResolve';
import { UnresolvedTimeOffRequestModal } from '../components/supervisor/requests/UnresolvedTimeOffRequestModal';
import { SupervisorTeamView } from '../components/supervisor/team/SupervisorTeamView';
import useEmployeesForSupervisor from '../hooks/useEmployeesForSupervisor';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import usePtoModalStore from '../state/usePtoModalStore';

type Tabs = 'requests' | 'employees';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const { ptoToCompareDates, ptoExtendedModal, setPtoToCompareDates, setPtoExtendedModal } = usePtoModalStore();
  const [selectedTab, setSelectedTab] = useState<Tabs>('requests');

  const {
    data: unresolvedPtos,
    isFetching: isUnresolvedPtosFetching,
    isLoading: isUnresolvedPtosLoading,
    isError: isUnresolvedPtosError,
    error: unresolvedPtosError,
  } = useUnresolvedPtosByAcceptor(appUser?.userId || -1);

  const {
    data: employees,
    isError: employeesIsError,
    error: employeesError,
    isFetching: isEmployeesFetching,
  } = useEmployeesForSupervisor(appUser?.userId || -1);

  useEffect(() => {
    isUnresolvedPtosError && setError(unresolvedPtosError);
    employeesIsError && setError(employeesError);
  }, [isUnresolvedPtosError, employeesIsError]);

  const onCloseCompareModal = () => {
    setPtoToCompareDates(undefined);
  };

  const onClosePtoExtendedModal = () => {
    setPtoExtendedModal(undefined);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '99%',
          height: '99%',
        }}
      >
        <PtoCompareModal isOpen={!!ptoToCompareDates} onClose={onCloseCompareModal} />
        <UnresolvedTimeOffRequestModal isOpen={!!ptoExtendedModal} onClose={onClosePtoExtendedModal} />
        <HStack
          justifyContent={'center'}
          w={'100%'}
          fontSize={'1.1rem'}
          spacing={10}
          mt={2}
          borderBottom={'2px solid lightgrey'}
        >
          <Box
            cursor={'pointer'}
            fontWeight={selectedTab === 'requests' ? 'bold' : ''}
            onClick={() => setSelectedTab('requests')}
          >
            Wnioski
          </Box>
          <Box
            cursor={'pointer'}
            fontWeight={selectedTab === 'employees' ? 'bold' : ''}
            onClick={() => setSelectedTab('employees')}
          >
            Zespół
          </Box>
        </HStack>

        {selectedTab === 'requests' && (
          <VStack pt={5}>
            <VStack w={'100%'} spacing={'100px'}>
              {unresolvedPtos && unresolvedPtos.filter(p => p.wasMarkedToWithdraw).length > 0 && (
                <TimeOffRequestsSetToWithdraw
                  unresolvedPtos={unresolvedPtos?.filter(p => p.wasMarkedToWithdraw)}
                  isUnresolvedPtosFetching={isUnresolvedPtosFetching}
                  isUnresolvedPtosLoading={isUnresolvedPtosLoading}
                />
              )}
              <TimeOffRequestsToResolve
                unresolvedPtos={unresolvedPtos?.filter(p => !p.wasMarkedToWithdraw)}
                isUnresolvedPtosFetching={isUnresolvedPtosFetching}
                isUnresolvedPtosLoading={isUnresolvedPtosLoading}
              />
            </VStack>
          </VStack>
        )}

        {selectedTab === 'employees' && (
          <VStack pt={5}>
            {isEmployeesFetching && <Spinner />}
            {employees && <SupervisorTeamView employees={employees} />}
          </VStack>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
