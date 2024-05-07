import React from 'react';
import { EmployeePosition } from '../../../model/User';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';

interface Props {
  positions: EmployeePosition[];
}

export const PositionsTable = ({ positions }: Props) => {
  return (
    <VStack w={'80%'} maxW={'1200px'} h={'100%'} maxH={'55vh'}>
      <VStack w={'100%'} p={3} boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'} borderRadius={'20px 20px 0 0'} bg={'#385898'} color={'whiteAlpha.900'}>
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
      <VStack
        w={'100%'}
        h={'100%'}
        color={'blackAlpha.900'}
        fontWeight={'500'}
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
      >
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
