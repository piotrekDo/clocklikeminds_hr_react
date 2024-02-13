import { Box, Button, HStack, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GoPeople, GoPlus } from 'react-icons/go';
import useEmployees from '../../hooks/useEmployees';
import useJobPostitions from '../../hooks/useJobPositions';
import { EmployeeTable } from './EmployeeTable';
import { NewJobPositionModal } from './NewJobPositionModal';
import { PositionsTable } from './PositionsTable';


export const EmployeesOverview = () => {
  const {data: employees, isError: employeesIsError, isFetching: isEmployeesFetching} =  useEmployees();
  const {data: positions, isError: positionsIsError, isFetching: isPositionsFetching} = useJobPostitions();
  const [pendingRegistration, setPendingRegistration] = useState<number | undefined>();
  const [positionModalOpened, setPositionModalOpened] = useState<boolean>(false);

  const handleModalToggle = () => {
    setPositionModalOpened(s => !s)
  }

  useEffect(() => {
    employees && setPendingRegistration(employees.content.filter(e => !e.active).length || 0)
  }, [employees]);
  
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
        <Tabs w={'100%'} h={'100%'}>
          <TabList justifyContent={'center'}>
            <Tab>Pracownicy</Tab>
            <Tab>Stanowiska</Tab>
          </TabList>
          <TabPanels w={'100%'} h={'100%'}>
            <TabPanel w={'100%'} h={'100%'}>
              <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
                <HStack w={'80%'} justifyContent={'space-around'}>
                  <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
                    <GoPeople size={'3rem'} color='#F27CA2' />
                    <Heading>Pracownicy</Heading>
                    <Text>Lista pracowników</Text>
                  </VStack>
                  <HStack as='b' w={'40%'}>
                    {!isEmployeesFetching && employees && <Text>{pendingRegistration}</Text>} 
                    {isEmployeesFetching && <Spinner />}
                    <Text>oczekujących na dokończenie rejestracji</Text>
                  </HStack>
                </HStack>
                {!isEmployeesFetching && employees && <EmployeeTable employees={(employees.content) || []} />}
                {isEmployeesFetching && <Spinner />}
              </VStack>
            </TabPanel>

            <TabPanel w={'100%'} h={'100%'}>
              <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
                <HStack w={'80%'} justifyContent={'space-around'}>
                  <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
                    <GoPeople size={'3rem'} color='#F27CA2' />
                    <Heading>Stanowiska</Heading>
                    <Text>Lista stanowisk</Text>
                  </VStack>
                  <Box w={'40%'} onClick={handleModalToggle}>
                    <Button
                      w={'100%'}
                      maxW={'200px'}
                      h={'80px'}
                    >
                      <GoPlus size={'40px'} />
                      <Text fontSize={'1.5rem'} as={'b'}>
                        Dodaj nowe
                      </Text>
                    </Button>
                  </Box>
                </HStack>
                {!isPositionsFetching && positions && <PositionsTable positions={positions} />}
                {isPositionsFetching && <Spinner />}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <NewJobPositionModal isOpen={positionModalOpened} onClose={handleModalToggle}/>
      </motion.div>
    </AnimatePresence>
  );
};
