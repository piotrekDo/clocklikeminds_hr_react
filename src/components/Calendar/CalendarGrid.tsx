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
  const months = Array.from({ length: 12 }).map((_, index) => new Date(selectedYear.getFullYear(), index, 1));
  return (
    <Grid templateColumns={'repeat(3, 1fr)'} gap={4} w={'100%'}>
      {months.map((month, index) => (
        <CalendarMonth key={index} month={month} holidays={holidays} daysOff={userPtos} />
      ))}
    </Grid>
  );
};
