import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { PtoRequestFormatted } from '../../model/Pto';
import usePtoRequestState from '../../state/usePtoRequestState';

interface Props {
  month: Date;
  holidays: Map<string, string>;
  daysOff: PtoRequestFormatted[];
}

export const CalendarMonth = ({ month, holidays, daysOff }: Props) => {
  const newPtoStartDate = usePtoRequestState(s => s.startDate);
  const newPtoEndDate = usePtoRequestState(s => s.endDate);
  const startingDayOfWeek = month.getDay();
  const leftPadding = startingDayOfWeek === 0 ? 6 : startingDayOfWeek === 1 ? 0 : startingDayOfWeek - 1;
  const days = new Date(Date.UTC(month.getFullYear(), month.getMonth() + 1, 0)).getDate();
  const currentMonthDays: Date[] = Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.UTC(month.getFullYear(), month.getMonth(), index + 1));
    return date;
  });

  return (
    <GridItem
      w={'100%'}
      p={1}
      borderRadius={'10px'}
      display={'flex'}
      flexDirection={'column'}
      _hover={{ transform: 'scale(1.05)' }}
      transition={'transform .1s ease-in'}
    >
      <Text as={'b'} fontSize={{ base: '1rem', monitorM: '1.1rem' }}>
        {month.toLocaleString('pl-PL', { month: 'long' })}
      </Text>
      <Grid templateColumns={'repeat(7, 1fr)'} w={'100%'} rowGap={2} columnGap={0}>
        {Array.from({ length: leftPadding }).map((_, index) => (
          <GridItem key={index} w={'100%'} />
        ))}
        {currentMonthDays.map((day, index) => {
          const todayLocal = new Date();
          const today = new Date(Date.UTC(todayLocal.getFullYear(), todayLocal.getMonth(), todayLocal.getDate()));
          const dayTimestamp = day.getTime();
          const startTimestamp = newPtoStartDate?.getTime();
          const endTimestamp = newPtoEndDate?.getTime();
          const isHoliday: string | undefined = holidays.get(`${day.getMonth()},${day.getDate()}`);
          const isDayOff = daysOff.filter(testedPto => {
            return day.getTime() >= testedPto.ptoStart.getTime() && day.getTime() <= testedPto.ptoEnd.getTime();
          })[0];
          const isToday =
            day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();

          return (
            <GridItem
              key={index}
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              // cursor={isDayOff ? 'pointer' : 'default'}
              bgColor={
                (newPtoStartDate && dayTimestamp === startTimestamp) ||
                (newPtoStartDate && newPtoEndDate && dayTimestamp >= startTimestamp! && dayTimestamp <= endTimestamp!)
                  ? 'green'
                  : isDayOff
                  ? isDayOff.pending
                    ? 'rgba(255, 255, 120, .6)'
                    : 'rgba(20, 255, 120, .6)'
                  : ''
              }
            >
              <Flex
                p={2}
                justifyContent={'center'}
                alignItems={'center'}
                w={'10px'}
                h={'10px'}
                borderRadius={'30%'}
                bgColor={isHoliday ? 'red.300' : day.getDay() === 0 ? 'red.200' : ''}
                fontSize={{ base: '.8rem', monitorM: '.9rem', '4K': '.9rem' }}
                title={isHoliday}
                outline={isToday ? 'solid' : ''}
              >
                <Text>{day.getDate()}</Text>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </GridItem>
  );
};
