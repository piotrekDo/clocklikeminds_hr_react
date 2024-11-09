import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useEmployeeDetails from '../../../hooks/useEmployeeDetails';
import useFinishRegistration from '../../../hooks/useFinishRegistration';
import useJobPostitions from '../../../hooks/useJobPositions';
import { FinishRegistrationRequest } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import useHttpErrorState from '../../../state/useHttpErrorState';
import useSupervisors from '../../../hooks/useSupervisors';
import useThemeState from '../../../state/useThemeState';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationFinishModal = ({ isOpen, onClose }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { data: positions, refetch: refetchPositions } = useJobPostitions();
  const { data: supervisors, refetch: refetchSupervisors } = useSupervisors();
  const { selectedEmloyee } = useEmployeeState();
  const { data: employee, isError: isUseEmplError, error: useEmpError } = useEmployeeDetails(selectedEmloyee || -1);
  const {
    mutate: sendRequest,
    isSuccess,
    isLoading,
    isError: isRegistrationError,
    error: registrationError,
  } = useFinishRegistration();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    isUseEmplError && setError(useEmpError);
    isRegistrationError && setError(registrationError);
  }, [isUseEmplError, isRegistrationError]);

  useEffect(() => {
    if (isOpen) {
      refetchPositions();
      refetchSupervisors();
    }
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
    reset();
  }, [isSuccess]);

  const onSubmitHandler = (data: FieldValues) => {
    if (!employee) return;
    const request: FinishRegistrationRequest = {
      appUserId: employee?.appUserId,
      isFreelancer: data.freelancer,
      positionKey: data.positionKey,
      hireStart: data.hireStart,
      hireEnd: (data.hireEnd && data.hireEnd) || undefined,
      ptoDaysTotal: data.ptoDaysTotal,
      stillHired: true,
      supervisorId: data.supervisorId,
    };

    sendRequest(request);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={theme.bg} color={theme.fontColor}>
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
            <FormControl mb={5} isInvalid={errors && errors.freelancer ? true : false}>
              <FormLabel>Freelancer</FormLabel>
              <RadioGroup>
                <HStack>
                  <Radio value='false' {...register('freelancer', { required: true })}>
                    Nie
                  </Radio>
                  <Radio value='true' {...register('freelancer', { required: true })}>
                    Tak
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormErrorMessage>Wybierz</FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={errors && errors.ptoDaysTotal ? true : false}>
              <FormLabel>Dni urlopu</FormLabel>
              <NumberInput min={0}>
                <NumberInputField {...register('ptoDaysTotal', { required: true, min: 0 })} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Podaj pozostałe dni urlopu</FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={errors && errors.positionKey ? true : false}>
              <Select
                placeholder='Stanowisko'
                {...register('positionKey', { required: true })}
                sx={{
                  '> option': {
                    background: theme.elementBg,
                    color: theme.fontColor,
                  },
                }}
              >
                {positions?.map(p => (
                  <option
                    key={p.positionKey}
                    value={p.positionKey}
                    style={{
                      backgroundColor: theme.elementBg,
                    }}
                  >
                    {p.displayName}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>Uzupełnij stanowisko</FormErrorMessage>
            </FormControl>

            <FormControl mb={10} isInvalid={errors && errors.supervisorId ? true : false}>
              <Select
                placeholder='Przełożony'
                {...register('supervisorId', { required: true })}
                sx={{
                  '> option': {
                    background: theme.elementBg,
                    color: theme.fontColor,
                  },
                }}
              >
                {supervisors?.map(s => (
                  <option
                    key={s.appUserId}
                    value={s.appUserId}
                    style={{
                      backgroundColor: theme.elementBg,
                    }}
                  >
                    {`${s.firstName} ${s.lastName}`}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>Wybierz przełożonego</FormErrorMessage>
            </FormControl>

            <Button isLoading={isLoading} mb={10} type='submit' w={'100%'} colorScheme='green'>
              Wyślij
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
