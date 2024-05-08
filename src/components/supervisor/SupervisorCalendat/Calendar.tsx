import { Box, GridItem, HStack, SimpleGrid, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import usePtosRequestsForSupervisorCalendar from '../../../hooks/usePtosForSupervisorCalendar';
import { PtoRequestFormatted } from '../../../model/Pto';
import useAuthentication from '../../../state/useAuthentication';
import { getHolidaysPoland } from '../../Calendar/holidays';
import { Header } from './Header';

export const Calendar = () => {
  const queryClient = useQueryClient();
  let ptos = queryClient.getQueryData<PtoRequestFormatted[]>(['ptosForSupervisorCalendar']);

  const user = useAuthentication(s => s.appUser);
  const [highlightedPto, setHighlightedPto] = useState(-1);
  const todayLoc = new Date();
  const today = new Date(Date.UTC(todayLoc.getFullYear(), todayLoc.getMonth(), todayLoc.getDate()));
  const mondayLoc = new Date();
  const mondayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;
  mondayLoc.setDate(mondayLoc.getDate() - mondayOffset);
  const monday = new Date(Date.UTC(mondayLoc.getFullYear(), mondayLoc.getMonth(), mondayLoc.getDate()));

  const startWeeks: Date[] = [];
  Array.from({ length: 13 }).forEach((_, index) => {
    const firstMondayLoc = new Date(monday);
    firstMondayLoc.setDate(firstMondayLoc.getDate() - 28);
    firstMondayLoc.setDate(firstMondayLoc.getDate() + 7 * index);
    const firstMonday = new Date(
      Date.UTC(firstMondayLoc.getFullYear(), firstMondayLoc.getMonth(), firstMondayLoc.getDate())
    );
    startWeeks.push(firstMonday);
  });
  const [holidaysYear, setHolidaysYear] = useState(today.getFullYear());
  const holidays = getHolidaysPoland(holidaysYear);
  const [start, setStart] = useState(startWeeks[0].toISOString().slice(0, 10));
  const [end, setEnd] = useState(startWeeks[startWeeks.length - 1].toISOString().slice(0, 10));
  const {
    isFetching: isPtosFetching,
    isError: isPtosFetchingError,
    error: ptosFetchingError,
    refetch: refetchPtos,
  } = usePtosRequestsForSupervisorCalendar(user?.userId || -1, start, end);

  useEffect(() => {
    refetchPtos();
  }, [start, end]);

  const ref = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState(startWeeks);
  const [scroll, setScroll] = useState(0);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = event => {
    const container = event.currentTarget;
    const scrollPos = container.scrollTop;
    const totalHeight = container.scrollHeight - container.clientHeight;
    const scrollPercent = (scrollPos / totalHeight) * 100;

    if (scrollPercent > 80) {
      setWeeks(w => {
        const start = new Date(
          Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 7)
        );
        const end = new Date(
          Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 28)
        );
        setStart(start.toISOString().slice(0, 10));
        setEnd(end.toISOString().slice(0, 10));
        return [
          ...w,
          new Date(Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 7)),
          new Date(Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 14)),
          new Date(Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 21)),
          new Date(Date.UTC(w[w.length - 1].getFullYear(), w[w.length - 1].getMonth(), w[w.length - 1].getDate() + 28)),
        ];
      });
    }
    if (scrollPercent < 20) {
      setWeeks(w => {
        const start = new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 28));
        const end = new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 7));
        setStart(start.toISOString().slice(0, 10));
        setEnd(end.toISOString().slice(0, 10));
        return [
          new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 28)),
          new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 21)),
          new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 14)),
          new Date(Date.UTC(w[0].getFullYear(), w[0].getMonth(), w[0].getDate() - 7)),
          ...w,
        ];
      });

      setScroll(container.scrollTop + 512);
    }
  };

  useLayoutEffect(() => {
    if (ref.current) {
      const container = ref.current;
      container.scrollTo({
        top: container.scrollTop + 512,
        behavior: 'instant',
      });
    }
  }, [scroll]);

  useEffect(() => {
    if (ref.current) {
      const todayElement = ref.current.querySelector(`#week-${4}`);
      if (todayElement) {
        todayElement.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  }, []);

  return (
    <VStack
      w={'90%'}
      h={'100%'}
      gap={0}
      flexShrink={0}
      justify={'center'}
      align={'center'}
      borderRadius={'20px 20px 0 0'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
    >
      <Header />
      <VStack
        p={2}
        ref={ref}
        w={'100%'}
        h={'100%'}
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
        onScroll={handleScroll}
      >
        <VStack w={'100%'} h={'100%'} position={'relative'}>
          {weeks.map((monday, index) => {
            const sundayLoc = new Date(monday);
            sundayLoc.setDate(sundayLoc.getDate() + 6);
            const sunday = new Date(Date.UTC(sundayLoc.getFullYear(), sundayLoc.getMonth(), sundayLoc.getDate()));

            const mondayTimestamp = monday.getTime();
            const sundayTimestamp = sunday.getTime();
            const ptosToRenderThisWeek =
              (ptos &&
                ptos.filter(p => {
                  const ptoStartTimestamp = new Date(p.ptoStart).getTime();
                  const ptoEndTimestamp = new Date(p.ptoEnd).getTime();
                  return (
                    (ptoStartTimestamp >= mondayTimestamp && ptoStartTimestamp <= sundayTimestamp) ||
                    (ptoEndTimestamp >= mondayTimestamp && ptoEndTimestamp <= sundayTimestamp) ||
                    (mondayTimestamp >= ptoStartTimestamp && sundayTimestamp <= ptoEndTimestamp)
                  );
                })) ||
              [];
            return (
              <VStack key={index} w={'100%'} h={'100%'}>
                {sunday.getDate() < 8 && (
                  <HStack w={'100%'} h={'50px'}>
                    <Text as={'b'}>{sunday.toLocaleString('pl-PL', { month: 'long', year: 'numeric' })}</Text>
                  </HStack>
                )}
                <SimpleGrid
                  pos={'relative'}
                  key={index}
                  columns={7}
                  id={`week-${index}`}
                  gap={1}
                  flex={'0 0 auto'}
                  w={'100%'}
                  minH={'120px'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  px={2}
                  pt={'25px'}
                >
                  {Array.from({ length: 7 }).map((_, indexNested) => {
                    const day = new Date(Date.UTC(monday.getFullYear(), monday.getMonth(), monday.getDate()));
                    day.setDate(day.getDate() + indexNested);
                    const isSunday = day.getDay() === 0;
                    const isHoliday: string | undefined = holidays.get(`${day.getMonth()}${day.getDate()}`);
                    return (
                      <GridItem
                        pos={'absolute'}
                        key={indexNested}
                        colStart={indexNested + 1}
                        px={2}
                        w={'100%'}
                        h={'100%'}
                        boxShadow={'1px 1px 2px 0px rgba(66, 68, 90, 1)'}
                      >
                        <HStack w={'100%'}>
                          {day.getDate() != 1 && (
                            <Text color={isSunday || isHoliday ? 'red' : ''}>{day.getDate()}</Text>
                          )}
                          {day.getDate() === 1 && (
                            <Text color={isSunday || isHoliday ? 'red' : ''}>
                              {day.toLocaleString('pl-PL', { day: 'numeric', month: 'short' })}
                            </Text>
                          )}
                          {isHoliday && <Text fontSize={'.6rem'}>{isHoliday}</Text>}
                        </HStack>
                      </GridItem>
                    );
                  })}
                  {ptosToRenderThisWeek.map(p => {
                    const startingThisWeek = p.ptoStart.getTime() >= monday.getTime();
                    const endingThisWeek = p.ptoEnd.getTime() <= sunday.getTime();
                    const start = startingThisWeek ? (p.ptoStart.getDay() === 0 ? 7 : p.ptoStart.getDay()) : 1;
                    const end = endingThisWeek ? (p.ptoEnd.getDay() === 0 ? 7 : p.ptoEnd.getDay()) : 7;

                    return (
                      <Tooltip
                        key={p.id}
                        label={`ID: ${p.id} \n ${p.ptoStart.toLocaleString('pl-PL', {
                          day: '2-digit',
                          month: 'short',
                        })} - ${p.ptoEnd.toLocaleString('pl-PL', { day: '2-digit', month: 'short' })}`}
                        whiteSpace='pre-line'
                      >
                        <GridItem
                          key={p.id}
                          h={'100%'}
                          maxH={'30px'}
                          colStart={start}
                          colEnd={end + 1}
                          bg={p.id === highlightedPto ? '#385898' : p.pending ? 'yellow.200' : 'teal.200'}
                          opacity={p.pending ? '.5' : 0.9}
                          px={3}
                          borderRadius={
                            startingThisWeek && endingThisWeek
                              ? '10px'
                              : startingThisWeek
                              ? '10px 0 0 10px'
                              : endingThisWeek
                              ? '0 10px 10px 0'
                              : ''
                          }
                          outline={p.id === highlightedPto ? 'solid' : ''}
                          onMouseEnter={() => setHighlightedPto(p.id)}
                          onMouseLeave={() => setHighlightedPto(-1)}
                        >
                          <HStack h={'100%'}>
                            {p.applierImageUrl && (
                              <Box
                                h={'100%'}
                                borderRadius={'30px'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                overflow={'hidden'}
                              >
                                <img
                                  src={p.applierImageUrl}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  referrerPolicy='no-referrer'
                                />
                              </Box>
                            )}
                            <Text>{p.applierFirstName}</Text>
                          </HStack>
                        </GridItem>
                      </Tooltip>
                    );
                  })}
                </SimpleGrid>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
    </VStack>
  );
};
