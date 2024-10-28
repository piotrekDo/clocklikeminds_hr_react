import { VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from '../components/supervisor/time_off_calendar/Calendar';

export const PtoCalendar = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '99%',
          height: '99%',
        }}
      >
        <VStack w={'100%'} h={'100%'} p={5}>
          <Calendar />
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
