import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { PtoRequestFormatted } from '../../../model/Pto';

interface Props {
  today: Date;
  highlightedDate: Date;
  day: Date;
  holidays: Map<string, string>;
  requestsInWeek: PtoRequestFormatted[];
}

export const CalendarCell = ({ today, highlightedDate, day, holidays, requestsInWeek }: Props) => {
  const isSunday = day.getDay() === 0;
  const isToday = day.toDateString() === today.toDateString();
  const isInCurrentMonth = day.getMonth() === highlightedDate.getMonth();
  const isHoliday: string | undefined = holidays.get(`${day.getMonth()}${day.getDate()}`);

  const isPtoToRender = (p: PtoRequestFormatted) => {
    return (
      (day >= p.ptoStart && day <= p.ptoEnd) ||
      day.toDateString() === p.ptoStart.toDateString() ||
      day.toDateString() === p.ptoEnd.toDateString()
    );
  };

  return (
    <Flex fontSize={'.8rem'} gap={1} flexDir={'column'}>
      <HStack>
        <Text
          color={isSunday || isHoliday ? 'red' : ''}
          fontWeight={isInCurrentMonth ? 'bold' : 'normal'}
          opacity={!isInCurrentMonth ? 0.8 : 1}
          pl={2}
          pt={1}
        >
          {day.getDate()}
        </Text>
        <Text fontSize={'.6rem'}>{isHoliday && isHoliday}</Text>
      </HStack>

      {requestsInWeek.map((p, index) => {
        if (isPtoToRender(p)) {
          const isFirstDay = day.getDate() === p.ptoStart.getDate();
          const isLastDay = day.getDate() === p.ptoEnd.getDate();
          return (
            <Flex key={index} bg={'teal.100'} justify={'center'} align={'center'} margin={0} borderRadius={isFirstDay ? '10px 0 0 10px' : isLastDay ? '0 10px 10px 0' : ''}>
              {p.applierFirstName}
            </Flex>
          );
        } else {
          return <Flex key={index} justify={'center'} align={'center'} margin={0}>{'\u200B'}</Flex>;
        }
      })}
    </Flex>
  );
};
