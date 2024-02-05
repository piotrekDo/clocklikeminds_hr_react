import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const EmployeesPage = () => {
  return (
    <HStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'space-around'}>
        <HStack w={'500px'} h={'100%'} px={'20px'}>
            <VStack w={'100%'} h={'100%'} borderRadius={'30px'} p={5} border={'solid'}>
                <HStack w={'100%'} >
                    <Text w={'100%'} border={'solid'}>Piotr Domagalski</Text>
                </HStack>
            </VStack>
        </HStack>
        <VStack w={'100%'} h={'100%'} border={'solid'}>
                <Text>Piotr Doamgalski</Text>
                <Text>Naliczone dni urlopu</Text>
                <Text>Wykorzystane dni urlopu</Text>
                <Text>pozostałe dni urlopu</Text>
                <Text>stanowisko</Text>
                <Text>pracuje od</Text>
                <Text>pracuje do</Text>
                <Text>wnioski do rozpatrzenia</Text>
        </VStack>
    </HStack>
  );
};
