import { useQuery } from '@tanstack/react-query';
import { HolidayOnSaturdayByUser, HolidayOnSaturdayByUserFormatted, PtoRequestFormatted } from '../model/Pto';
import { fetchSaturDayOnHolidayByUsers } from '../service/TimeOffHttpService';

const useHolidayOnSaturdayByUsers = (holidayId: number, supervisorId: number) => {
  return useQuery<HolidayOnSaturdayByUserFormatted[], Error>({
    queryKey: ['holidaySaturdayByUsers', holidayId, supervisorId],
    queryFn: ({ signal }) =>
      fetchSaturDayOnHolidayByUsers(holidayId, supervisorId, signal).then(response =>
        response.data.map(data => {
          const ptoFormatted = getPtoFormatted(data);
          return {
            ...data,
            pto: ptoFormatted,
          };
        })
      ),
    enabled: holidayId > -1,
  });
};

export default useHolidayOnSaturdayByUsers;

const getPtoFormatted = (data: HolidayOnSaturdayByUser): PtoRequestFormatted | undefined => {
  if (!data.pto) return undefined;
  const ptoFormatted: PtoRequestFormatted = {
    ...data.pto,
    requestDateTime: data.pto && data.pto.requestDateTime ? new Date(data.pto.requestDateTime) : new Date(),
    ptoStart: data.pto && data.pto.ptoStart ? new Date(data.pto.ptoStart) : new Date(),
    ptoEnd: data.pto && data.pto.ptoEnd ? new Date(data.pto.ptoEnd) : new Date(),
    decisionDateTime: data.pto && data.pto.decisionDateTime ? new Date(data.pto.decisionDateTime) : undefined,
    withdrawnDateTime: data.pto && data.pto.withdrawnDateTime ? new Date(data.pto.withdrawnDateTime) : undefined,
  };
  return ptoFormatted;
};
