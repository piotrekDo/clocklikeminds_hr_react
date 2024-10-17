import { Box, Flex, HStack, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import useHolidaysOnSaturdaySummaryForAdmin from '../../../hooks/useHolidaysOnSaturdaySummaryForAdmin';
import useHttpErrorState from '../../../state/useHttpErrorState';
import { CustomHolidayOnSaturday } from './CustomHolidayOnSaturday';
import { HolidaysOnSaturdayByUsers } from './HolidaysOnSaturdayByUsers';
import { UpcomingSaturdayHoliday } from './UpcomingSaturdayHoliday';

export const TimeOffListTab = () => {
  const { data, isFetching, error, isError, isLoading } = useHolidaysOnSaturdaySummaryForAdmin();
  const setError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    if (isError) {
      setError(error);
    }
  }, [isError]);

  return (
    <VStack w={'100%'} h={'100%'} >
      <HStack w={'100%'} mb={5}>
        <Heading textAlign={'left'}>Dni świąteczne w sobotę</Heading>
        {isFetching && !isLoading && (
          <HStack>
            <Text>odświeżam...</Text>
            <Spinner size={'sm'} />
          </HStack>
        )}
      </HStack>
      {isLoading && (
        <Flex w={'100%'} h={'50%'} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!isLoading && data && (
        <VStack w={'100%'}>
          <HStack w={'100%'} justifyContent={'space-around'} mb={10}>
            <VStack>
              <Text
                w={'100%'}
                color={'blackAlpha.800'}
                as={'i'}
                fontSize={'1.2rem'}
                fontWeight={'600'}
                textShadow={'0px 0px 0px #385898'}
              >
                Nadchodzące święto
              </Text>
              <UpcomingSaturdayHoliday holiday={data.nextHolidayOnSaturday} inDays={data.nextHolidayOnSaturdayInDays} />
            </VStack>
            <CustomHolidayOnSaturday />
          </HStack>
          {!data.currentYearHolidaysOnSaturday && <Box>Brak dni urlopowych za świąto wypadające w sobotę</Box>}
          {data.currentYearHolidaysOnSaturday && (
            <HolidaysOnSaturdayByUsers records={data.currentYearHolidaysOnSaturday} />
          )}
        </VStack>
      )}
    </VStack>
  );
};
