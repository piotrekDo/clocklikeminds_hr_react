import { VStack, HStack, Text, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavSelectedYear } from '../../supervisor/time_off_calendar/NavSelectedYear';
import useAllUserRequestsPerYear from '../../../hooks/useAllUserRequestsPerYear';
import { useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../../../model/Pto';
import { TimeOffRequestCard } from './TimeOffRequestCard';

interface Props {
  selectedUser: number;
}

export const EmployeeTimeOffRequests = ({ selectedUser }: Props) => {
  const [selectedYear, setSeletedYear] = useState<Date>(new Date());

  const {
    data: requests,
    error,
    isError,
    isFetching,
    refetch,
  } = useAllUserRequestsPerYear(selectedUser, selectedYear.getFullYear());

  const queryClient = useQueryClient();
  let requestsCached = queryClient.getQueryData<PtoRequestFormatted[]>([
    'allPtoReqYear',
    selectedUser,
    selectedYear.getFullYear(),
  ]);

  useEffect(() => {
    refetch();
  }, [selectedYear]);


  return (
    <VStack maxW={'1000px'} margin={'0 auto'} position={'relative'} gap={'50px'} color={'whiteAlpha.900'}>
      <HStack mt={10} position={'relative'} w={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'1.2rem'} fontWeight={'700'}>
          Wnioski na rok
        </Text>
        <NavSelectedYear selectedDate={selectedYear} setSelectedDate={setSeletedYear} />
        {isFetching && (
          <HStack pos={'absolute'} right={20}>
            <Spinner />
            <Text>odświeżam</Text>
          </HStack>
        )}
      </HStack>

      <VStack mt={10} w={'100%'}>
        {!requestsCached ||
          (requestsCached && requestsCached.length === 0 && (
            <Text fontSize={'1.5rem'} fontWeight={700} fontStyle={'italic'}>
              Brak wniosków na {selectedYear.getFullYear()} rok
            </Text>
          ))}
        {requestsCached && requestsCached.map(r => <TimeOffRequestCard key={r.id} timeOff={r} />)}
      </VStack>
    </VStack>
  );
};
