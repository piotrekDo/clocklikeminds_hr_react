import { FormControl, FormLabel, HStack, Text, VStack, Box } from '@chakra-ui/react';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { Employee } from '../../../model/User';

interface Props {
  employee: Employee;
}

export const EmployeeGeneralInformation = ({ employee }: Props) => {
  return (
    <HStack
      bg={'#385898'}
      w={'100%'}
      justifyContent={'center'}
      alignItems={'start'}
      p={3}
      borderRadius={'20px'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      color={'whiteAlpha.800'}
    >
      <VStack flexBasis={'100%'} alignItems={'start'}>
        <VStack alignItems={'start'}>
          <HStack w={'50px'} pos={'relative'}>
            <MdOutlinePersonOutline size={'50px'} />
          </HStack>
          <Text as={'em'} fontWeight={'700'} fontSize={'1.3rem'}>
            Podstawowe informacje
          </Text>
        </VStack>
        {employee?.imageUrl && (
          <Box
            w={'100px'}
            h={'100px'}
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
      </VStack>
      <VStack flexBasis={'100%'} alignItems={'end'}>
        <VStack w={'100%'} p={5} maxW={'400px'}>
          <FormControl>
            <FormLabel>Imię</FormLabel>
            <Text border={'2px solid lightgray'} borderRadius={'5px'} p={1} fontStyle={'italic'}>
              {employee.firstName}
            </Text>
          </FormControl>
          <FormControl>
            <FormLabel>Nazwisko</FormLabel>
            <Text border={'2px solid lightgray'} borderRadius={'5px'} p={1} fontStyle={'italic'}>
              {employee.lastName}
            </Text>
          </FormControl>
        </VStack>
      </VStack>
    </HStack>
  );
};
