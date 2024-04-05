import { VStack, HStack, Heading, Box, Text } from '@chakra-ui/react';
import { FaSuitcase } from 'react-icons/fa';
import { PtoRequestFormatted } from '../../model/Pto';

interface Props {
  ptosToAccept: PtoRequestFormatted[] | undefined;
  isPtoFetching: boolean;
}

export const EmployeesTimeOffTab = ({ptosToAccept, isPtoFetching}: Props) => {
    console.log(ptosToAccept)
  return (
    <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
      <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
        <HStack w={'80%'} justifyContent={'space-around'}>
          <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
            <FaSuitcase size={'3rem'} color='#F27CA2' />
            <Heading>Urlopy</Heading>
            <Text>Urlopy pracowników</Text>
          </VStack>
          <Box w={'40%'}></Box>
        </HStack>

        <VStack w={'100%'} minH={'200px'} p={2} border={'1px solid lightgrey'} borderRadius={'20px'}>
            <Text w={'90%'} textAlign={'start'} as={'b'}>Wnioski urlopowe</Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
