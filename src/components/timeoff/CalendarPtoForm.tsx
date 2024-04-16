import { Box, Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface Props {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}
export const CalendarPtoForm = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  const today = new Date();
  today.setDate(1);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [currentMonthDays, setCurrentMonthDays] = useState<Date[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [dateHovering, setDateHovering] = useState<Date | undefined>(undefined);
  const startingDayOfWeek = selectedMonth.getDay();
  const leftPadding = startingDayOfWeek === 0 ? 6 : startingDayOfWeek === 1 ? 0 : startingDayOfWeek - 1;
  const days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  useLayoutEffect(() => {
    setCurrentMonthDays(
      Array.from(
        { length: days },
        (_, index) => new Date(Date.UTC(selectedMonth.getFullYear(), selectedMonth.getMonth(), index + 1))
      )
    );
  }, [selectedMonth]);

  const onMonthUphandler = () => {
    setSelectedMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const onMonthDownHandler = () => {
    setSelectedMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const handleOnWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const direction = e.deltaY; // - gora , + dol
    if (direction < 0) {
      onMonthUphandler();
    } else {
      onMonthDownHandler();
    }
    e.stopPropagation();
  };

  const onDayClickHandler = (day: Date) => {
    if (!startDate) {
      setStartDate(day);
      setIsSelecting(true);
    } else {
      setEndDate(day);
      setIsSelecting(false);
    }
  };

  return (
    <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} spacing={'10px'} onWheel={handleOnWheel}>
      <HStack my={'20px'}>
        <Box fontSize={'1.5rem'} w={'190px'}>
          {selectedMonth.toLocaleString('pl-PL', { month: 'long', year: 'numeric' })}
        </Box>
        <VStack spacing={0}>
          <TiArrowSortedUp size={'2rem'} cursor={'pointer'} onClick={onMonthUphandler} />
          <TiArrowSortedDown size={'2rem'} cursor={'pointer'} onClick={onMonthDownHandler} />
        </VStack>
      </HStack>
      <Grid templateColumns={'repeat(7, 1fr)'} w={'300px'} rowGap={0} columnGap={0}>
        {Array.from({ length: leftPadding }).map((_, index) => (
          <GridItem key={index} w={'100%'} />
        ))}
        {currentMonthDays.map((day, index) => {
          const isHoliday = false;
          const isDayOff = false;
          const dayTimestamp = day.getTime();
          const startTimestamp = startDate?.getTime();
          const endTimestamp = endDate?.getTime();
          const dateSelecting =
            isSelecting &&
            startDate &&
            dateHovering &&
            dayTimestamp > startTimestamp! &&
            dayTimestamp < dateHovering.getTime();
          return (
            <GridItem
              p={1}
              key={index}
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              cursor={'pointer'}
              _hover={{
                bgColor: isSelecting ? 'linkedin.200' : '',
              }}
              bgColor={
                dateSelecting
                  ? 'linkedin.400'
                  : startDate && dayTimestamp === startTimestamp
                  ? 'linkedin.600'
                  : startDate && endDate && dayTimestamp >= startTimestamp! && dayTimestamp <= endTimestamp!
                  ? 'linkedin.600'
                  : isDayOff
                  ? 'green.300'
                  : ''
              }
              opacity={startDate && dayTimestamp < startTimestamp! ? .3 : 1}
              onClick={e => {
                if(startDate && dayTimestamp < startTimestamp!) return
                onDayClickHandler(day)
              }}
              onMouseEnter={e => setDateHovering(day)}
            >
              <Flex
                p={2}
                justifyContent={'center'}
                alignItems={'center'}
                w={'1.5rem'}
                h={'1.5rem'}
                borderRadius={'50%'}
                bgColor={isHoliday ? 'red.300' : day.getDay() === 0 ? 'red.200' : ''}
                fontSize={'1rem'}
              >
                {day.getDate()}
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};
