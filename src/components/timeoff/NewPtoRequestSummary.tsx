import { Button, Heading, VStack, Text, HStack } from '@chakra-ui/react';
import usePtoRequestState from '../../state/usePtoRequestState';
import { SimplePtoForm } from './SimplePtoForm';
import { calculateBusinessDays } from '../Calendar/holidays';
import { useEffect, useState } from 'react';
import { NewPtoRequest, NewPtoRequestSummary } from '../../model/Pto';
import useNewPtoRequest from '../../hooks/useNewPtoRequest';
import useAuthentication from '../../state/useAuthentication';
import useHttpErrorState from '../../state/useHttpErrorState';

export const PtoRequestSummary = () => {
  const { appUser } = useAuthentication();
  const { startDate, endDate, setStartDate, setEndDate, setIsRequestingPto } = usePtoRequestState();
  const [summary, setSummary] = useState<NewPtoRequestSummary | undefined>(undefined);
  const { mutate: sendRequest, isSuccess, isError, error } = useNewPtoRequest();
  const setHttpError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    if (isSuccess) {
      setStartDate(undefined);
      setEndDate(undefined);
      setIsRequestingPto(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    isError && setHttpError(error);
  }, [isError]);

  useEffect(() => {
    if (startDate && endDate) {
      setSummary(calculateBusinessDays(startDate, endDate));
    } else setSummary(undefined);
  }, [startDate, endDate]);

  const handleSubmitNewPto = () => {
    if (!appUser || !startDate || !endDate) return;
    const options = { timeZone: 'Europe/Warsaw' };
    const request: NewPtoRequest = {
      ptoStart: startDate.toLocaleString('sv', options).slice(0, 10),
      ptoEnd: endDate.toLocaleString('sv', options).slice(0, 10),
      applierId: appUser.userId,
      acceptorId: undefined,
    };
    sendRequest(request);
  };

  return (
    <VStack p={6} h={'100%'} w={'100%'} position={'relative'}>
      <Heading fontSize={'1rem'}>Nowy wniosek urlopowy</Heading>
      <SimplePtoForm />
      {summary && <Text>Zaznaczony okres zawiera {summary.businessDays} dni roboczych</Text>}
      <Button colorScheme='green' position={'absolute'} top={'-15px'} onClick={handleSubmitNewPto}>
        Wyślij wniosek
      </Button>
      <HStack zIndex={10} h={'50px'} w={'50%'} justifyContent={'space-between'} position={'absolute'} bottom={'-40px'}>
        <Button
          w={'150px'}
          colorScheme='yellow'
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
            setIsRequestingPto(false);
          }}
        >
          Anuluj
        </Button>
        <Button
          w={'150px'}
          colorScheme='teal'
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
          }}
        >
          Wyczyść
        </Button>
      </HStack>
    </VStack>
  );
};
