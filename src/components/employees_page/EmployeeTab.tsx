import { Box, HStack, Text } from '@chakra-ui/react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { EmployeeBasic } from '../../model/User';
import { Activebadge } from './Activebadge';
import { InactiveBadge } from './InactiveBadge';
import { UnfinishedRegistrationBadge } from '../UnfinishedRegistrationBadge';

interface Props {
  employee: EmployeeBasic;
  onEmployeeChange: (employeeId: number) => void;
}

export const EmployeeTab = ({ employee, onEmployeeChange }: Props) => {
  const determineSeniority = () => {
    const years = Math.floor(employee.seniorityInMonths / 12);
    const months = (employee.seniorityInMonths - years * 12) % 12;

    if (years > 0) {
      return `${years} lat, ${months} miesięcy`;
    } else {
      return `${months} miesięcy`;
    }
  };

  return (
    <HStack
      w={'100%'}
      borderRadius={'30px'}
      py={1}
      px={3}
      cursor={'pointer'}
      onClick={() => onEmployeeChange(employee.appUserId)}
      _hover={{ bg: '#E3EDF2' }}
    >
      <Box flexBasis={'50%'}>
        <FaRegCircleUser />
      </Box>
      <Text flexBasis={'100%'}>{employee.firstName}</Text>
      <Text flexBasis={'100%'}>{employee.lastName}</Text>
      <Text flexBasis={'100%'}>{employee.position ? employee.position.displayName : ''}</Text>
      <Text flexBasis={'100%'}>{determineSeniority()}</Text>
      <Box flexBasis={'50%'}>
        {!employee.registrationFinished && <UnfinishedRegistrationBadge />}
        {employee.active && <Activebadge />}
        {employee.registrationFinished && !employee.active && <InactiveBadge />}
      </Box>
    </HStack>
  );
};
