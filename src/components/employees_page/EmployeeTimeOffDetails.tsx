import React from 'react';
import { Employee } from '../../model/User';
import { HStack, VStack, Text, FormControl, FormLabel, Checkbox, Box, Tooltip } from '@chakra-ui/react';
import { LuPalmtree } from 'react-icons/lu';

interface Props {
  employee: Employee;
}

export const EmployeeTimeOffDetails = ({ employee }: Props) => {
  return (
    <VStack>
      <HStack w={'100%'} maxW={'1000px'} margin={'0 auto'} justifyContent={'center'} alignItems={'start'}>
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <VStack alignItems={'start'}>
            <HStack w={'50px'} pos={'relative'} bg={'white'}>
              <LuPalmtree size={'50px'} color='#F27CA2' />
            </HStack>
            <Text as={'b'} fontSize={'1.3rem'}>
              Informacje o urlopie
            </Text>
          </VStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} border={'2px solid lightgray'} borderRadius={'10px'} p={5} mt={'20px'}>
        <VStack flexBasis={'100%'}>
          <HStack w={'100%'}>
            <Text flexBasis={'100%'} as={'b'}>
              Dni naliczone:
            </Text>
            <Text flexBasis={'50%'}>{employee.ptoDaysAccruedCurrentYear}</Text>
          </HStack>
          <Tooltip label='Dni niewykorzystane w ubiegłym roku, dodane do puli urlopów w roku bieżącym. Wykorzystywane w pierwszej kolejności.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'}>
                W tym z ubiegłego roku:
              </Text>
              <Text flexBasis={'50%'}>{employee.ptoDaysAccruedLastYear}</Text>
            </HStack>
          </Tooltip>
        </VStack>
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <Tooltip label='Suma dni wykorzystanych w bieżacym roku. Wliczono wykorzystane dni pozostałe z roku ubiegłego.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'}>
                Dni wykorzystane:
              </Text>
              <Text flexBasis={'50%'}>{employee.ptoDaysTaken}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label='Niewykorzystane dni, pozostałe z ubiegłego roku i zalegające do wykorzystania. Naliczne w pierwszej kolejności. Wliczone do dni wykorzystanych.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'}>
                Pozostałe z ubiegłego roku:
              </Text>
              <Text flexBasis={'50%'}>{employee.ptoDaysLeftFromLastYear}</Text>
            </HStack>
          </Tooltip>
        </VStack>
      </HStack>
    </VStack>
  );
};
