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
import { PtoRequestModal } from '../components/PtoRequestModal';

export const TimeOff = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'space-around'}>
      <PtoRequestModal isOpen={isOpen} onClose={onClose}/>
      <VStack h={'100%'} justifyContent={'start'}>
        <PtoSummary onopen={onOpen} />
      </VStack>
      <Flex h={'100%'}>
        <Calendar />
      </Flex>
    </HStack>
  );
};
