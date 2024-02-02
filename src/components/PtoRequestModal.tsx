import {
    Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PtoSummary } from '../model/Pto';
import { calculateBusinessDays } from './Calendar/holidays';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PtoRequestModal = ({ isOpen, onClose }: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [PtoSummary, setPtoSummary] = useState<PtoSummary | undefined>();

  useEffect(() => {
    startDate && endDate && setPtoSummary(calculateBusinessDays(startDate, endDate))
  }, [startDate, endDate]);

  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nowy wniosek urlopowy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <InputGroup>
              <InputLeftAddon>Od</InputLeftAddon>
              <Input type='date' onChange={e => setStartDate(new Date(e.target.value))} />
            </InputGroup>
            <InputGroup>
              <Input type='date' onChange={e => setEndDate(new Date(e.target.value))} />
              <InputRightAddon>Do</InputRightAddon>
            </InputGroup>
          </HStack>
          {PtoSummary && (
            <Box>
                <Text>Zaznaczono {PtoSummary.businessDays} dni roboczych</Text>
                
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
