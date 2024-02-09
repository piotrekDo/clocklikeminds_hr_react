import { HStack, Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const EmployeeTableHeader = () => {
  return (
    <VStack w={'100%'}>
        <HStack w={'100%'}>
            <Box w={'100%'}> FILTRY SZUKAJKI TODO</Box>
        </HStack>
      <HStack w={'100%'} gap={0}>
        <Box flexBasis={'50%'} as='b'></Box>
        <Text flexBasis={'100%'} as='b'>Imię</Text>
        <Text flexBasis={'100%'} as='b'>Nazwisko</Text>
        <Text flexBasis={'100%'} as='b'>Stanowisko</Text>
        <Text flexBasis={'100%'} as='b'>Staż</Text>
        <Text flexBasis={'50%'} as='b'>Status</Text>
      </HStack>
    </VStack>
  );
};
