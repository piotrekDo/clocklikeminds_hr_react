import { FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Employee } from '../../model/User';
import { MdOutlinePersonOutline } from 'react-icons/md';

interface Props {
  employee: Employee;
}

export const EmployeeGeneralInformation = ({ employee }: Props) => {
  return (
    <HStack w={'100%'} maxW={'1000px'} margin={'0 auto'} justifyContent={'center'} alignItems={'start'}>
      <VStack flexBasis={'100%'} alignItems={'start'}>
        <VStack alignItems={'start'}>
          <MdOutlinePersonOutline size={'50px'} color='#F27CA2' />
          <Text as={'b'} fontSize={'1.3rem'}>
            Podstawowe informacje
          </Text>
        </VStack>
      </VStack>
      <VStack flexBasis={'100%'}>
        <VStack w={'100%'} p={5} bg={'#F4F4F4'} maxW={'400px'}>
          <FormControl>
            <FormLabel>Imię</FormLabel>
            <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
              {employee.firstName}
            </Text>
          </FormControl>
          <FormControl>
            <FormLabel>Nazwisko</FormLabel>
            <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
              {employee.lastName}
            </Text>
          </FormControl>
        </VStack>
      </VStack>
    </HStack>
  );
};
