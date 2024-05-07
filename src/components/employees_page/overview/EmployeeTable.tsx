import { Text, VStack } from '@chakra-ui/react';
import { EmployeeBasic } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import useSortState from '../../../state/useSortState';
import { EmployeeTab } from './EmployeeTab';
import { EmployeeTableHeader } from './EmployeeTableHeader';

interface Props {
  employees: EmployeeBasic[];
}

export const EmployeeTable = ({ employees }: Props) => {
  const setEmployee = useEmployeeState(s => s.setSelectedEmployee);
  const { employeeTableSortType: sortOrder, firstNameFilter, lastNameFilter, positionFilter } = useSortState();

  const sortEmployees = (): EmployeeBasic[] => {
    let result = employees;
    if (positionFilter) {
      result = result.filter(
        e => e.position && e.position.displayName.toLocaleLowerCase().includes(positionFilter.toLocaleLowerCase())
      );
    }

    if (lastNameFilter) {
      result = result.filter(
        e => e.lastName && e.lastName.toLocaleLowerCase().includes(lastNameFilter.toLocaleLowerCase())
      );
    }

    if (firstNameFilter) {
      result = result.filter(
        e => e.firstName && e.firstName.toLocaleLowerCase().includes(firstNameFilter.toLocaleLowerCase())
      );
    }

    if (sortOrder === 'firstNameAsc') {
      result = result.sort((a, b) => a.firstName.localeCompare(b.firstName, 'pl'));
    } else if (sortOrder === 'firstNameDesc') {
      result = result.sort((a, b) => a.firstName.localeCompare(b.firstName, 'pl')).reverse();
    } else if (sortOrder === 'lastNameAsc') {
      result = result.sort((a, b) => a.lastName.localeCompare(b.lastName, 'pl'));
    } else if (sortOrder === 'lastNameDesc') {
      result = result.sort((a, b) => a.lastName.localeCompare(b.lastName, 'pl')).reverse();
    } else if (sortOrder === 'positionAsc') {
      result = result.sort((a, b) => {
        const positionA = a.position ? a.position.displayName : '';
        const positionB = b.position ? b.position.displayName : '';
        return positionA.localeCompare(positionB, 'pl');
      });
    } else if (sortOrder === 'positionDesc') {
      result = result
        .sort((a, b) => {
          const positionA = a.position ? a.position.displayName : '';
          const positionB = b.position ? b.position.displayName : '';
          return positionA.localeCompare(positionB, 'pl');
        })
        .reverse();
    } else if (sortOrder === 'seniorityAsc') {
      result = result.sort((a, b) => a.seniorityInMonths - b.seniorityInMonths);
    } else if (sortOrder === 'seniorityDesc') {
      result = result.sort((a, b) => b.seniorityInMonths - a.seniorityInMonths);
    } else if (sortOrder === 'statusAsc') {
      result = result.sort((a, b) => a.status - b.status);
    } else if (sortOrder === 'statusDesc') {
      result = result.sort((a, b) => b.status - a.status);
    }
    return result;
  };

  const filterResult = sortEmployees();

  return (
    <VStack w={'100%'} maxW={'1300px'} h={'100%'}>
      <Text w={'100%'} as={'b'}>
        {`Wyświetlam ${filterResult.length} wyników z ${employees.length}`}
      </Text>
      <EmployeeTableHeader />
      <VStack
        w={'100%'}
        h={'100%'}
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
      >
        {employees &&
          filterResult.map(e => <EmployeeTab key={e.appUserId} employee={e} onEmployeeChange={setEmployee} />)}
      </VStack>
    </VStack>
  );
};
