import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { CalendarViews, SelectedWeek } from './Calendar';
import { MonthPreview } from './MonthPreview';
import { NavSelectedMonth } from './NavSelectedMonth';
import { NavSelectedYear } from './NavSelectedYear';
import useThemeState from '../../../state/useThemeState';

interface Props {
  selectedDate: Date;
  selectedView: CalendarViews;
  holidays: Map<string, string>;
  selectedWeek: SelectedWeek;
  setSelectedView: (view: CalendarViews) => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedWeek: React.Dispatch<React.SetStateAction<SelectedWeek>>;
}

const selectViewOptions = new Map<CalendarViews, { name: string }>([
  ['month', { name: 'Miesiąc' }],
  ['team', { name: 'Zespół' }],
]);

export const CalendarNavigation = ({
  selectedDate,
  selectedView,
  holidays,
  selectedWeek,
  setSelectedDate,
  setSelectedView,
  setSelectedWeek,
}: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const today = new Date();
  return (
    <VStack align={'center'} w={'250px'} h={'100%'} spacing={0} pt={'10px'}>
      <HStack justify={'center'} spacing={1} color={'blackAlpha.800'} fontWeight={'700'} fontSize={'1.2rem'}>
        <NavSelectedMonth selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <NavSelectedYear selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </HStack>
      <HStack mt={5}>
        <Button colorScheme='gray' onClick={() => setSelectedDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
          <ArrowLeftIcon />
        </Button>
        <Button
          colorScheme={
            selectedDate.getFullYear() === today.getFullYear() && selectedDate.getMonth() === today.getMonth()
              ? 'facebook'
              : 'gray'
          }
          onClick={() => setSelectedDate(today)}
        >
          Dziś
        </Button>
        <Button colorScheme='gray' onClick={() => setSelectedDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
          <ArrowRightIcon />
        </Button>
      </HStack>
      <VStack spacing={0} w={'100%'} mt={10}>
        {Array.from(selectViewOptions.entries()).map(([key, { name }]) => (
          <Button
            key={key}
            onClick={() => setSelectedView(key)}
            colorScheme={selectedView === key ? 'gray' : 'none'}
            color={selectedView === key ? 'blackAlpha.800' : theme.fontColor}
            w={'100%'}
          >
            {name}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};
