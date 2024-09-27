import { Box, Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import useCalendarCalculations from './useCalendarCalculations';
import { SelectedWeek } from './Calendar';
import { useEffect } from 'react';

interface Props {
  selectedDate: Date;
  selectedWeek: SelectedWeek;
  setSelectedWeek: React.Dispatch<React.SetStateAction<SelectedWeek>>;
}

export const MonthPreview = ({ selectedDate, selectedWeek, setSelectedWeek }: Props) => {
  const { firstRowLength, lastDayOfPreviousMonth, lastDayOfSelectedMonth, lastRowLength } =
    useCalendarCalculations(selectedDate);

  const previousMonthDays = Array.from({ length: firstRowLength }).map(
    (_, index) => lastDayOfPreviousMonth - firstRowLength + index + 1
  );

  const currentMonthDays = Array.from({ length: lastDayOfSelectedMonth.getDate() }).map((_, index) => index + 1);
  const nextMonthDays = Array.from({ length: lastRowLength }).map((_, index) => index + 1);
  const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  const weeks: number[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  useEffect(() => {
    if (selectedWeek.index < 0) {
      setSelectedWeek({
        index: 0,
        days: weeks[0],
      });
    }
  }, [selectedWeek.index]);

  return (
    <VStack w={'100%'} borderRadius={'20px'} spacing={0} boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}>
      <Text as={'b'} fontSize={'1.1rem'} color={'blackAlpha.900'} w={'100%'} textAlign={'start'} pl={3}>
        {selectedDate.toLocaleString('pl-PL', { month: 'long', year: '2-digit' })}
      </Text>
      <VStack w={'100%'} fontSize={'.8rem'} p={2} color={'blackAlpha.900'} rowGap={2} columnGap={0}>
        {weeks.map((week, index) => (
          <HStack
            key={index}
            w={'100%'}
            cursor={'pointer'}
            px={1}
            bg={selectedWeek.index === index ? '#385898' : ''}
            color={selectedWeek.index === index ? 'whiteAlpha.900' : ''}
            _hover={{ bg: '#385898', color: 'whiteAlpha.900' }}
            borderRadius={'10px'}
            onClick={e =>
              setSelectedWeek({
                index: index,
                days: weeks[index],
              })
            }
          >
            {week.map((day, dayIndex) => (
              <Flex key={dayIndex} textAlign={'center'} flexBasis={'100%'} justify={'center'} align={'center'}>
                {day}
              </Flex>
            ))}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
