import { useQuery } from '@tanstack/react-query';
import { HolidayOnSaturdayAdminSummary } from '../model/Pto';
import { fetchSaturdayHolidayForAdmin } from '../service/TimeOffHttpService';

const useHolidaysOnSaturdaySummaryForAdmin = (year: number) => {
  return useQuery<HolidayOnSaturdayAdminSummary, Error>({
    queryKey: ['holidaysOnSaturdaySummaryForAdmin', year],
    queryFn: ({ signal }) => fetchSaturdayHolidayForAdmin(year, signal),
  });
};

export default useHolidaysOnSaturdaySummaryForAdmin;
