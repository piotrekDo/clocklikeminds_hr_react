import { Box, HStack, Heading, Tabs, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSuitcase } from 'react-icons/fa';
import useEmployees from '../../hooks/useEmployees';
import useJobPostitions from '../../hooks/useJobPositions';
import useHttpErrorState from '../../state/useHttpErrorState';
import { EmployeeListTab } from './EmployeeListTab';
import { NewJobPositionModal } from './NewJobPositionModal';
import { PositionsListTab } from './PositionsListTab';

type Tabs = 'timeoff' | 'employees' | 'positions';

export const EmployeesOverview = () => {
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
        <VStack w={'100%'} h={'100%'}>
          <HStack
            justifyContent={'center'}
            w={'100%'}
            fontSize={'1.1rem'}
            spacing={5}
            mt={2}
            borderBottom={'2px solid lightgrey'}
          >
            <Box cursor={'pointer'} onClick={() => setSelectedTab('timeoff')}>
              Urlopy
            </Box>
            <Box cursor={'pointer'} onClick={() => setSelectedTab('employees')}>
              Pracownicy
            </Box>
            <Box cursor={'pointer'} onClick={() => setSelectedTab('positions')}>
              Stanowiska
            </Box>
          </HStack>
          <Box w={'100%'} h={'100%'}>
            {selectedTab === 'timeoff' && (
              <VStack w={'100%'} h={'100%'}>
                <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
                  <HStack w={'80%'} justifyContent={'space-around'}>
                    <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
                      <FaSuitcase size={'3rem'} color='#F27CA2' />
                      <Heading>Urlopy</Heading>
                      <Text>Urlopy pracowników</Text>
                    </VStack>
                    <Box w={'40%'}></Box>
                  </HStack>

                  <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
                    <Heading w={'100%'} textAlign={'start'}>
                      Oczekujące na akceptację
                    </Heading>
                  </VStack>
                </VStack>
              </VStack>
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
