import { Box, HStack, Text } from '@chakra-ui/react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { EmployeeBasic } from '../../../model/User';
import { Activebadge } from '../../badges/Activebadge';
import { InactiveBadge } from '../../badges/InactiveBadge';
import { UnfinishedRegistrationBadge } from '../../badges/UnfinishedRegistrationBadge';

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

  const trimDisplay = (str: string): string => {
    if (!str || (str && str.length <= 25)) {
      return str;
    }

    return str.substring(0, 22) + '...';
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
      <Text flexBasis={'100%'}>{trimDisplay(employee.lastName)}</Text>
      <Text flexBasis={'100%'}>{employee.position ? trimDisplay(employee.position.displayName) : ''}</Text>
      <Text flexBasis={'100%'}>{determineSeniority()}</Text>
      <Box flexBasis={'50%'}>
        {!employee.registrationFinished && <UnfinishedRegistrationBadge />}
        {employee.active && <Activebadge />}
        {employee.registrationFinished && !employee.active && <InactiveBadge />}
      </Box>
    </HStack>
  );
};
