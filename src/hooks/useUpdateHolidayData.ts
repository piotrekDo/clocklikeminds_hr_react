import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, UpdateHolidayDataRequest } from '../model/User';
import { updateHolidayData } from '../service/UsersHttpService';

const useUpdateHolidayData = (callbackFn: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, UpdateHolidayDataRequest>({
    mutationFn: (request: UpdateHolidayDataRequest) => updateHolidayData(request).request,
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['employee', response.appUserId],
      });
      callbackFn();
    },
  });
};

export default useUpdateHolidayData;
