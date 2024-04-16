import React from 'react';
import { EmployeePosition } from '../../../model/User';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';

interface Props {
  positions: EmployeePosition[];
}

export const PositionsTable = ({ positions }: Props) => {
  return (
    <VStack w={'80%'} maxW={'1200px'} h={'100%'} maxH={'55vh'}>
      <VStack w={'100%'} bg={'#F4F4F4'} p={3}>
        <HStack w={'100%'} gap={0}>
          <Box flexBasis={'50%'} as='b'></Box>
          <Text flexBasis={'100%'} as='b'>
            Klucz
          </Text>
          <Text flexBasis={'100%'} as='b'>
            Nazwa
          </Text>
        </HStack>
      </VStack>
      <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
        {positions &&
          positions.map(position => (
            <HStack
              key={position.positionKey}
              w={'100%'}
              borderRadius={'30px'}
              py={1}
              px={3}
              cursor={'pointer'}
              _hover={{ bg: '#E3EDF2' }}
              flexShrink={0}
            >
              <Text flexBasis={'100%'}>{position.positionKey}</Text>
              <Text flexBasis={'100%'}>{position.displayName}</Text>
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};
