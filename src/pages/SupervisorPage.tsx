import { Box, Flex, HStack, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { GoPeople } from 'react-icons/go';
import { EmployeePtoHistory } from '../components/supervisor/EmployeePtoHistory';
import { PtoCompareModal } from '../components/supervisor/PtoCompareModal';
import { UnresolvedPtoCard } from '../components/supervisor/UnresolvedPtoCard';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import usePtoComparationStore from '../state/usePtoComparationState';
import { AnimatePresence, motion } from 'framer-motion';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const { pto, setPto } = usePtoComparationStore();

  const {
    data: unresolvedPtos,
    isFetching: isUnresolvedPtosFetching,
    isLoading: isUnresolvedPtosLoading,
    isError: isUnresolvedPtosError,
    error: unresolvedPtosError,
  } = useUnresolvedPtosByAcceptor(appUser?.userId || -1);

  useEffect(() => {
    isUnresolvedPtosError && setError(unresolvedPtosError);
  }, [isUnresolvedPtosError]);

  const onCloseModal = () => {
    setPto(undefined);
  };

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
        <PtoCompareModal isOpen={!!pto} onClose={onCloseModal} />
        <VStack w={'100%'} h={'100%'}>
          <VStack w={'100%'}>
            <VStack w={'80%'} alignItems={'start'} justifyContent={'center'}>
              <GoPeople size={'3rem'} color='#385898' />
              <HStack>
                <Heading>Urlopy do akceptacji</Heading>
                {isUnresolvedPtosFetching && (
                  <HStack ml={10} color={'whiteAlpha.800'} fontWeight={700}>
                    {' '}
                    <Text>Odświeżam</Text> <Spinner size={'sm'} />
                  </HStack>
                )}
              </HStack>
              <Text>Lista urlopów oczekujących na rozpatrzenie</Text>
            </VStack>
            <VStack w={'80%'} alignItems={'start'}>
              {isUnresolvedPtosLoading && (
                <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                  <Spinner size={'lg'} />
                </Flex>
              )}
              {!isUnresolvedPtosLoading && unresolvedPtos && unresolvedPtos.length === 0 && (
                <Heading mt={5} w={'100%'} as={'em'} color={'blackAlpha.600'} textAlign={'center'}>
                  Brak nowych wniosków do rozpatrzenia
                </Heading>
              )}
              {!isUnresolvedPtosLoading &&
                unresolvedPtos &&
                unresolvedPtos.length > 0 &&
                unresolvedPtos.map(p => <UnresolvedPtoCard key={p.id} p={p} />)}
            </VStack>
          </VStack>

          <Box w={'100%'} mt={20}>
            <EmployeePtoHistory />
          </Box>
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
