import { VStack } from '@chakra-ui/react';
import { EmployeeBasic } from '../../model/User';
import useEmployeeState from '../../state/useEmployeesState';
import { EmployeeTab } from './EmployeeTab';
import { EmployeeTableHeader } from './EmployeeTableHeader';

interface Props {
  employees: EmployeeBasic[];
}

export const EmployeeTable = ({ employees }: Props) => {
  const setEmployee = useEmployeeState(s => s.setSelectedEmployee);
  return (
    <VStack w={'80%'} maxW={'1200px'} h={'100%'}>
      <EmployeeTableHeader />
      <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
        {employees && employees.map(e => <EmployeeTab key={e.appUserId} employee={e} onEmployeeChange={setEmployee} />)}
      </VStack>
    </VStack>
  );
};
