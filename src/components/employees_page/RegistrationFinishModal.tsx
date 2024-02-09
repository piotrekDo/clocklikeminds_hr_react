import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import useJobPostitions from '../../hooks/useJobPositions';
import { useEffect, useState } from 'react';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import useEmployeeState from '../../state/useEmployeesState';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationFinish } from '../../model/User';
import useFinishRegistration from '../../hooks/useFinishRegistration';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationFinishModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const { data: positions, refetch } = useJobPostitions();
  const { selectedEmloyee } = useEmployeeState();
  const { data: employee } = useEmployeeDetails(selectedEmloyee || -1);
  const { mutate: sendRequest, isSuccess, data } = useFinishRegistration();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen]);

  useEffect(() => {
    if (!isSuccess) return;
    toast({
      title: 'Rejestracja zakończona',
      position: 'top-left',
      isClosable: true,
      status: 'success',
      duration: 10000,
    });
    onClose();
    reset()
  }, [isSuccess]);

  const onSubmitHandler = (data: FieldValues) => {
    if (!employee) return;
    const request: UserRegistrationFinish = {
      appUserId: employee?.appUserId,
      positionKey: data.positionKey,
      hireStart: data.hireStart,
      hireEnd: (data.hireEnd && data.hireEnd) || undefined,
      ptoDaysTotal: data.ptoDaysTotal,
    };

    sendRequest(request);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {employee?.firstName} {employee?.lastName}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl mb={5} isInvalid={errors && errors.hireStart ? true : false}>
              <FormLabel>Data zatrudnienia</FormLabel>
              <Input type='date' {...register('hireStart', { required: true })} />
              <FormErrorMessage>Uzupełnij datę</FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={errors && errors.hireEnd ? true : false}>
              <FormLabel>Data końca umowy</FormLabel>
              <Input type='date' {...register('hireEnd')} />
            </FormControl>
            <FormControl mb={5} isInvalid={errors && errors.ptoDaysTotal ? true : false}>
              <FormLabel>Dni urlopu</FormLabel>
              <NumberInput>
                <NumberInputField {...register('ptoDaysTotal', { required: true, min: 0 })} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Podaj pozostałe dni urlopu</FormErrorMessage>
            </FormControl>
            <FormControl mb={10} isInvalid={errors && errors.positionKey ? true : false}>
              <Select placeholder='Stanowisko' {...register('positionKey', { required: true })}>
                {positions?.map(p => (
                  <option key={p.positionKey} value={p.positionKey}>
                    {p.displayName}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>Uzupełnij stanowisko</FormErrorMessage>
            </FormControl>
            <Button mb={10} type='submit' w={'100%'} colorScheme='green'>
              Wyślij
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};