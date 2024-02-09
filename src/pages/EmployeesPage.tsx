import { Spinner, VStack } from '@chakra-ui/react';
import { EmployeeDetails } from '../components/employees_page/EmployeeDetails';
import { EmployeesOverview } from '../components/employees_page/EmployeesOverview';
import useEmployees from '../hooks/useEmployees';
import useEmployeeState from '../state/useEmployeesState';

export const EmployeesPage = () => {
  const { data: employees, error, isFetching, isLoading } = useEmployees();
  const { selectedEmloyee } = useEmployeeState();

  return (
    <VStack w={'100%'} h={'100%'}>
      {isFetching && <Spinner size={'xl'} />}
      {!isFetching && !selectedEmloyee && <EmployeesOverview employees={employees?.content || []} />}
      {selectedEmloyee && <EmployeeDetails />}
    </VStack>
  );
};
