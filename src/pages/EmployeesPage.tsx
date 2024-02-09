import { Box, HStack, Heading, SelectField, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GoPeople } from 'react-icons/go';
import { EmployeeTable } from '../components/employees_page/EmployeeTable';
import useEmployees from '../hooks/useEmployees';
import { Employee } from '../model/User';
import useEmployeeState from '../state/useEmployeesState';
import { EmployeesOverview } from '../components/employees_page/EmployeesOverview';
import { EmployeeDetails } from '../components/employees_page/EmployeeDetails';

export const EmployeesPage = () => {
  const { data: employees, error, isFetching, isLoading } = useEmployees();
  const { selectedEmloyee } = useEmployeeState();


return (
  <VStack w={'100%'} h={'100%'}>
    {isFetching && <Spinner size={'xl'}/>}
    {!isFetching && !selectedEmloyee && <EmployeesOverview employees={employees?.content || []}/>}
    {selectedEmloyee && <EmployeeDetails />}
  </VStack>
)
};
