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
import { FieldValues, useForm } from 'react-hook-form';
import useNewJobPosition from '../../hooks/useNewJobPosition';
import { EmployePositionRequest } from '../../model/User';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewJobPositionModal = ({isOpen, onClose}: Props) => {
  const toast = useToast();
  const { mutate: sendRequest, isSuccess, isError, isLoading } = useNewJobPosition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Nie udało się wprowadzić nowego stanowiska',
        description: 'Sprawdź unikalność klucza',
        position: 'top-left',
        isClosable: true,
        status: 'error',
        duration: 10000,
      });
    } else if(isSuccess) {
      toast({
        title: 'Wprowadzono nowe stanowisko',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
      // onClose();
      // reset();
    }
  }, [isSuccess, isError]);


  const onSubmitHandler = (data: FieldValues) => {
    const request: EmployePositionRequest = {
      positionKey: data.key,
      displayName: data.name,
    }

    sendRequest(request);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Wprowadź nowe stanowisko
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl mb={5} isInvalid={errors && errors.key ? true : false}>
            <FormLabel>Unikalny klucz</FormLabel>
            <Input {...register('key', {required: true})}/>
            <FormErrorMessage>Uzupełnij klucz</FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={errors && errors.name ? true : false}>
            <FormLabel>Wyświetlana nazwa</FormLabel>
            <Input {...register('name', {required: true})}/>
            <FormErrorMessage>Uzupełnij nazwę</FormErrorMessage>
          </FormControl>
          <Button isLoading={isLoading} mb={10} type='submit' w={'100%'} colorScheme='green'>
              Wyślij
            </Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}
