import { HStack, Text, VStack } from '@chakra-ui/react';
import { CalendarViews, SelectedWeek } from './Calendar';
import useThemeState from '../../../state/useThemeState';
interface Props {
  selectedDate: Date;
  selectedView: CalendarViews;
  selectedWeek: SelectedWeek;
}
export const Header = ({ selectedDate, selectedView, selectedWeek: { days } }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  return (
    <VStack w={'100%'} color={theme.fontColor}>
      <HStack w={'100%'}>
        {['PON', 'WTO', 'ŚRO', 'CZW', 'PIĄ', 'SOB', 'NIE'].map((day, index) => (
          <Text key={index} flexBasis={'100%'} textAlign={'center'} fontSize={'1.3rem'} fontWeight={'600'} as={'em'}>
            {day}
          </Text>
        ))}
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
