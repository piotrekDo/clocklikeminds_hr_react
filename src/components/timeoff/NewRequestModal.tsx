import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import usePtoRequestState from '../../state/usePtoRequestState';
import { SimplePtoForm } from './SimplePtoForm';
import useAuthentication from '../../state/useAuthentication';
import { NewPtoRequest, NewPtoRequestSummary } from '../../model/Pto';
import useNewPtoRequest from '../../hooks/useNewPtoRequest';
import useHttpErrorState from '../../state/useHttpErrorState';
import { calculateBusinessDays } from '../Calendar/holidays';

export const NewRequestModal = () => {
  const { appUser } = useAuthentication();
  const { startDate, endDate, isEndDateError, setStartDate, setEndDate, setIsRequestingPto, setIsEndDateError } =
    usePtoRequestState();
  const [summary, setSummary] = useState<NewPtoRequestSummary | undefined>(undefined);
  const { mutate: sendRequest, isSuccess, isError, error, isLoading } = useNewPtoRequest();
  const setHttpError = useHttpErrorState(s => s.setError);
  const isRequestingPto = usePtoRequestState(s => s.isRequestingPto);

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
    if (!isEndDateError && startDate && endDate) {
      setSummary(calculateBusinessDays(startDate, endDate));
    } else setSummary(undefined);
  }, [startDate, endDate, isEndDateError]);

  const handleSubmitNewPto = () => {
    if (!appUser || !startDate || !endDate) return;
    // const request: NewPtoRequest = {
    //   ptoStart: startDate.toISOString().slice(0, 10),
    //   ptoEnd: endDate.toISOString().slice(0, 10),
    //   applierId: appUser.userId,
    //   acceptorId: undefined,
    //   ptoType: 'pto_on_demand'
    // };
    // sendRequest(request);
  };

  return (
    <Modal isOpen={isRequestingPto} onClose={() => setIsRequestingPto(false)} size={'xl'}>
      <ModalOverlay />
      <ModalContent width={'1000px'}>
        <ModalHeader>Nowy wniosek urlopowy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select placeholder={'Rodzaj urlopu'} onChange={e => console.log(e.target.value)}>
            <>
              <optgroup>
                <option selected={true} value={'pto'}>
                  Urlop wypoczynkowy
                </option>
                <option value={'demand'}>Urlop wypoczynkowy na żądanie</option>
                <option value={'saturday'}>Odbiór dnia wolnego za święto wypadające w sobotę</option>
                <option value={'oaccasion'}>Urlop okolicznościowy</option>
                <option value={'child'}>Opieka nad dzieckiem</option>
              </optgroup>
            </>
          </Select>
          <SimplePtoForm isLoading={isLoading} />
          {!isEndDateError && summary && <Text>Zaznaczony okres zawiera {summary.businessDays} dni roboczych</Text>}
          {isEndDateError && <Text>{isEndDateError}</Text>}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
