import { HStack, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { getHolidaysPoland } from '../../Calendar/holidays';
import { CalendarNavigation } from './CalendarNavigation';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import usePtosRequestsForSupervisorCalendar from '../../../hooks/usePtosForSupervisorCalendar';
import useAuthentication from '../../../state/useAuthentication';
import useHttpErrorState from '../../../state/useHttpErrorState';

export type CalendarViews = 'month' | 'week';
export type SelectedWeek = { index: number; days: number[] };
export const Calendar = () => {
  const today = new Date();
  const user = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedView, setSelectedView] = useState<CalendarViews>('month');
  const [selectedWeek, setSelectedWeek] = useState<SelectedWeek>({ index: -1, days: [] });
  const holidays = useMemo(() => getHolidaysPoland(selectedDate.getFullYear()), [selectedDate.getFullYear()]);

  const {
    isFetching: isPtosFetching,
    isError: isPtosFetchingError,
    error: ptosFetchingError,
    refetch: refetchPtos,
  } = usePtosRequestsForSupervisorCalendar(
    user?.userId || -1,
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 - 7).toISOString().slice(0, 10),
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + 40).toISOString().slice(0, 10)
  );

  const handleSelectView = (view: CalendarViews) => {
    setSelectedView(view);
    setSelectedWeek({ index: -1, days: [] });
  };

  useEffect(() => {
    refetchPtos();
  }, [selectedDate]);

  useEffect(() => {
    isPtosFetchingError && setError(ptosFetchingError);
  }, [isPtosFetchingError]);

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
      <VStack w={'100%'} maxW={'1500px'} h={'100%'} spacing={0} ml={10}>
        <Header selectedDate={selectedDate} selectedView={selectedView} selectedWeek={selectedWeek} />
        {selectedView === 'month' && (
          <MonthView selectedDate={selectedDate} holidays={holidays} isPtosFetching={isPtosFetching}/>
        )}
        {selectedView === 'week' && <WeekView />}
      </VStack>
    </HStack>
  );
};
