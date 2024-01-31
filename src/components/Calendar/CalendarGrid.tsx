import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { usersPtos } from '../../mock/PtoMock';
import { CalendarMonth } from './CalendarMonth';
import { getHolidaysPoland } from './holidays';

interface Props {
  selectedYear: Date;
}

export const CalendarGrid = ({ selectedYear }: Props) => {
  const holidays = useMemo(() => getHolidaysPoland(selectedYear.getFullYear()), [selectedYear.getFullYear()]);
  const userPtos = usersPtos;

  return (
    <Grid templateColumns={'repeat(3, 1fr)'} gap={4} w={'100%'}>
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 0, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 1, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 2, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 3, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 4, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 5, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 6, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 7, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 8, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 9, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 10, 1)} holidays={holidays} daysOff={userPtos} />
      <CalendarMonth month={new Date(selectedYear.getFullYear(), 11, 1)} holidays={holidays} daysOff={userPtos} />
    </Grid>
  );
};
