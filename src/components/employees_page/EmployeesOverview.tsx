import { VStack, HStack, Heading, Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { GoPeople } from 'react-icons/go';
import { EmployeeTable } from './EmployeeTable';
import { EmployeeBasic } from '../../model/User';

interface Props {
    employees: EmployeeBasic[]
}

export const EmployeesOverview = ({employees}: Props) => {
    const pendingRegistration = (employees && employees.filter(e => !e.active).length) || 0;
    useEffect(() => {
      console.log(employees);
    }, [employees]);
  return (
    <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
      <HStack w={'80%'} justifyContent={'space-around'}>
        <VStack alignItems={'start'}>
          <GoPeople size={'3rem'} color='#F27CA2'/>
          <Heading>Pracownicy</Heading>
          <Text>Lista pracowników</Text>
        </VStack>
        <Box as='b'>{pendingRegistration} oczekujących na dokończenie rejestracji</Box>
      </HStack>

      <EmployeeTable employees={(employees && employees) || []} />
    </VStack>
  );
};
