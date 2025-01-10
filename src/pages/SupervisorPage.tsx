import { VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { QueryShelf } from '../components/supervisor/QueryShelf';
import { TimeOffRequestsShelf } from '../components/supervisor/TimeOffRequestsShelf';
import { TeamShelf } from '../components/supervisor/team/TeamShelf';
import useEmployeesForSupervisor from '../hooks/useEmployeesForSupervisor';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
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
        <VStack w={'100%'} pb={'100px'}>
          <VStack w={'100%'} pt={'50px'} px={'15px'}>
            <QueryShelf employees={employees} isEmployeesFetching={isEmployeesFetching} />
          </VStack>

          <VStack w={'100%'} pt={'50px'} px={'15px'}>
            {unresolvedPtos && (
              <TimeOffRequestsShelf
                title='Wnioski urlopowe do rozpatrzenia'
                requests={unresolvedPtos?.filter(p => !p.wasMarkedToWithdraw)}
                isFetching={isUnresolvedPtosFetching}
              />
            )}
          </VStack>
          <VStack w={'100%'} pt={'50px'} px={'15px'}>
            {unresolvedPtos && (
              <TimeOffRequestsShelf
                title='Wnioski zgłoszone do wycofania'
                requests={unresolvedPtos?.filter(p => p.wasMarkedToWithdraw)}
                isFetching={isUnresolvedPtosFetching}
              />
            )}
          </VStack>
          <VStack w={'100%'} pt={'50px'} px={'15px'}>
            {employees && <TeamShelf employees={employees} isFetching={isEmployeesFetching} />}
          </VStack>
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
