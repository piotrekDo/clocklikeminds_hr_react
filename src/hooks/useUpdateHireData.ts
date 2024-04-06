import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, UpdateHireDataRequest } from '../model/User';
import { updateHireData } from '../service/UsersHttpService';

const useUpdateHireData = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Employee, Error, UpdateHireDataRequest>({
      mutationFn: (request: UpdateHireDataRequest) => updateHireData(request).request,
      onSuccess: (request, response) => {
        queryClient.invalidateQueries({
          queryKey: ['employees']
        })
      },
    });
};

export default useUpdateHireData;