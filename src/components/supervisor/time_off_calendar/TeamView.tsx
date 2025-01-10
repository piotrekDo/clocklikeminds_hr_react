import { Box, Grid, GridItem, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ptoTypeTranslatePl, TimeOffRequestsByEmployeeFormatted } from '../../../model/Pto';
import { UserImage } from '../../UserImage';
import usePtoModalStore from '../../../state/usePtoModalStore';

interface Props {
  selectedDate: Date;
  holidays: Map<string, string>;
  isPtosFetching: boolean;
}

export const TeamView = ({ selectedDate, holidays, isPtosFetching }: Props) => {
  const setPtoExtended = usePtoModalStore(s => s.setPtoExtendedModal);
  const [highlightedPto, setHighlightedPto] = useState(-1);
  const queryClient = useQueryClient();
  let entries = queryClient.getQueryData<TimeOffRequestsByEmployeeFormatted[]>([
    'supervisorCalendar',
    selectedDate.getMonth().toString(),
  ]);

  const employees = entries?.map(entry => entry.employee) || [];

  const days: Date[] = [];
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
  }

  return (
    <Grid
      color={'white'}
      w={'100%'}
      templateRows={`50px repeat(${employees.length}, 50px)`}
      templateColumns={`250px repeat(${days.length}, 1fr)`}
      p={2}
      bg={'whiteAlpha.400'}
      borderRadius={'20px'}
    >
      <GridItem colStart={1} rowStart={1}></GridItem>
      {days.map((day, index) => {
        const isSunday = day.getDay() === 0;
        const isHoliday: string | undefined = holidays.get(`${day.getMonth()},${day.getDate()}`);

        return (
          <GridItem
            key={day.getDate()}
            rowStart={1}
            colStart={index + 2}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontSize={'1.2rem'}
            fontWeight={'600'}
            color={isHoliday ? 'red.500' : isSunday ? 'red.300' : ''}
            fontStyle={isHoliday ? 'italic' : ''}
          >
            {!isHoliday && <Text>{day.getDate()}</Text>}
            {isHoliday && (
              <Tooltip label={isHoliday}>
                <Text>{day.getDate()}</Text>
              </Tooltip>
            )}
          </GridItem>
        );
      })}
      {entries?.map((entry, rowIndex) => (
        <React.Fragment key={entry.employee.appUserId}>
          <GridItem
            key={entry.employee.appUserId}
            colStart={1}
            rowStart={rowIndex + 2}
            justifyContent={'start'}
            alignItems={'center'}
            display={'flex'}
            my={'5px'}
          >
            <Box mr={2} h={'40px'}>
              <UserImage imgUrl={entry.employee.imageUrl} />
            </Box>
            <VStack spacing={0} align={'start'} fontSize={'1rem'} fontWeight={600}>
              <Text>{entry.employee.firstName}</Text>
              <Text>{entry.employee.lastName}</Text>
            </VStack>
          </GridItem>
          {entry.requestsByTimeFrame
            .filter(
              timeoff =>
                timeoff.ptoStart.getMonth() === selectedDate.getMonth() ||
                timeoff.ptoEnd.getMonth() === selectedDate.getMonth()
            )
            .map((timeoff, index) => {
              const start = timeoff.ptoStart.getDate();
              const end = timeoff.ptoEnd.getDate();
              const isCurMonthStart = timeoff.ptoStart.getMonth() === selectedDate.getMonth();
              const isCurMonthEnd = timeoff.ptoEnd.getMonth() === selectedDate.getMonth();

              const colStart = isCurMonthStart ? start : 1;
              const colSpan = isCurMonthStart ? (isCurMonthEnd ? timeoff.totalDays : 31) : end;

              return (
                <Tooltip
                  whiteSpace={'pre-line'}
                  label={`${timeoff.applierFirstName} ${timeoff.applierLastName}\n${timeoff.ptoStart.toLocaleString(
                    'pl-PL',
                    {
                      dateStyle: 'long',
                    }
                  )} - ${timeoff.ptoEnd.toLocaleString('pl-PL', { dateStyle: 'long' })}\n${ptoTypeTranslatePl.get(
                    timeoff.leaveType
                  )}\n${timeoff.wasAccepted ? 'ZAAKCEPTOWANY' : 'OCZEKUJE'}`}
                >
                  <GridItem
                    key={index}
                    onClick={() => setPtoExtended(timeoff)}
                    colStart={colStart + 1}
                    colSpan={colSpan}
                    rowStart={rowIndex + 2}
                    m={1}
                    cursor={'pointer'}
                    border={'1px solid black'}
                    bg={
                      timeoff.id === highlightedPto
                        ? 'teal.300'
                        : timeoff.wasAccepted
                        ? 'rgba(10, 210, 10, .4)'
                        : 'rgba(250, 230, 180, .4)'
                    }
                    zIndex={1000}
                    borderRadius={
                      isCurMonthStart && isCurMonthEnd
                        ? '15px'
                        : isCurMonthStart
                        ? '15px 0 0 15px'
                        : isCurMonthEnd
                        ? '0 15px 15px 0'
                        : ''
                    }
                  >
                    <Text></Text>
                  </GridItem>
                </Tooltip>
              );
            })}
        </React.Fragment>
      ))}
    </Grid>
  );
};
