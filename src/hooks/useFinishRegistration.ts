import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, FinishRegistrationRequest } from '../model/User';
import { finishRegister } from '../service/UsersHttpService';

const useFinishRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, FinishRegistrationRequest>({
    mutationFn: (request: FinishRegistrationRequest) => finishRegister(request).request,
    onSuccess: (request, response) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['employees']
      // })
      queryClient.invalidateQueries({
        queryKey: ['employee', response.appUserId]
      })
    },
  });
};

export default useFinishRegistration;
