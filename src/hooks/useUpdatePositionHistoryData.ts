import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, UpdatePositionHistoryRequest } from '../model/User';
import { updatePositionHistory } from '../service/UsersHttpService';

const updatePositionHistoryData = (callbackFn: () => void, employeeId: number) => {
    const queryClient = useQueryClient();
    return useMutation<Employee, Error, UpdatePositionHistoryRequest[]>({
        mutationFn: (request: UpdatePositionHistoryRequest[]) => updatePositionHistory(request, employeeId),
        onSuccess: (response, request) => {
          queryClient.invalidateQueries({
            queryKey: ['employee', response.appUserId],
          })
          callbackFn();
        },
      });
}

export default updatePositionHistoryData