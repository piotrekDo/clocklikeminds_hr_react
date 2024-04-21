import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { PtoRequestFormatted } from '../../model/Pto';
import { CalendarMonth } from './CalendarMonth';
import { getHolidaysPoland } from './holidays';

interface Props {
  selectedYear: Date;
  daysOff: PtoRequestFormatted[];
}

export const CalendarGrid = ({ selectedYear, daysOff }: Props) => {
  const holidays = useMemo(() => getHolidaysPoland(selectedYear.getFullYear()), [selectedYear.getFullYear()]);
  const months = Array.from({ length: 12 }).map((_, index) => new Date(selectedYear.getFullYear(), index, 1));
  return (
    <Grid templateColumns={'repeat(3, 1fr)'} gap={5} w={'100%'}>
      {months.map((month, index) => (
        <CalendarMonth key={index} month={month} holidays={holidays} daysOff={daysOff} />
      ))}
    </Grid>
  );
};
