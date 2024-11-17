import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployePositionRequest, EmployeePosition } from '../model/User';
import { requestNewJobPosition } from '../service/PositionsHttpService';

const useNewJobPosition = () => {
  const queryClient = useQueryClient();

  return useMutation<EmployeePosition, Error, EmployePositionRequest>({
    mutationFn: (request: EmployePositionRequest) => requestNewJobPosition(request),
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['positions'],
      });
    },
  });
};

export default useNewJobPosition;
