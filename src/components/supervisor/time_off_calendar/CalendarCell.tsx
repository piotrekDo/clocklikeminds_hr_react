import { GridItem, Text } from '@chakra-ui/react';

interface Props {
  day: Date;
  selectedDate: Date;
}

export const CalendarCell = ({ day }: Props) => {
  return (
    <GridItem display={'flex'} justifyContent={'center'} bg={'whiteAlpha.600'}>
      <Text>{day.getDate() === 1 && day.toLocaleString('pl-PL', {month: 'short'})} {day.getDate()}</Text>
    </GridItem>
  );
};
