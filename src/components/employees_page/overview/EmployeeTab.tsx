import { Box, HStack, Stack, Text, Tooltip } from '@chakra-ui/react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { EmployeeBasic } from '../../../model/User';
import { Activebadge } from '../../badges/Activebadge';
import { Freelancer } from '../../badges/Freelancer';
import { InactiveBadge } from '../../badges/InactiveBadge';
import { UnfinishedRegistrationBadge } from '../../badges/UnfinishedRegistrationBadge';
import useThemeState from '../../../state/useThemeState';
import { DaysLeftFromLasyYear } from '../../badges/DaysLeftFromLasyYear';

interface Props {
  employee: EmployeeBasic;
  onEmployeeChange: (employeeId: number) => void;
}

export const EmployeeTab = ({ employee, onEmployeeChange }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
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
      fontWeight={'500'}
      borderRadius={'30px'}
      py={1}
      px={3}
      cursor={'pointer'}
      onClick={() => onEmployeeChange(employee.appUserId)}
      _hover={{ bg: theme.elementBg }}
    >
      <HStack flexBasis={'50%'}>
        <Box>
          {employee.imageUrl && (
            <Box
              w={'30px'}
              h={'30px'}
              borderRadius={'30px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              overflow={'hidden'}
            >
              <img
                src={employee.imageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy='no-referrer'
              />
            </Box>
          )}
          {!employee.imageUrl && <FaRegCircleUser size={'30px'} />}
        </Box>
        {employee.freelancer && <Freelancer size='2rem' />}
      </HStack>
      <Text flexBasis={'100%'}>{employee.firstName}</Text>
      <Text flexBasis={'100%'}>{trimDisplay(employee.lastName)}</Text>
      <Text flexBasis={'100%'}>{employee.position ? trimDisplay(employee.position.displayName) : ''}</Text>
      <Text flexBasis={'100%'}>{determineSeniority()}</Text>
      <HStack flexBasis={'100%'}>
        <Tooltip
          label={
            <Stack>
              <Text>Dni naliczone w roku bieżącym: {employee.ptoDaysAccruedCurrentYear}</Text>
              <Text>Dni pozostałe z roku ubiegłego: {employee.ptoDaysAccruedLastYear} </Text>
              <Text></Text>
              <Text>Dni wykorzystane: {employee.ptoDaysTaken}</Text>
            </Stack>
          }
        >
          <Text cursor={'help'} >
            {employee.ptoDaysLeftTotal}
          </Text>
        </Tooltip>
        {employee.ptoDaysLeftFromLastYear > 0 && (
          <DaysLeftFromLasyYear daysleft={employee.ptoDaysLeftFromLastYear} />
        )}
      </HStack>
      <Box flexBasis={'50%'}>
        {!employee.registrationFinished && <UnfinishedRegistrationBadge />}
        {employee.active && <Activebadge />}
        {employee.registrationFinished && !employee.active && <InactiveBadge />}
      </Box>
    </HStack>
  );
};
