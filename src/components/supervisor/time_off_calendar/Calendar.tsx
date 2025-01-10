import { HStack, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePtosRequestsForSupervisorCalendar from '../../../hooks/usePtosForSupervisorCalendar';
import useHttpErrorState from '../../../state/useHttpErrorState';
import { getHolidaysPoland } from '../../Calendar/holidays';
import { CalendarNavigation } from './CalendarNavigation';
import { Header } from './Header';
import { MonthView } from './MonthView';
import { TeamView } from './TeamView';

export type CalendarViews = 'month' | 'team';
export type SelectedWeek = { index: number; days: number[] };
export const Calendar = () => {
  const [searchParams] = useSearchParams();
  const paramDate = searchParams.get('date');
  const today = paramDate ? new Date(paramDate) : new Date();
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
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 - 7).toISOString().slice(0, 10),
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + 40).toISOString().slice(0, 10),
    ['supervisorCalendar', selectedDate.getMonth().toString()]
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
          <MonthView selectedDate={selectedDate} holidays={holidays} isPtosFetching={isPtosFetching} />
        )}
        {selectedView === 'team' && (
          <TeamView selectedDate={selectedDate} holidays={holidays} isPtosFetching={isPtosFetching} />
        )}
      </VStack>
    </HStack>
  );
};
