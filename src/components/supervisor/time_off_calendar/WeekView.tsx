import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';

export const WeekView = () => {
  return (
    <SimpleGrid columns={7} w={'100%'} h={'100%'} borderRadius={'20px'} overflow={'hidden'}>
        {Array.from({length: 7}).map((_, index) => (
            <VStack key={index} h={'100%'} >

            </VStack>
        ))}
    </SimpleGrid>
  );
};
