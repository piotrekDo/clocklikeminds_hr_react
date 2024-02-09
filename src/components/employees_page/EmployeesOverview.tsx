import { VStack, HStack, Heading, Box, Text, Tabs, TabList, TabPanel, TabPanels, Tab, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GoPeople } from 'react-icons/go';
import { EmployeeTable } from './EmployeeTable';
import { EmployeeBasic, EmployeePosition } from '../../model/User';
import { AnimatePresence, motion } from 'framer-motion';
import { PositionsTable } from './PositionsTable';
import { GoPlus } from 'react-icons/go';
import { NewJobPositionModal } from './NewJobPositionModal';

interface Props {
  employees: EmployeeBasic[];
  positions: EmployeePosition[];
}

export const EmployeesOverview = ({ employees, positions }: Props) => {
  const pendingRegistration = (employees && employees.filter(e => !e.active).length) || 0;
  const [positionModalOpened, setPositionModalOpened] = useState<boolean>(false);

  const handleModalToggle = () => {
    setPositionModalOpened(s => !s)
  }

  useEffect(() => {
    console.log(employees);
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
                  <Box as='b' w={'40%'}>
                    {pendingRegistration} oczekujących na dokończenie rejestracji
                  </Box>
                </HStack>
                <EmployeeTable employees={(employees && employees) || []} />
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
                <PositionsTable positions={positions} />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <NewJobPositionModal isOpen={positionModalOpened} onClose={handleModalToggle}/>
      </motion.div>
    </AnimatePresence>
  );
};
