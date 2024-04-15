import { Box, HStack, Text, VStack } from '@chakra-ui/react';

export const EmployeeTableHeader = () => {
  return (
    <VStack w={'100%'} bg={'#F4F4F4'} p={3}>
      <HStack w={'100%'} gap={0}>
        <Box flexBasis={'50%'} as='b'></Box>
        <Text flexBasis={'100%'} as='b'>
          Imię
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Nazwisko
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Stanowisko
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Staż
        </Text>
        <Text flexBasis={'50%'} as='b'>
          Status
        </Text>
      </HStack>
    </VStack>
  );
};
