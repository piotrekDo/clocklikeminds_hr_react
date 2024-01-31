import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  HStack,
  VStack,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from '@chakra-ui/react';
import { PtoSummary } from '../components/PtoSummary';
import { Calendar } from '../components/Calendar/Calendar';

export const TimeOff = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'space-around'}>
      <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nowy wniosek urlopowy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <InputGroup>
                <InputLeftAddon>Od</InputLeftAddon>
                <Input type='date' />
              </InputGroup>
              <InputGroup>
                <Input type='date' />
                <InputRightAddon>Do</InputRightAddon>
              </InputGroup>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack h={'100%'} justifyContent={'start'}>
        <PtoSummary onopen={onOpen} />
      </VStack>
      <Flex h={'100%'}>
        <Calendar />
      </Flex>
    </HStack>
  );
};
