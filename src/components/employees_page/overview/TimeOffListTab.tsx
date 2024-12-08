import { Badge, Box, Flex, HStack, Heading, Select, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useHolidaysOnSaturdaySummaryForAdmin from '../../../hooks/useHolidaysOnSaturdaySummaryForAdmin';
import useHttpErrorState from '../../../state/useHttpErrorState';
import { CustomHolidayOnSaturday } from './CustomHolidayOnSaturday';
import { UpcomingSaturdayHoliday } from './UpcomingSaturdayHoliday';
import useThemeState from '../../../state/useThemeState';
import useHolidayOnSaturdayByUsers from '../../../hooks/useHolidayOnSaturdayByUsers';
import useAuthentication from '../../../state/useAuthentication';
import { NavSelectedYear } from '../../supervisor/time_off_calendar/NavSelectedYear';

export const TimeOffListTab = () => {
  const theme = useThemeState(s => s.themeConfig);
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());
  const [holidayOnSaturdaySelected, setHolidayOnSaturDaySelected] = useState<number>(-1);
  const {
    data: holidaysByUsers,
    isFetching: isholidaysByUsersFetching,
    isError: isHolidaysByUsersError,
    error: holidaysByUsersError,
    refetch: refetchHolidaysByUsers,
  } = useHolidayOnSaturdayByUsers(holidayOnSaturdaySelected, 0); // 0 for all users- admn option to fetch all, regardless supervisor id.
  const { data, isFetching, error, isError, isLoading } = useHolidaysOnSaturdaySummaryForAdmin(
    selectedYear.getFullYear()
  );
  const setError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    if (isError) {
      setError(error);
    }
    if (isHolidaysByUsersError) {
      setError(holidaysByUsersError);
    }
  }, [isError, isHolidaysByUsersError]);

  useEffect(() => {
    console.log(holidaysByUsers);
  }, [holidaysByUsers]);

  return (
    <VStack w={'100%'} h={'100%'}>
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
                color={theme.fontColor}
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
          <HStack w={'100%'} justify={'start'}>
            <Select
              w={'100%'}
              maxW={'600px'}
              onChange={e => setHolidayOnSaturDaySelected(+e.target.value)}
              placeholder='Wybierz święto'
              sx={{
                '> option': {
                  background: theme.elementBg,
                  color: theme.fontColor,
                },
              }}
            >
              {data.currentYearHolidaysOnSaturday?.map(h => (
                <option
                  key={h.id}
                  value={h.id}
                  style={{
                    backgroundColor: theme.elementBg,
                  }}
                >
                  {h.note} {h.date}
                </option>
              ))}
            </Select>
            <Box ml={10}>
              <NavSelectedYear selectedDate={selectedYear} setSelectedDate={setSelectedYear} />
            </Box>
          </HStack>
        </VStack>
      )}
      {holidaysByUsers && (
        <VStack w={'100%'} align={'start'} >
          <Text fontSize={'1.2rem'} fontWeight={700} as={'em'} mt={2} mb={5} w={'100%'} textAlign={'start'}>
            {holidaysByUsers[0].holiday.date} {holidaysByUsers[0].holiday.note}
          </Text>
          {holidaysByUsers.map(u => (
            <HStack key={u.employee.appUserId} w={'100%'} maxW={'1200px'} p={1} justify={'start'} >
              <HStack borderRadius={'20px'} px={2} py={1} flexBasis={'30%'}>
                <Text>{u.employee.firstName}</Text>
                <Text>{u.employee.lastName}</Text>
              </HStack>
              <Badge
                variant={'subtle'}
                flexBasis={'15%'}
                textAlign={'center'}
                p={1}
                colorScheme={!u.pto ? 'red' : u.pto.wasAccepted ? 'green' : 'yellow'}
              >
                {!u.pto && 'Brak wniosku'}
                {u.pto && u.pto.wasAccepted && 'Wykorzystany'}
                {u.pto && !u.pto.wasAccepted && 'Oczekuje'}
              </Badge>
              {u.pto && (
                <Badge variant={'subtle'} flexBasis={'15%'} textAlign={'center'} p={1} colorScheme='teal'>
                  {u.pto.ptoStart.toLocaleDateString('pl-PL')} ID wniosku: {u.pto.id}
                </Badge>
              )}
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
};
