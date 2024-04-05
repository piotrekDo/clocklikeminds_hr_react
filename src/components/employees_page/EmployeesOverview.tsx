import { Box, HStack, Tabs, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useEmployees from '../../hooks/useEmployees';
import useJobPostitions from '../../hooks/useJobPositions';
import usePtoToAccept from '../../hooks/usePtoToAccept';
import useAuthentication from '../../state/useAuthentication';
import useHttpErrorState from '../../state/useHttpErrorState';
import { EmployeeListTab } from './EmployeeListTab';
import { EmployeesTimeOffTab } from './EmployeesTimeOffTab';
import { NewJobPositionModal } from './NewJobPositionModal';
import { PositionsListTab } from './PositionsListTab';

type Tabs = 'timeoff' | 'employees' | 'positions';

export const EmployeesOverview = () => {
  const user = useAuthentication(s => s.appUser);
  const [selectedTab, setSelectedTab] = useState<Tabs>('employees');
  const setError = useHttpErrorState(s => s.setError);
  const {
    data: employees,
    isError: employeesIsError,
    error: employeesError,
    isFetching: isEmployeesFetching,
  } = useEmployees();
  const {
    data: positions,
    isError: positionsIsError,
    error: positionsError,
    isFetching: isPositionsFetching,
  } = useJobPostitions();
  const {
    data: ptosToAccept,
    isError: ptoIsError,
    error: ptoError,
    isFetching: isPtoFetching,
  } = usePtoToAccept(user?.userId || -1);
  const [pendingRegistration, setPendingRegistration] = useState<number | undefined>();
  const [positionModalOpened, setPositionModalOpened] = useState<boolean>(false);

  const handleModalToggle = () => {
    setPositionModalOpened(s => !s);
  };

  useEffect(() => {
    employees && setPendingRegistration(employees.content.filter(e => !e.active).length || 0);
  }, [employees]);

  useEffect(() => {
    employeesIsError && setError(employeesError);
    positionsIsError && setError(positionsError);
    ptoError && setError(ptoError);
  }, [employeesIsError, positionsIsError, ptoIsError]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '90%',
          height: '90%',
        }}
      >
        <VStack w={'100%'} h={'100%'}>
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
              fontWeight={selectedTab === 'timeoff' ? 'bold' : ''}
              onClick={() => setSelectedTab('timeoff')}
            >
              Urlopy
            </Box>
            <Box
              cursor={'pointer'}
              fontWeight={selectedTab === 'employees' ? 'bold' : ''}
              onClick={() => setSelectedTab('employees')}
            >
              Pracownicy
            </Box>
            <Box
              cursor={'pointer'}
              fontWeight={selectedTab === 'positions' ? 'bold' : ''}
              onClick={() => setSelectedTab('positions')}
            >
              Stanowiska
            </Box>
          </HStack>
          <Box w={'100%'} h={'100%'} maxH={'90vh'}>
            {selectedTab === 'timeoff' && (
              <EmployeesTimeOffTab 
              ptosToAccept={ptosToAccept} 
              isPtoFetching={isPtoFetching} />
            )}

            {selectedTab === 'employees' && (
              <EmployeeListTab
                employees={employees}
                isEmployeesFetching={isEmployeesFetching}
                pendingRegistration={pendingRegistration}
              />
            )}

            {selectedTab === 'positions' && (
              <PositionsListTab
                positions={positions}
                isPositionsFetching={isPositionsFetching}
                handleModalToggle={handleModalToggle}
              />
            )}
          </Box>
        </VStack>
        <NewJobPositionModal isOpen={positionModalOpened} onClose={handleModalToggle} />
      </motion.div>
    </AnimatePresence>
  );
};
