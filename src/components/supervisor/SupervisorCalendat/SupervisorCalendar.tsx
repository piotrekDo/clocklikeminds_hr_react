import { Box, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PtoRequestFormatted } from '../../../model/Pto';
import { getHolidaysPoland } from '../../Calendar/holidays';
import { CalendarCell } from './CalendarCell';
import { Header } from './Header';

interface Props {
  ptosToRender: PtoRequestFormatted[];
}

export const SupervisorCalendar = ({ ptosToRender }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDate, setHighlightedDate] = useState(new Date());
  const holidays = useMemo(() => getHolidaysPoland(highlightedDate.getFullYear()), [highlightedDate.getFullYear()]);

  const today = new Date();

  selectedDate.setDate(1);
  const firstDayOfWeek = selectedDate.getDay();
  const leftPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  selectedDate.setDate(selectedDate.getDate() - leftPadding);

  useEffect(() => {
    let check = new Date(selectedDate);
    check.setDate(check.getDate() + 14 + 6 + scroll);
    setHighlightedDate(s => new Date(check.getFullYear(), check.getMonth(), 1));
  }, [scroll]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!isScrolling && e.deltaY !== 0) {
        setIsScrolling(true);
        if (e.deltaY > 0) {
          setScroll(prevScroll => prevScroll + 7);
        } else {
          setScroll(prevScroll => prevScroll - 7);
        }
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }
    };

    if (ref.current) {
      ref.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isScrolling]);

  return (
    <VStack w={'90%'} h={'100%'} gap={0} flexShrink={0} justify={'center'} align={'center'}>
      <HStack flexShrink={0}>
        <Text>{highlightedDate.toLocaleDateString('pl-Pl', { month: 'long', year: 'numeric' })}</Text>
      </HStack>
      <Header />
      <VStack ref={ref} w={'100%'} h={'100%'}>
        {[0, 7, 14, 21, 28, 35].map(offset => {
          const monday = new Date(selectedDate);
          monday.setDate(monday.getDate() + offset + scroll);
          const sunday = new Date(monday);
          sunday.setDate(sunday.getDate() + 6);
          const requestsInWeek = ptosToRender.filter(
            p =>
              (p.ptoStart >= monday && p.ptoStart <= sunday) || 
              (p.ptoEnd >= monday && p.ptoEnd <= sunday) || 
              (monday >= p.ptoStart && sunday <= p.ptoEnd) ||
              (p.ptoStart.getDate() === monday.getDate() ) ||
              (p.ptoEnd.getDate() === monday.getDate())
          );
          return (
            <SimpleGrid
              key={offset}
              columns={7}
              w={'100%'}
              h={'100%'}
              bg={'gray.50'}
              borderRadius={offset === 0 ? '0 0 20px 20px' : '20px'}
              position={'relative'}
            >
              {Array.from({ length: 7 }).map((_, index) => {
                let day = new Date(selectedDate);
                day.setDate(day.getDate() + offset + index + scroll);
                return (
                  <CalendarCell
                    key={index}
                    today={today}
                    highlightedDate={highlightedDate}
                    day={day}
                    holidays={holidays}
                    requestsInWeek={requestsInWeek}
                  />
                );
              })}
            </SimpleGrid>
          );
        })}
      </VStack>
    </VStack>
  );
};
