import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee, UpdateUserPermissionRequest } from '../model/User';
import { updateUserPermission } from '../service/UsersHttpService';

const useUpdateUserPermission = (callbackFn: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, UpdateUserPermissionRequest>({
    mutationFn: (request: UpdateUserPermissionRequest) => updateUserPermission(request).request,
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['employee', response.appUserId],
      });
      callbackFn();
    },
  });
};

export default useUpdateUserPermission;
