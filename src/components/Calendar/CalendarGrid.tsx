import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { PtoRequestFormatted } from '../../model/Pto';
import { CalendarMonth } from './CalendarMonth';
import { getHolidaysPoland } from './holidays';

interface Props {
  selectedYear: Date;
  daysOff: PtoRequestFormatted[];
  setShowPto: React.Dispatch<React.SetStateAction<PtoRequestFormatted | undefined>>
}

export const CalendarGrid = ({ selectedYear, daysOff, setShowPto }: Props) => {
  const holidays = useMemo(() => getHolidaysPoland(selectedYear.getFullYear()), [selectedYear.getFullYear()]);
  const months = Array.from({ length: 12 }).map((_, index) => new Date(Date.UTC(selectedYear.getFullYear(), index, 1)));
  return (
    <Grid templateColumns={'repeat(3, 1fr)'} columnGap={3} rowGap={{base: 1, monitorM: 2}} w={'100%'} p={5}>
      {months.map((month, index) => (
        <CalendarMonth key={index} month={month} holidays={holidays} daysOff={daysOff} setShowPto={setShowPto}/>
      ))}
    </Grid>
  );
};
