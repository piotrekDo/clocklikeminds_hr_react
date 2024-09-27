import { HStack, Text, VStack } from '@chakra-ui/react';
import { CalendarViews, SelectedWeek } from './Calendar';
interface Props {
  selectedDate: Date;
  selectedView: CalendarViews;
  selectedWeek: SelectedWeek;
}
export const Header = ({ selectedDate, selectedView, selectedWeek: { days } }: Props) => {
  return (
    <VStack w={'100%'}>
      <HStack w={'100%'} fontSize={'1rem'} fontWeight={'600'}>
        <Text flexBasis={'100%'} textAlign={'center'}>
          PON
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          WTO
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          ŚRO
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          CZW
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          PIĄ
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          SOB
        </Text>
        <Text flexBasis={'100%'} textAlign={'center'}>
          NIE
        </Text>
      </HStack>
      {selectedView === 'week' && (
        <HStack w={'100%'}>
          {days.map(day => (
            <Text key={day} flexBasis={'100%'} textAlign={'center'}>
              {day}
            </Text>
          ))}
        </HStack>
      )}
    </VStack>
  );
};
