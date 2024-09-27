import { SimpleGrid } from '@chakra-ui/react';
import { AdjacentMonthCalendarCell } from './AdjacentMonthCalendarCell';
import { CalendarCell } from './CalendarCell';
import useCalendarCalculations from './useCalendarCalculations';

interface Props {
  selectedDate: Date;
}

export const MonthView = ({ selectedDate }: Props) => {
  const { firstRowLength, lastDayOfPreviousMonth, lastDayOfSelectedMonth, lastRowLength } =
    useCalendarCalculations(selectedDate);
  return (
    <SimpleGrid columns={7} w={'100%'} h={'100%'} borderRadius={'20px'} overflow={'hidden'}>
      {Array.from({ length: firstRowLength }).map((_, index) => (
        <AdjacentMonthCalendarCell
          key={index}
          selectedDate={selectedDate}
          day={
            new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() - 1,
              lastDayOfPreviousMonth - firstRowLength + index + 1
            )
          }
        ></AdjacentMonthCalendarCell>
      ))}
      {Array.from({ length: lastDayOfSelectedMonth.getDate() }).map((_, index) => (
        <CalendarCell
          key={index}
          selectedDate={selectedDate}
          day={new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + index)}
        ></CalendarCell>
      ))}
      {Array.from({ length: lastRowLength }).map((_, index) => (
        <AdjacentMonthCalendarCell
          key={index}
          selectedDate={selectedDate}
          day={new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1 + index)}
        ></AdjacentMonthCalendarCell>
      ))}
    </SimpleGrid>
  );
};
