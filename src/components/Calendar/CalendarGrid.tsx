import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { MonthSummary, MonthSummaryFormatted, PtoRequestFormatted, RequestsForUserCalendar } from '../../model/Pto';
import { CalendarMonth } from './CalendarMonth';
import { getHolidaysPoland } from './holidays';
import { mapPtoRequestResponseToFormatted } from '../../utils';

interface Props {
  selectedYear: Date;
  daysOff: RequestsForUserCalendar | undefined;
  setShowPto: React.Dispatch<React.SetStateAction<PtoRequestFormatted | undefined>>;
}

const mapMonthSummaryToFormated = (summary: MonthSummary) => {
  const formatted: MonthSummaryFormatted = {
    monthIndexJs: summary.monthIndexJs,
    workingHours: summary.workingHours,
    hoursWorked: summary.hoursWorked,
    requests: summary.requests.map(r => mapPtoRequestResponseToFormatted(r))
  }

  return formatted;
}

export const CalendarGrid = ({ selectedYear, daysOff, setShowPto }: Props) => {
  const holidays = useMemo(() => getHolidaysPoland(selectedYear.getFullYear()), [selectedYear.getFullYear()]);
  const months = Array.from({ length: 12 }).map((_, index) => new Date(Date.UTC(selectedYear.getFullYear(), index, 1)));
  return (
    <Grid templateColumns={'repeat(3, 1fr)'} columnGap={3} rowGap={{ base: 1, monitorM: 2 }} w={'100%'} px={5} pb={2}>
        {months.map((month, index) => {
          return (
            <CalendarMonth
            key={index}
            month={month}
            holidays={holidays}
            summary={daysOff && mapMonthSummaryToFormated(daysOff.months[index]) || undefined}
            setShowPto={setShowPto}
          />
          )
        })}

      {/* {months.map((month, index) => (
        <CalendarMonth
          key={index}
          month={month}
          holidays={holidays}
          daysOff={daysOff && daysOff.months[index] || undefined}
          setShowPto={setShowPto}
        />
      ))} */}
    </Grid>
  );
};
