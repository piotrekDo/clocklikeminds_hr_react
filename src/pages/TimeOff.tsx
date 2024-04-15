import { Text, Flex, HStack, VStack, useDisclosure, Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar } from '../components/Calendar/Calendar';
import { PtoRequestModal } from '../components/PtoRequestModal';
import { PtoSummary } from '../components/PtoSummary';
import { useState } from 'react';
import useAuthentication from '../state/useAuthentication';

export const TimeOff = () => {
  const isUserAdmin = useAuthentication(s => s.isAdmin);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminMode, setAdminMode] = useState(isUserAdmin);

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
        <HStack w={'100%'} h={'100%'} pt={'20px'} pb={'20px'} px={'30px'} justifyContent={'space-around'}>
          <VStack>
            {isUserAdmin && (
              <Flex
                onClick={() => setAdminMode(s => !s)}
                bg={'blue.100'}
                borderRadius={'20px'}
                cursor={'pointer'}
                w={'500px'}
                h={'40px'}
                overflow={'hidden'}
              >
                <Flex
                  w={'500px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexShrink={0}
                  transform={adminMode ? 'translateX(-100%)' : 'translateX(0)'}
                  transitionProperty={'transform'}
                  transitionDuration={'200ms'}
                  transitionTimingFunction={'ease-in'}
                >
                  Moje urlopy
                </Flex>
                <Flex
                  w={'500px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexShrink={0}
                  transform={adminMode ? 'translateX(-100%)' : 'translateX(0)'}
                  transitionProperty={'transform'}
                  transitionDuration={'200ms'}
                  transitionTimingFunction={'ease-in'}
                >
                  Wnioski pracowników
                </Flex>
              </Flex>
            )}
            <HStack>
              <PtoRequestModal isOpen={isOpen} onClose={onClose} />
              <VStack h={'80vh'} justifyContent={'start'}>
                <PtoSummary onopen={onOpen} />
              </VStack>
              <Flex h={'100%'}>
                <Calendar />
              </Flex>
            </HStack>
          </VStack>
        </HStack>
      </motion.div>
    </AnimatePresence>
  );
};
