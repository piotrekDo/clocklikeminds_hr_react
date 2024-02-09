import { Spinner, VStack } from '@chakra-ui/react';
import { EmployeeDetails } from '../components/employees_page/EmployeeDetails';
import { EmployeesOverview } from '../components/employees_page/EmployeesOverview';
import useEmployees from '../hooks/useEmployees';
import useEmployeeState from '../state/useEmployeesState';
import useJobPostitions from '../hooks/useJobPositions';

export const EmployeesPage = () => {
  const { data: employees, error, isFetching } = useEmployees();
  const { data: positions, error: positionsError, isFetching: positionsFetching } = useJobPostitions();
  const { selectedEmloyee } = useEmployeeState();

  return (
    <VStack w={'100%'} h={'100%'}>
      {isFetching || positionsFetching && <Spinner size={'xl'} />}
      {!isFetching && !positionsFetching && !selectedEmloyee && <EmployeesOverview positions={positions || []} employees={employees?.content || []} />}
      {selectedEmloyee && <EmployeeDetails />}
    </VStack>
  );
};
