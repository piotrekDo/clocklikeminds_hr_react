import { Button, Flex, HStack, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import useWithdrawTimeOffRequest, { WithdrawParams } from '../../hooks/useEithdrawTimeOffRequest';
import { PtoRequestFormatted, PtoRequestResponse } from '../../model/Pto';
import useHttpErrorState from '../../state/useHttpErrorState';

interface Props {
  request: PtoRequestResponse | PtoRequestFormatted;
  wasWithdrawClicked: boolean;
  isGeneratingPf: boolean;
  setWasWithdrawClicked: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
}

export const WithdrawActionButton = ({ request, wasWithdrawClicked, isGeneratingPf, setWasWithdrawClicked, closeModal }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: withdraw, isSuccess, isLoading, isError, error } = useWithdrawTimeOffRequest(toast);

  useEffect(() => {
    if (isError) {
      setError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setWasWithdrawClicked(false);
      closeModal();
    }
  }, [isSuccess]);

  const onSendWithdraw = () => {
    const notes: string | undefined = inputRef.current?.value;
    const params: WithdrawParams = {
      requestId: request.id,
      applierNotes: notes,
    };
    withdraw(params);
  };

  return (
    <HStack w={'100%'} h={'50px'} align={'center'} justify={'end'}>
      {!isLoading && (
        <>
          {!wasWithdrawClicked && (
            <Button
              isDisabled={
                (!request.wasAccepted && request.decisionDateTime != undefined) || request.wasMarkedToWithdraw || isGeneratingPf
              }
              colorScheme='red'
              onClick={() => setWasWithdrawClicked(true)}
            >
              {request.pending ? 'Wycofaj' : 'Zgłoś do wycofania'}
            </Button>
          )}
          {wasWithdrawClicked && request.pending && (
            <HStack>
              <Text fontSize={'1.3rem'} fontWeight={'600'}>
                Na pewno?
              </Text>
              <Button w={'100px'} colorScheme='red' onClick={onSendWithdraw}>
                Tak
              </Button>
              <Button w={'100px'} colorScheme='yellow' onClick={() => setWasWithdrawClicked(false)}>
                Anuluj
              </Button>
            </HStack>
          )}
          {wasWithdrawClicked && !request.pending && (
            <HStack w={'100%'} justify={'center'} align={'center'}>
              <Input ref={inputRef} placeholder='Podaj powód wycofania wniosku' w={'400px'} />
              <Button w={'100px'} colorScheme='red' onClick={onSendWithdraw}>
                Wyślij
              </Button>
              <Button w={'100px'} colorScheme='yellow' onClick={() => setWasWithdrawClicked(false)}>
                Anuluj
              </Button>
            </HStack>
          )}
        </>
      )}
      {isLoading && (
        <Flex w={'100%'} justify={'center'} align={'center'} fontSize={'1.3rem'} fontWeight={'600'}>
          <Text>Wysyłam...</Text>
          <Spinner />
        </Flex>
      )}
    </HStack>
  );
};
