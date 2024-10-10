import { Box, GridItem, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { PtoRequestFormatted } from '../../../model/Pto';
import { useQueryClient } from '@tanstack/react-query';
import { Calendar } from '../SupervisorCalendat/Calendar';

interface Props {
  selectedDate: Date;
  holidays: Map<string, string>;
  isPtosFetching: boolean
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

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      spacing={0}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      p={2}
      bg={'whiteAlpha.400'}
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
                  const startingThisWeek = pto.ptoStart.getTime() >= monday.getTime();
                  const endingThisWeek = pto.ptoEnd.getTime() <= sunday.getTime();
                  const start = startingThisWeek ? (pto.ptoStart.getDay() === 0 ? 7 : pto.ptoStart.getDay()) : 1;
                  const end = endingThisWeek ? (pto.ptoEnd.getDay() === 0 ? 7 : pto.ptoEnd.getDay()) : 7;
                  return <GridItem key={index} colStart={start} colEnd={end + 1} h={'30px'} zIndex={1000} bg={'red'}></GridItem>;
                })}

              <HStack position={'absolute'} spacing={0} top={0} left={0} w={'100%'} h={'100%'}>
                {week.map((day, dayIndex) => {
                  const isSunday = day.getDay() === 0;
                  const isHoliday: string | undefined = holidays.get(`${day.getMonth()},${day.getDate()}`);
                  return (
                    <HStack key={dayIndex} spacing={0} w={'100%'} align={'start'} h={'100%'} fontWeight={600}>
                      {day.getDate() != 1 && (
                        <Text color={isSunday || isHoliday ? 'red.200' : ''}>{day.getDate()}</Text>
                      )}
                      {day.getDate() === 1 && (
                        <Text color={isSunday || isHoliday ? 'red.200' : ''}>
                          {day.toLocaleString('pl-PL', { day: 'numeric', month: 'short' })}
                        </Text>
                      )}
                      {isHoliday && <Text fontSize={'.6rem'}>{isHoliday}</Text>}
                    </HStack>
                  );
                })}
              </HStack>
            </SimpleGrid>
          </Box>
        );
      })}
    </VStack>
  );
};
