import { HStack, VStack, Text, FormControl, FormLabel, Input, Checkbox, Box } from '@chakra-ui/react';
import { Employee } from '../../model/User';
import { BsSuitcaseLg } from 'react-icons/bs';

interface Props {
  employee: Employee;
}

export const EmployeeContractinformation = ({ employee }: Props) => {
  const determineSeniority = () => {
    const years = Math.ceil(employee.seniorityInMonths / 12);
    const months = (employee.seniorityInMonths - years * 12) % 12;

    if (years > 0) {
      return `${years} lat, ${months} miesięcy`;
    } else {
      return `${months} miesięcy`;
    }
  };

  return (
    <VStack>
      <HStack w={'100%'} maxW={'1000px'} margin={'0 auto'} justifyContent={'center'} alignItems={'start'}>
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <VStack alignItems={'start'}>
            <BsSuitcaseLg size={'50px'} color='#F27CA2' />
            <Text as={'b'} fontSize={'1.3rem'}>
              Informacje o zatrudnieniu
            </Text>
          </VStack>
        </VStack>
        <VStack flexBasis={'100%'}>
        <VStack w={'100%'} p={5} bg={'#F4F4F4'} maxW={'400px'}>
            <FormControl>
              <FormLabel>Stanowisko</FormLabel>
              <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                {(employee.position && employee.position.displayName) || 'Uzupełnij dane'}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Adres e-mail</FormLabel>
              <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                {employee.userEmail}
              </Text>
            </FormControl>
            <FormControl>
              <Checkbox isChecked={employee.stillHired}>Nadal zatrudniony</Checkbox>
            </FormControl>
          </VStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} border={'2px solid lightgray'} borderRadius={'10px'} p={5} mt={'20px'}>
        <VStack flexBasis={'100%'}>
          <Box as='b'>Data rozpoczęcia pracy</Box>
          <Box flexBasis={'100%'}>
            {(employee.hireStart &&
              new Date(employee.hireStart).toLocaleString('pl-PL', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })) ||
              'Uzupełnij dane'}
          </Box>
        </VStack>
        <VStack flexBasis={'100%'}>
          <Box flexBasis={'100%'} as='b'>
            Data wygaśnięcia umowy:{' '}
          </Box>
          <Box flexBasis={'100%'}>
            {employee.hireStart &&
              employee.hireEnd &&
              new Date(employee.hireEnd).toLocaleString('pl-PL', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            {employee.hireStart && !employee.hireEnd && 'Umowa na czas nieokreślony'}
            {!employee.hireStart && !employee.hireEnd && 'Uzupełnij dane'}
          </Box>
        </VStack>
        <VStack flexBasis={'100%'}>
          <Box as='b'>Staż</Box>
          <Box>{determineSeniority()}</Box>
        </VStack>
      </HStack>
    </VStack>
  );
};
