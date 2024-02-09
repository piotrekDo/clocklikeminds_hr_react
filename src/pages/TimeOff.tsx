import {
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { Calendar } from '../components/Calendar/Calendar';
import { PtoRequestModal } from '../components/PtoRequestModal';
import { PtoSummary } from '../components/PtoSummary';
import { AnimatePresence, motion } from 'framer-motion';

export const TimeOff = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AnimatePresence>
      <motion.div
              initial={{ x: '-100px', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{
                width: '99%',
                height: '99%'
              }}
      >
      <HStack w={'100%'} h={'100%'} pt={'20px'} pb={'20px'} px={'30px'} justifyContent={'space-around'}>
      <PtoRequestModal isOpen={isOpen} onClose={onClose}/>
      <VStack h={'100%'} justifyContent={'start'}>
        <PtoSummary onopen={onOpen} />
      </VStack>
      <Flex h={'100%'}>
        <Calendar />
      </Flex>
    </HStack>
      </motion.div>
    </AnimatePresence>
  );
};
