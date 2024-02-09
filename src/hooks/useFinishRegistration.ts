import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRegistrationFinish } from '../model/User';
import { finishRegister } from '../service/UsersHttpService';

const useFinishRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UserRegistrationFinish) => finishRegister(request).request,
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['employees']
      })
      queryClient.invalidateQueries({
        queryKey: ['employee', response.appUserId]
      })
    },
  });
};

export default useFinishRegistration;
