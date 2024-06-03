import { useQuery } from '@tanstack/react-query';
import { fetchSaturdayHolidayForAdmin } from '../service/PtoHttpService';
import { HolidayOnSaturdayAdminSummary } from '../model/Pto';


const useHolidaysOnSaturdaySummaryForAdmin = () => {
  return useQuery<HolidayOnSaturdayAdminSummary, Error>({
    queryKey: ['holidaysOnSaturdaySummaryForAdmin'],
    queryFn: () => fetchSaturdayHolidayForAdmin().request,
  });
};

export default useHolidaysOnSaturdaySummaryForAdmin;