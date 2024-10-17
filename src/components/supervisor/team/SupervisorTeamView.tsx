import { SimpleGrid } from '@chakra-ui/react';
import { EmployeeInfo } from '../../../model/User';
import { EmployeeCard } from './EmployeeCard';

interface Props {
  employees: EmployeeInfo[];
}

export const SupervisorTeamView = ({ employees }: Props) => {
  return (
    <SimpleGrid columns={4} spacing={10}>
      {employees.map(e => (
        <EmployeeCard key={e.appUserId} employee={e} />
      ))}
    </SimpleGrid>
  );
};
