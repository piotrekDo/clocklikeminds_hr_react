import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import useNewJobPosition from '../../../hooks/useNewJobPosition';
import { EmployePositionRequest } from '../../../model/User';
import useHttpErrorState from '../../../state/useHttpErrorState';
import useThemeState from '../../../state/useThemeState';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewJobPositionModal = ({ isOpen, onClose }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isSuccess, isError, error, isLoading } = useNewJobPosition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (isError) {
      setError(error);
    } else if (isSuccess) {
      toast({
        title: 'Wprowadzono nowe stanowisko',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
      onClose();
      reset();
    }
  }, [isSuccess, isError]);

  const onSubmitHandler = (data: FieldValues) => {
    const request: EmployePositionRequest = {
      positionKey: data.key,
      displayName: data.name,
    };

    sendRequest(request);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={theme.bg} color={theme.fontColor}>
        <ModalHeader>Wprowadź nowe stanowisko</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl mb={5} isInvalid={errors && errors.key ? true : false}>
              <FormLabel>Unikalny klucz</FormLabel>
              <Input {...register('key', { required: true })} />
              <FormErrorMessage>Uzupełnij klucz</FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={errors && errors.name ? true : false}>
              <FormLabel>Wyświetlana nazwa</FormLabel>
              <Input {...register('name', { required: true })} />
              <FormErrorMessage>Uzupełnij nazwę</FormErrorMessage>
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
