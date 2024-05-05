import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PtoRequestResponse, ResolvePtoRequest } from '../model/Pto';
import { resolvePto } from '../service/PtoHttpService';

const useResolvePto = () => {
  const queryClient = useQueryClient();

  return useMutation<PtoRequestResponse, Error, ResolvePtoRequest>({
    mutationFn: (request: ResolvePtoRequest) => resolvePto(request).request,
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['ptoUnresolved'],
      });
    },
  });
};

export default useResolvePto;
