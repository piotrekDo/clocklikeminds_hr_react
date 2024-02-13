import { VStack } from '@chakra-ui/react';
import { EmployeeDetails } from '../components/employees_page/EmployeeDetails';
import { EmployeesOverview } from '../components/employees_page/EmployeesOverview';
import useEmployeeState from '../state/useEmployeesState';

export const EmployeesPage = () => {
  const { selectedEmloyee } = useEmployeeState();

  return (
    <VStack w={'100%'} h={'100%'}>
      {!selectedEmloyee && <EmployeesOverview />}
      {selectedEmloyee && <EmployeeDetails />}
    </VStack>
  );
};
