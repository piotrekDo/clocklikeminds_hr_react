import { Box, GridItem, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { PtoRequestFormatted } from '../../../model/Pto';
import { SupervisorCallendarCell } from './SupervisorCallendarCell';
import { SupervisorCallendarDisplayTimeOff } from './SupervisorCallendarDisplayTimeOff';

interface Props {
  selectedDate: Date;
  holidays: Map<string, string>;
  isPtosFetching: boolean;
}

export const MonthView = ({ selectedDate, holidays, isPtosFetching }: Props) => {
  const queryClient = useQueryClient();
  let ptos = queryClient.getQueryData<PtoRequestFormatted[]>(['ptosForSupervisorCalendar']);

  const firstDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const firstRowLength = firstDayOfSelectedMonth.getDay() === 0 ? 6 : firstDayOfSelectedMonth.getDay() - 1;
  const lastRowLength = lastDayOfSelectedMonth.getDay() === 0 ? 0 : 7 - lastDayOfSelectedMonth.getDay();
  const calendarStartingDay = new Date(
    firstDayOfSelectedMonth.getFullYear(),
    firstDayOfSelectedMonth.getMonth(),
    1 - firstRowLength
  );

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  for (let i = 0; i < firstRowLength + lastRowLength + lastDayOfSelectedMonth.getDate(); i++) {
    const day = new Date(
      calendarStartingDay.getFullYear(),
      calendarStartingDay.getMonth(),
      calendarStartingDay.getDate() + i
    );
    currentWeek.push(day);
    if (day.getDay() === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const [highlightedPto, setHighlightedPto] = useState(-1);

  return (
    <VStack
      w={'100%'}
      h={'100%'}
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
          <Box key={weekIndex} position={'relative'} w={'100%'} h={'100%'}>
            <SimpleGrid w={'100%'} columns={7} pt={'30px'} spacing={0}>
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
                  return <SupervisorCallendarCell key={dayIndex} day={day} isSunday={isSunday} isHoliday={isHoliday} />;
                })}
              </HStack>
            </SimpleGrid>
          </Box>
        );
      })}
    </VStack>
  );
};
