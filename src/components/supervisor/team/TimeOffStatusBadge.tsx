import React from 'react';
import { EmployeeInfo } from '../../../model/User';
import { Box, Text, HStack } from '@chakra-ui/react';

interface Props {
  employee: EmployeeInfo;
}

export const TimeOffStatusBadge = ({ employee }: Props) => {
  const isOnTimeOffOrUpcoming = employee.onTimeOff || employee.incomingTimeOff;
  return (
    <>
      {!isOnTimeOffOrUpcoming && (
        <HStack
          w={'100%'}
          bg={''}
          h={'30px'}
          px={'10px'}
          pb={'10px'}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Box
            w={'15px'}
            h={'15px'}
            borderRadius={'50%'}
            bg={'#0de71f'}
            boxShadow={'8px 8px 20px 2px rgba(66, 68, 90, 1)'}
          ></Box>
          <Text
            bg={'linear-gradient(132deg, rgba(150,242,129,1) 26%, rgba(13,231,31,1) 67%)'}
            bgClip={'text'}
            fontWeight={'600'}
            fontSize={'1.2rem'}
          >
            Obecny
          </Text>
        </HStack>
      )}
      {employee.onTimeOff && (
        <HStack
          w={'100%'}
          bg={''}
          h={'30px'}
          px={'10px'}
          pb={'10px'}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Box
            w={'15px'}
            h={'15px'}
            borderRadius={'50%'}
            bg={'#E3FF00'}
            boxShadow={'8px 8px 20px 2px rgba(66, 68, 90, 1)'}
          ></Box>
          <Text
            bg={'linear-gradient(132deg, rgba(255,245,132,1) 23%, rgba(231,196,13,1) 73%)'}
            bgClip={'text'}
            fontWeight={'600'}
            fontSize={'1.2rem'}
          >
            W trakcie urlopu
          </Text>
        </HStack>
      )}
      {!employee.onTimeOff && employee.incomingTimeOff && (
        <HStack
          w={'100%'}
          bg={''}
          h={'30px'}
          px={'10px'}
          pb={'10px'}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Box
            w={'15px'}
            h={'15px'}
            borderRadius={'50%'}
            bg={'#fff584'}
            boxShadow={'8px 8px 20px 2px rgba(66, 68, 90, 1)'}
          ></Box>
          <Text
            bg={'linear-gradient(132deg, rgba(255,245,132,1) 23%, rgba(13,231,214,1) 73%)'}
            bgClip={'text'}
            fontWeight={'600'}
            fontSize={'1.2rem'}
          >
            Wkrótce na urlopie
          </Text>
        </HStack>
      )}
    </>
  );
};
