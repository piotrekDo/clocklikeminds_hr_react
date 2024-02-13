import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NewPtoRequestSummary } from '../model/Pto';
import { calculateBusinessDays } from './Calendar/holidays';
import { CalendarPtoForm } from './CalendarPtoForm';
import { SimplePtoForm } from './SimplePtoForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PtoRequestModal = ({ isOpen, onClose }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [ptoSummary, setPtoSummary] = useState<NewPtoRequestSummary | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  useEffect(() => {
    setPtoSummary(undefined);
    setFormError(undefined);
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setFormError('Niepoprawne daty');
    }
    startDate && endDate && !formError && setPtoSummary(calculateBusinessDays(startDate, endDate));
  }, [startDate, endDate]);

  const setStartDateHandler = (date: Date) => {
    const selectedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
    setStartDate(selectedDate);
  };

  const setEndDateHandler = (date: Date) => {
    const selectedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
    setEndDate(selectedDate);
  };

  return (
    <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <Text>Nowy wniosek urlopowy</Text>
          <FormControl display='flex' alignItems='center'>
            <FormLabel mb='0'>Pokaż kalendarz</FormLabel>
            <Switch isChecked={showCalendar} onChange={e => setShowCalendar(s => !s)} />
          </FormControl>
        </ModalHeader>
        <ModalBody>
          {!showCalendar && (
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.25 } }}
                exit={{ scale: 0.7, opacity: 0 }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <SimplePtoForm
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDateHandler}
                  setEndDate={setEndDateHandler}
                />
              </motion.div>
            </AnimatePresence>
          )}
          {showCalendar && (
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.25 } }}
                exit={{ scale: 0.7, opacity: 0 }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <CalendarPtoForm
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDateHandler}
                  setEndDate={setEndDateHandler}
                />
              </motion.div>
            </AnimatePresence>
          )}
          <Flex mt={'20px'} h={'50px'} justifyContent={'center'} alignItems={'center'}>
            {ptoSummary && !formError && (
              <Box>
                <Text>Zaznaczono {ptoSummary.businessDays} dni roboczych</Text>
              </Box>
            )}
            {formError && (
              <Box>
                <Text color={'red.400'}> {formError}</Text>
              </Box>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter display={'flex'} w={'100%'} gap={'20px'} px={'50px'}>
          <Button isDisabled={!!formError || !startDate || !endDate} colorScheme='green' w={'100%'} onClick={onClose}>
            Wyślij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
