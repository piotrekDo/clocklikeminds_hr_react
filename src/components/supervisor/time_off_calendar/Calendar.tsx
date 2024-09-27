import { HStack, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { CalendarNavigation } from './CalendarNavigation';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { getHolidaysPoland } from '../../Calendar/holidays';
import { WeekView } from './WeekView';

export type CalendarViews = 'month' | 'week';
export type SelectedWeek = { index: number; days: number[] };
export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<CalendarViews>('month');
  const [selectedWeek, setSelectedWeek] = useState<SelectedWeek>({ index: -1, days: [] });
  const holidays = useMemo(() => getHolidaysPoland(selectedDate.getFullYear()), [selectedDate.getFullYear()]);

  const handleSelectView = (view: CalendarViews) => {
    setSelectedView(view);
    setSelectedWeek({ index: -1, days: [] });
  };

  return (
    <HStack w={'100%'} h={'100%'}>
      <CalendarNavigation
        selectedDate={selectedDate}
        selectedView={selectedView}
        selectedWeek={selectedWeek}
        holidays={holidays}
        setSelectedDate={setSelectedDate}
        setSelectedView={handleSelectView}
        setSelectedWeek={setSelectedWeek}
      />
      <VStack w={'100%'} maxW={'1500px'} h={'100%'} spacing={0}>
        <Header selectedDate={selectedDate} selectedView={selectedView} selectedWeek={selectedWeek} />
        {selectedView === 'month' && <MonthView selectedDate={selectedDate} />}
        {selectedView === 'week' && <WeekView />}
      </VStack>
    </HStack>
  );
};
