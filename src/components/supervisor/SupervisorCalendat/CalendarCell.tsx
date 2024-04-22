import { Flex, Text } from '@chakra-ui/react';

interface Props {
  today: Date;
  highlightedDate: Date;
  day: Date;
  holidays: Map<string, string>;

}

export const CalendarCell = ({ today, highlightedDate, day, holidays }: Props) => {
  const isSunday = day.getDay() === 0;
  const isToday = day.toDateString() === today.toDateString();
  const isInCurrentMonth = day.getMonth() === highlightedDate.getMonth();
  const isHoliday: string | undefined = holidays.get(`${day.getMonth()}${day.getDate()}`);

  return (
    <Flex position='relative'>
      <Text
        position='absolute'
        color={isSunday || isHoliday ? 'red' : ''}
        bg={isToday ? 'blue.200' : ''}
        borderRadius='50%'
        p={1}
        fontWeight={isInCurrentMonth ? 'bold' : 'normal'}
        opacity={!isInCurrentMonth ? 0.8 : 1}
      >
        {day.getDate()}
      </Text>
      <Text left={8} position={'absolute'} fontSize={'.6rem'}>
      {isHoliday && isHoliday}
      </Text>
    </Flex>
  );
};
