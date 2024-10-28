import { Box, HStack, Tabs, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useEmployees from '../../../hooks/useEmployees';
import useJobPostitions from '../../../hooks/useJobPositions';
import useHttpErrorState from '../../../state/useHttpErrorState';
import { EmployeeListTab } from './EmployeeListTab';
import { NewJobPositionModal } from './NewJobPositionModal';
import { PositionsListTab } from './PositionsListTab';
import { TimeOffListTab } from './TimeOffListTab';
import useThemeState from '../../../state/useThemeState';
import { useQueryClient } from '@tanstack/react-query';
import { Page } from '../../../model/Page';
import { EmployeeBasic } from '../../../model/User';

type Tabs = 'timeoff' | 'employees' | 'positions';

export const EmployeesOverview = () => {
  const theme = useThemeState(s => s.themeConfig);
  const [selectedTab, setSelectedTab] = useState<Tabs>('employees');
  const setError = useHttpErrorState(s => s.setError);
  const queryClient = useQueryClient();
  let employees = queryClient.getQueryData<Page<EmployeeBasic>>(['employees']);
  const {
    // data: employees,
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
  const [pendingRegistration, setPendingRegistration] = useState<number | undefined>();
  const [positionModalOpened, setPositionModalOpened] = useState<boolean>(false);

  const handleModalToggle = () => {
    setPositionModalOpened(s => !s);
  };

  useEffect(() => {
    employees && setPendingRegistration(employees.content.filter(e => !e.registrationFinished).length || 0);
  }, [employees]);

  useEffect(() => {
    employeesIsError && setError(employeesError);
    positionsIsError && setError(positionsError);
  }, [employeesIsError, positionsIsError]);

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
        <VStack w={'100%'} h={'100%'} color={theme.fontColor}>
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
              fontWeight={selectedTab === 'timeoff' ? '800' : '600'}
              onClick={() => setSelectedTab('timeoff')}
              transform={selectedTab === 'timeoff' ? `translateY(-5px)` : ''}
              transition={'transform 200ms'}
            >
              Urlopy
            </Box>
            <Box
              cursor={'pointer'}
              fontWeight={selectedTab === 'employees' ? '800' : '600'}
              onClick={() => setSelectedTab('employees')}
              transform={selectedTab === 'employees' ? `translateY(-5px)` : ''}
              transition={'transform 200ms'}
            >
              Pracownicy
            </Box>
            <Box
              cursor={'pointer'}
              fontWeight={selectedTab === 'positions' ? '800' : '600'}
              onClick={() => setSelectedTab('positions')}
              transform={selectedTab === 'positions' ? `translateY(-5px)` : ''}
              transition={'transform 200ms'}
            >
              Stanowiska
            </Box>
          </HStack>
          <Box w={'100%'} h={'100%'} maxH={'90vh'}>
            {selectedTab === 'timeoff' && <TimeOffListTab />}
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
