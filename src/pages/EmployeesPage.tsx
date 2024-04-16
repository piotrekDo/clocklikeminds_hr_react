import { Box, VStack } from '@chakra-ui/react';
import { EmployeeDetails } from '../components/employees_page/details/EmployeeDetails';
import { EmployeesOverview } from '../components/employees_page/overview/EmployeesOverview';
import useEmployeeState from '../state/useEmployeesState';

export const EmployeesPage = () => {
  const { selectedEmloyee } = useEmployeeState();

  return (
    <VStack w={'100%'} h={'100%'} position={'relative'}>
      {!selectedEmloyee && <EmployeesOverview />}
      {selectedEmloyee && <EmployeeDetails />}
    </VStack>
  );
};
