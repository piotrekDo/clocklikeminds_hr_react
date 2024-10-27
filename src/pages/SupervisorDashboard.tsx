import { Box, Heading, HStack, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getHolidaysPoland } from '../components/Calendar/holidays';
import { SupervisorCallendarCell } from '../components/supervisor/time_off_calendar/SupervisorCallendarCell';
import { SupervisorCallendarDisplayTimeOff } from '../components/supervisor/time_off_calendar/SupervisorCallendarDisplayTimeOff';
import useSupervisorDashboardCalculations from '../components/supervisor_dashboard/useSupervisorDashboardCalculations';
import usePtosRequestsForSupervisorCalendar from '../hooks/usePtosForSupervisorCalendar';
import { PtoRequestFormatted } from '../model/Pto';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';

export const SupervisorDashboard = () => {
  const theme = useThemeState(s => s.themeConfig);
  const user = useAuthentication(s => s.appUser);
  const [highlightedPto, setHighlightedPto] = useState(-1);
  const { today, currWeekMonday, weeks } = useSupervisorDashboardCalculations();
  const holidays = useMemo(() => getHolidaysPoland(today.getFullYear()), [today.getFullYear()]);
  const {
    isFetching: isPtosFetching,
    isError: isPtosFetchingError,
    error: ptosFetchingError,
    refetch: refetchPtos,
  } = usePtosRequestsForSupervisorCalendar(
    user?.userId || -1,
    new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate())
      .toISOString()
      .slice(0, 10),
    new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate() + 27)
      .toISOString()
      .slice(0, 10),
    ['dashboard']
  );
  const queryClient = useQueryClient();
  let ptos = queryClient.getQueryData<PtoRequestFormatted[]>(['dashboard']);

  useEffect(() => {
    refetchPtos;
  });

  return (
    <VStack w={'100%'} h={'100%'} justify={'center'} align={'center'} p={10} justifyContent={'start'}>
      <HStack spacing={20} w={'100%'} color={theme.fontColor}>
        <Heading>{today.toLocaleString('pl-pl', { dateStyle: 'full' })}</Heading>
        {isPtosFetching && (
          <HStack>
            <Text>odświeżam</Text>
            <Spinner />
          </HStack>
        )}
      </HStack>

      <VStack
        w={'100%'}
        borderRadius={'20px'}
        spacing={0}
        boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
        p={2}
        bg={'whiteAlpha.400'}
        position={'relative'}
      >
        {weeks.map((week, weekIndex) => {
          const monday = week[0];
          const sunday = week[6];
          return (
            <Box key={weekIndex} position={'relative'} w={'100%'} minH={'100px'}>
              <SimpleGrid w={'100%'} columns={7} pt={'30px'} spacing={0} >
                {ptos &&
                  ptos.map((pto, index) => {
                    if (pto.ptoStart > sunday || pto.ptoEnd < monday) return;
                    return (
                      <SupervisorCallendarDisplayTimeOff
                        key={index}
                        pto={pto}
                        monday={monday}
                        sunday={sunday}
                        highlightedPto={highlightedPto}
                        setHighlightedPto={setHighlightedPto}
                      />
                    );
                  })}

               

                <HStack position={'absolute'} spacing={0} top={0} left={0} w={'100%'} h={'100%'}>
                  {week.map((day, dayIndex) => {
                    const isSunday = day.getDay() === 0;
                    const isHoliday: string | undefined = holidays.get(`${day.getMonth()},${day.getDate()}`);
                    return (
                      <SupervisorCallendarCell key={dayIndex} day={day} isSunday={isSunday} isHoliday={isHoliday} />
                    );
                  })}
                </HStack>
              </SimpleGrid>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};
