import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  ModalFooter,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
  Box,
  GridItem,
  HStack,
  SimpleGrid,
  Tooltip,
  VStack,
  Text,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { PtoRequestFormatted } from '../../model/Pto';
import usePtoComparationStore from '../../state/usePtoComparationState';
import usePtosInTimeFrame from '../../hooks/usePtosInTimeFrame';
import useAuthentication from '../../state/useAuthentication';
import { getHolidaysPoland } from '../Calendar/holidays';
import { Header } from './SupervisorCalendat/Header';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PtoCompareModal = ({ isOpen, onClose }: Props) => {
  const today = new Date();
  const [userId, setUserId] = useState(-1);
  const [fetchStartDate, setFetchStartDate] = useState('');
  const [fetchEndDate, setFetchEndDate] = useState('');
  const user = useAuthentication(s => s.appUser);
  const { pto } = usePtoComparationStore();
  const [highlightedPto, setHighlightedPto] = useState(-1);
  const { data: ptos, isFetching, isError, error, refetch } = usePtosInTimeFrame(userId, fetchStartDate, fetchEndDate);
  const holidays = getHolidaysPoland(pto?.ptoStart.getFullYear() || today.getFullYear());

  const dateStart = pto
    ? new Date(Date.UTC(pto.ptoStart.getUTCFullYear(), pto.ptoStart.getUTCMonth(), pto.ptoStart.getUTCDate()))
    : undefined;
  const dateEnd = pto
    ? new Date(Date.UTC(pto.ptoEnd.getUTCFullYear(), pto.ptoEnd.getUTCMonth(), pto.ptoEnd.getUTCDate()))
    : undefined;

  const startMondayLoc = dateStart ? new Date(dateStart) : undefined;
  const startMondayOffset = dateStart ? (dateStart.getDay() === 0 ? 6 : dateStart.getDay() - 1) : undefined;
  startMondayLoc && startMondayOffset && startMondayLoc.setDate(startMondayLoc.getDate() - startMondayOffset);

  const endMondayLoc = dateEnd ? new Date(dateEnd) : undefined;
  const endMondayOffset = dateEnd ? (dateEnd.getDay() === 0 ? 6 : dateEnd.getDay() - 1) : undefined;
  endMondayLoc && endMondayOffset && endMondayLoc.setDate(endMondayLoc.getDate() - endMondayOffset);

  const weeksToDisplay: Date[] = [];
  if (startMondayLoc && endMondayLoc) {
    const week = new Date(
      Date.UTC(startMondayLoc.getFullYear(), startMondayLoc.getMonth(), startMondayLoc.getDate() - 7, 0)
    );
    weeksToDisplay.push(week);
    while (weeksToDisplay[weeksToDisplay.length - 1] <= endMondayLoc) {
      const i = weeksToDisplay.length - 1;
      const newWeek: Date = new Date(
        Date.UTC(weeksToDisplay[i].getFullYear(), weeksToDisplay[i].getMonth(), weeksToDisplay[i].getDate() + 7, 0)
      );
      weeksToDisplay.push(newWeek);
    }
  }

  useEffect(() => {
    if (weeksToDisplay.length > 0) {
      const fetchEndDay = new Date(
        Date.UTC(
          weeksToDisplay[weeksToDisplay.length - 1].getFullYear(),
          weeksToDisplay[weeksToDisplay.length - 1].getMonth(),
          weeksToDisplay[weeksToDisplay.length - 1].getDate() + 6,
          0
        )
      );
      console.log(fetchEndDay)

      setUserId(user?.userId || -1);
      setFetchStartDate(weeksToDisplay[0].toISOString().slice(0, 10));
      setFetchEndDate(fetchEndDay.toISOString().slice(0, 10));
    }
  }, [pto]);

  return (
    <Modal size={'6xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          <VStack
            mt={5}
            w={'100%'}
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
              w={'100%'}
              h={'100%'}
              overflowY={'scroll'}
              style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
            >
              <VStack w={'100%'} h={'100%'} position={'relative'}>
                {weeksToDisplay.map((monday, index) => {
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
