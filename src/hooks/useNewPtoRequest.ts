import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewPtoRequest, PtoRequestResponse } from '../model/Pto';
import { sendNewPtoRequest } from '../service/PtoHttpService';

const useNewPtoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<PtoRequestResponse, Error, NewPtoRequest>({
    mutationFn: (request: NewPtoRequest) => sendNewPtoRequest(request).request,
    onSuccess: (response, request) => {
      queryClient.invalidateQueries({
        queryKey: ['ptoSummary'],
      }),
        queryClient.invalidateQueries({
          queryKey: ['ptoReqYear'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['ptoByUser'],
        });
    },
  });
};

export default useNewPtoRequest;
