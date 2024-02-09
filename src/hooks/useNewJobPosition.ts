import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployePositionRequest } from '../model/User';
import { requestNewJobPosition } from '../service/PositionsHttpService';

const useNewJobPosition = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: EmployePositionRequest) => requestNewJobPosition(request).request,
        onSuccess: (request, response) => {
          queryClient.invalidateQueries({
            queryKey: ['positions']
          })
        },
      });
}

export default useNewJobPosition;