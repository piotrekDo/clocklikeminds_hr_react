import { Flex, HStack, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from '../components/Calendar/Calendar';
import { PtoSummary } from '../components/timeoff/PtoSummary';

export const TimeOff = () => {
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
        <VStack
          w={'100%'}
          h={'100%'}
          pt={'20px'}
          pb={'20px'}
          px={'30px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <HStack w={'100%'} h={'100%'} gap={10} alignItems={'start'} justifyContent={'center'}>
            <VStack h={'100%'} w={'100%'} justifyContent={'center'} alignItems={'center'}>
              <PtoSummary />
            </VStack>
            <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Calendar />
            </Flex>
          </HStack>
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
