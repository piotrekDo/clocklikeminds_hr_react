import { VStack } from '@chakra-ui/react';
import { EmployeeBasic } from '../../model/User';
import useEmployeeState from '../../state/useEmployeesState';
import useSortState from '../../state/useSortState';
import { EmployeeTab } from './EmployeeTab';
import { EmployeeTableHeader } from './EmployeeTableHeader';

interface Props {
  employees: EmployeeBasic[];
}

export const EmployeeTable = ({ employees }: Props) => {
  const setEmployee = useEmployeeState(s => s.setSelectedEmployee);
  const sortOrder = useSortState(s => s.employeeTableSortType);

  console.log(employees);

  const sortEmployees = (): EmployeeBasic[] => {
    if (sortOrder === 'firstNameAsc') {
      return employees.sort((a, b) => a.firstName.localeCompare(b.firstName, 'pl'));
    } else if (sortOrder === 'firstNameDesc') {
      return employees.sort((a, b) => a.firstName.localeCompare(b.firstName, 'pl')).reverse();
    } else if (sortOrder === 'lastNameAsc') {
      return employees.sort((a, b) => a.lastName.localeCompare(b.lastName, 'pl'));
    } else if (sortOrder === 'lastNameDesc') {
      return employees.sort((a, b) => a.lastName.localeCompare(b.lastName, 'pl')).reverse();
    } else if (sortOrder === 'positionAsc') {
      return employees.sort((a, b) => {
        const positionA = a.position ? a.position.displayName : '';
        const positionB = b.position ? b.position.displayName : '';
        return positionA.localeCompare(positionB, 'pl');
      });
    } else if (sortOrder === 'positionDesc') {
      return employees
        .sort((a, b) => {
          const positionA = a.position ? a.position.displayName : '';
          const positionB = b.position ? b.position.displayName : '';
          return positionA.localeCompare(positionB, 'pl');
        })
        .reverse();
    } else if (sortOrder === 'seniorityAsc') {
      return employees.sort((a, b) => a.seniorityInMonths - b.seniorityInMonths);
    } else if (sortOrder === 'seniorityDesc') {
      return employees.sort((a, b) => b.seniorityInMonths - a.seniorityInMonths);
    } else if (sortOrder === 'statusAsc') {
      return employees.sort((a, b) => a.status - b.status);
    } else if (sortOrder === 'statusDesc') {
      return employees.sort((a, b) => b.status - a.status);
    }
    return [];
  };

  return (
    <VStack w={'80%'} maxW={'1200px'} h={'100%'}>
      <EmployeeTableHeader />
      <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
        {employees &&
          sortEmployees().map(e => <EmployeeTab key={e.appUserId} employee={e} onEmployeeChange={setEmployee} />)}
      </VStack>
    </VStack>
  );
};
