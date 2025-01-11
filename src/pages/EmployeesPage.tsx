import { VStack } from '@chakra-ui/react';
import { EmployeeView } from '../components/employees_page/EmployeeView';
import { EmployeesOverview } from '../components/employees_page/overview/EmployeesOverview';
import useEmployeeState from '../state/useEmployeesState';

export const EmployeesPage = () => {
  const { selectedEmloyee } = useEmployeeState();

  return (
    <VStack w={'100%'} h={'100%'} position={'relative'}>
      {!selectedEmloyee && <EmployeesOverview />}
      {selectedEmloyee && <EmployeeView />}
    </VStack>
  );
};
