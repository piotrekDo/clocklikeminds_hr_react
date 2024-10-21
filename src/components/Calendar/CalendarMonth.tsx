import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { PtoRequestFormatted } from '../../model/Pto';
import usePtoRequestState from '../../state/usePtoRequestState';
import { useState } from 'react';

interface Props {
  month: Date;
  holidays: Map<string, string>;
  daysOff: PtoRequestFormatted[];
  setShowPto: React.Dispatch<React.SetStateAction<PtoRequestFormatted | undefined>>;
}

export const CalendarMonth = ({ month, holidays, daysOff, setShowPto }: Props) => {
  const { isRequestingPto, startDate, selectedPtoType, setStartDate, setEndDate } = usePtoRequestState();
  const newPtoStartDate = usePtoRequestState(s => s.startDate);
  const newPtoEndDate = usePtoRequestState(s => s.endDate);
  const startingDayOfWeek = month.getDay();
  const leftPadding = startingDayOfWeek === 0 ? 6 : startingDayOfWeek === 1 ? 0 : startingDayOfWeek - 1;
  const days = new Date(Date.UTC(month.getFullYear(), month.getMonth() + 1, 0)).getDate();
  const currentMonthDays: Date[] = Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.UTC(month.getFullYear(), month.getMonth(), index + 1));
    return date;
  });
  const [isHovering, setIshovering] = useState<boolean>(false);

  const handleOnRequestingPtoClick = (day: Date) => {
    if (selectedPtoType === 'on_saturday_pto') {
      setStartDate(day);
      setEndDate(day);
    } else {
      (!startDate && setStartDate(day)) || setEndDate(day);
    }
  };

  const handleOnPtoClick = (dayOff: PtoRequestFormatted) => {
    if (!dayOff) {
      setShowPto(undefined);
    } else {
      setShowPto(s => (s?.id === dayOff.id ? undefined : dayOff));
    }
  };

  return (
    <GridItem
      w={'100%'}
      p={{ base: 0, monitorM: 1 }}
      borderRadius={'10px'}
      display={'flex'}
      flexDirection={'column'}
      _hover={{ transform: 'scale(1.03)' }}
      transition={'transform .1s ease-in'}
      onMouseEnter={e => setIshovering(true)}
      onMouseLeave={e => setIshovering(false)}
    >
      <VStack align='start' spacing={1}>
        <Text
          as='b'
          fontSize={{ base: '1rem', monitorM: '1.1rem' }}
          transform={isHovering ? 'none' : 'translateY(20px)'}
          transition='transform 0.2s'
        >
          {month.toLocaleString('pl-PL', { month: 'long' })}
        </Text>
        <HStack w='100%' px={1} opacity={isHovering ? 1 : 0} transition='opacity 0.4s'>
          {['PO', 'WT', 'ŚR', 'CZ', 'PI', 'SO', 'NI'].map((day, index) => (
            <Flex
              key={day}
              flexBasis='100%'
              justify='center'
              transform={isHovering ? 'none' : `translateY(20px)`}
              transition={`transform 0.2s ${25 * (index + 1)}ms`}
            >
              <Text fontSize='0.8rem' fontWeight={600}>
                {day}
              </Text>
            </Flex>
          ))}
        </HStack>
      </VStack>
      <Grid templateColumns={'repeat(7, 1fr)'} w={'100%'} rowGap={{base: 1, monitorM: 2}} columnGap={0}>
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
              borderRadius={
                isDayOff
                  ? isDayOff.ptoStart.getDate() === day.getDate() && isDayOff.ptoEnd.getDate() === day.getDate()
                    ? '10px'
                    : isDayOff.ptoStart.getDate() === day.getDate()
                    ? '10px 0 0 10px'
                    : isDayOff.ptoEnd.getDate() === day.getDate()
                    ? '0 10px 10px 0'
                    : ''
                  : ''
              }
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
              cursor={isRequestingPto || isDayOff ? 'pointer' : ''}
              onClick={e => {
                isRequestingPto ? handleOnRequestingPtoClick(day) : handleOnPtoClick(isDayOff);
              }}
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
                <Text >{day.getDate()}</Text>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </GridItem>
  );
};
