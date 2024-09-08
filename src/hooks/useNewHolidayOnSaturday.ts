import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HolidayOnSaturday } from '../model/Pto';
import { requestNewHolidayOnSaturday } from '../service/TimeOffHttpService';

const useNewHolidayOnSaturday = () => {
    const queryClient = useQueryClient();

    return useMutation<HolidayOnSaturday, Error, HolidayOnSaturday>({
        mutationFn: (request: HolidayOnSaturday) => requestNewHolidayOnSaturday(request).request,
        onSuccess: (request, response) => {
          queryClient.invalidateQueries({
            queryKey: ['holidaysOnSaturdaySummaryForAdmin']
          })
        },
      });
}

export default useNewHolidayOnSaturday;