import { MdOutlineWorkHistory } from 'react-icons/md';
import { Employee } from '../../model/User';
import { Box, Text, HStack, VStack } from '@chakra-ui/react';

interface Props {
  employee: Employee;
}

export const EmployeeHistory = ({ employee }: Props) => {
  return (
    <VStack w={'100%'}>
      <VStack alignItems={'start'} w={'100%'}>
        <MdOutlineWorkHistory size={'50px'} color='#F27CA2' />
        <Text as={'b'} fontSize={'1.3rem'}>
          Historia stanowisk
        </Text>
      </VStack>
      <VStack w={'100%'}>
        {employee.positionHistory.length === 0 && <Box>Brak historii</Box>}
        {employee.positionHistory.length > 0 &&
          employee.positionHistory.map((position, index) => (
            <HStack key={index} w={'100%'} justifyContent={'start'} alignItems={'start'}>
              <Box>
                {new Date(position.startDate).toLocaleString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Box>
              <Box>{position.position.displayName}</Box>
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};
