import {
  Flex,
  Grid,
  GridItem,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Box,
  HStack,
} from '@chakra-ui/react';
import { PtoRequestResponse } from '../../model/Pto';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface Props {
  month: Date;
  holidays: Map<string, string>;
  daysOff: PtoRequestResponse[];
}

export const CalendarMonth = ({ month, holidays, daysOff }: Props) => {
  const startingDayOfWeek = month.getDay();
  const leftPadding = startingDayOfWeek === 0 ? 6 : startingDayOfWeek === 1 ? 0 : startingDayOfWeek - 1;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const currentMonthDays: Date[] = Array.from(
    { length: days },
    (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1)
  );

  return (
    <GridItem w={'100%'} display={'flex'} flexDirection={'column'}>
      <Text mb={5}>{month.toLocaleString('pl-PL', { month: 'long' })}</Text>
      <Grid templateColumns={'repeat(7, 1fr)'} w={'100%'} rowGap={2} columnGap={0}>
        {Array.from({ length: leftPadding }).map((_, index) => (
          <GridItem key={index} w={'100%'} />
        ))}
        {currentMonthDays.map((day, index) => {
          const isHoliday: string | undefined = holidays.get(`${day.getMonth()}${day.getDate()}`);
          const isDayOff = daysOff.filter(testedPto => {
            return day.getTime() >= testedPto.ptoStart.getTime() && day.getTime() <= testedPto.ptoEnd.getTime();
          })[0];

          return (
            <Popover key={index}>
              <PopoverTrigger>
                <GridItem
                  key={index}
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  cursor={isDayOff ? 'pointer' : 'default'}
                  bgColor={isDayOff ? 'green.300' : ''}
                >
                  <Flex
                    p={2}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'10px'}
                    h={'10px'}
                    borderRadius={'50%'}
                    bgColor={isHoliday ? 'red.300' : day.getDay() === 0 ? 'red.200' : ''}
                    fontSize={'.5rem'}
                    title={isHoliday}
                  >
                    {day.getDate()}
                  </Flex>
                </GridItem>
              </PopoverTrigger>
              {isDayOff && (
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <Text>ID wniosku: {isDayOff.id}</Text>
                    <Text>
                      {isDayOff.applierFirstName} {isDayOff.applierLastName}
                    </Text>
                  </PopoverHeader>
                  <PopoverBody>
                    <Text>
                      Wniosek urlopowy z dnia{' '}
                      {isDayOff.requestDateTime.toLocaleString('pl-PL', {
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <HStack>
                      <HStack>
                        <FaRegCalendarCheck />
                        <Box>
                          {isDayOff.ptoStart.toLocaleString('pl-PL', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                          })}
                        </Box>
                      </HStack>
                      <HStack>
                        <Box>
                          {isDayOff.ptoEnd.toLocaleString('pl-PL', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                          })}
                        </Box>
                      </HStack>
                    </HStack>
                    <Text>
                      {isDayOff.totalDays} dni łącznie{' '}
                      {isDayOff.totalDays > 1 && `,w tym ${isDayOff.businessDays} roboczych`}
                    </Text>
                    {isDayOff.isPending && <Text>Oczekujący</Text>}
                  </PopoverBody>
                </PopoverContent>
              )}
            </Popover>
          );
        })}
      </Grid>
    </GridItem>
  );
};
