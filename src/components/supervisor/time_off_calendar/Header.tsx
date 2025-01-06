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
      <HStack w={'100%'} h={'32px'}>
        {selectedView != 'team' &&
          ['PON', 'WTO', 'ŚRO', 'CZW', 'PIĄ', 'SOB', 'NIE'].map((day, index) => (
            <Text key={index} flexBasis={'100%'} textAlign={'center'} fontSize={'1.3rem'} fontWeight={'600'} as={'em'}>
              {day}
            </Text>
          ))}
      </HStack>
    </VStack>
  );
};
