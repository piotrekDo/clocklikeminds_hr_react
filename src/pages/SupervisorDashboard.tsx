import { Box, Heading, HStack, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getHolidaysPoland } from '../components/Calendar/holidays';
import { SupervisorCallendarCell } from '../components/supervisor/time_off_calendar/SupervisorCallendarCell';
import { SupervisorCallendarDisplayTimeOff } from '../components/supervisor/time_off_calendar/SupervisorCallendarDisplayTimeOff';
import { NewRequestsTile } from '../components/supervisor_dashboard/NewRequestsTile';
import useSupervisorDashboardCalculations from '../components/supervisor_dashboard/useSupervisorDashboardCalculations';
import useSupervisorDashboard from '../hooks/useSupervisorDashboard';
import { SupervisorDashboardFormatted } from '../model/Dashboard';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import useThemeState from '../state/useThemeState';
import { NewEmployeesTile } from '../components/supervisor_dashboard/NewEmployeesTile';
import { SuspendedAccountsTile } from '../components/supervisor_dashboard/SuspendedAccountsTile';

export const SupervisorDashboard = () => {
  const theme = useThemeState(s => s.themeConfig);
  const user = useAuthentication(s => s.appUser);
  const isAdmin = useAuthentication(s => s.isAdmin);
  const setError = useHttpErrorState(s => s.setError);
  const [highlightedPto, setHighlightedPto] = useState(-1);
  const { today, currWeekMonday, weeks } = useSupervisorDashboardCalculations();
  const holidays = useMemo(() => getHolidaysPoland(today.getFullYear()), [today.getFullYear()]);

  const {
    isFetching: isDashboardFetching,
    isError: isDashboardError,
    error: dashboardError,
    refetch: refetchDashboardData,
  } = useSupervisorDashboard(
    user?.userId || -1,
    new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate())
      .toISOString()
      .slice(0, 10),
    new Date(currWeekMonday.getFullYear(), currWeekMonday.getMonth(), currWeekMonday.getDate() + 27)
      .toISOString()
      .slice(0, 10)
  );

  const queryClient = useQueryClient();
  let dashboard = queryClient.getQueryData<SupervisorDashboardFormatted>(['supervisorDashboard', user?.userId]);

  useEffect(() => {
    isDashboardError && setError(dashboardError);
  }, [isDashboardError]);

  // useEffect(() => {
  //   refetchDashboardData;
  // });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '99%',
          height: '99%',
        }}
      >
        <VStack w={'100%'} h={'100%'} justify={'center'} align={'center'} p={10} justifyContent={'start'}>
          <HStack spacing={20} w={'100%'} color={theme.fontColor}>
            <Heading>{today.toLocaleString('pl-pl', { dateStyle: 'full' })}</Heading>
            {isDashboardFetching && (
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
                  <SimpleGrid w={'100%'} columns={7} pt={'30px'} spacing={0}>
                    {dashboard?.requestsForDashboardCalendar &&
                      dashboard?.requestsForDashboardCalendar.map((pto, index) => {
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
                          <SupervisorCallendarCell key={dayIndex} isToday={false} day={day} isSunday={isSunday} isHoliday={isHoliday} />
                        );
                      })}
                    </HStack>
                  </SimpleGrid>
                </Box>
              );
            })}
          </VStack>
          <HStack mt={5} w={'100%'} spacing={5}>
            <NewRequestsTile
              unresolvedRequestsCount={dashboard?.unresolvedRequestsCount || 0}
              requestToWithdraw={dashboard?.requestToWithdraw || 0}
            />
            {dashboard && dashboard.newEmployees > -0 && (
              <NewEmployeesTile newEmployees={dashboard.newEmployees}/>
            )}
            {dashboard && dashboard.inactiveEmployees > -0 && (
              <SuspendedAccountsTile accountsSuspended={dashboard.inactiveEmployees}/>
            )}
          </HStack>
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
