import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WithdrawResponse } from '../model/Pto';
import { withdrawTimeOffRequest } from '../service/TimeOffHttpService';

export type WithdrawParams = {
  requestId: number;
  applierNotes: string | undefined;
};

const useWithdrawTimeOffRequest = (toast: (options: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation<WithdrawResponse, Error, WithdrawParams>({
    mutationFn: ({ requestId, applierNotes }) => withdrawTimeOffRequest(requestId, applierNotes).request,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: ['ptoByUser'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ptoReqYear'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ptoSummary'],
      });
      toast({
        title: response.wasDeleted ? 'Wniosek poprawnie usunięty' : 'Wniosek oznaczony do usunięcia',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
    },
  });
};

export default useWithdrawTimeOffRequest