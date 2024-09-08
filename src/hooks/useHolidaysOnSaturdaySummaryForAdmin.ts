import { useQuery } from '@tanstack/react-query';
import { HolidayOnSaturdayAdminSummary } from '../model/Pto';
import { fetchSaturdayHolidayForAdmin } from '../service/TimeOffHttpService';

const useHolidaysOnSaturdaySummaryForAdmin = () => {
  return useQuery<HolidayOnSaturdayAdminSummary, Error>({
    queryKey: ['holidaysOnSaturdaySummaryForAdmin'],
    queryFn: () => fetchSaturdayHolidayForAdmin().request,
  });
};

export default useHolidaysOnSaturdaySummaryForAdmin;
