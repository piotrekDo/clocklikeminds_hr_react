import { HStack, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import usePtoByUser from '../../hooks/usePtoRequestsByUser';
import useUserPtoSummary from '../../hooks/useUserPtoSummary';
import useAuthentication from '../../state/useAuthentication';
import useHttpErrorState from '../../state/useHttpErrorState';
import usePtoRequestState from '../../state/usePtoRequestState';
import { NewPtoButton } from './NewPtoButton';
import { PtoRequestSummary } from './NewPtoRequestSummary';
import { PtoDaysLeftUsedSummary } from './PtoDaysLeftUsedSummary';
import { PtoRequestHistory } from './PtoRequestHistory';
import { backgroundGradient } from '../../library';

export const PtoSummary = () => {
  const appuser = useAuthentication(s => s.appUser);
  const { isRequestingPto, setIsRequestingPto } = usePtoRequestState();
  const { data: summary, error: summaryError, isFetching } = useUserPtoSummary(appuser?.userId || -1);
  const {
    data: ptos,
    error: ptoError,
    isLoading: isLoadingPtos,
    fetchNextPage,
    isFetchingNextPage: isFetchingNextPtosPage,
    hasNextPage,
  } = usePtoByUser(appuser?.userId || -1);
  const setError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    summaryError && setError(summaryError);
    ptoError && setError(ptoError);
  }, [summaryError, ptoError]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack
        justifyContent={'center'}
        alignItems={'start'}
        fontWeight={'600'}
        w={'100%'}
        gap={5}
      >
        <VStack
          w={'100%'}
          h={'140px'}
          boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
          borderRadius={'20px'}
          transition={'background .25s ease-in'}
        >
          {!isRequestingPto && (
            <PtoDaysLeftUsedSummary
              isUserActive={appuser?.isActive || false}
              summary={summary}
              isFetching={isFetching}
            />
          )}
          {isRequestingPto && <PtoRequestSummary />}
        </VStack>
        {appuser?.isActive && <NewPtoButton />}
      </HStack>

      <VStack w={'100%'} h={'80%'} maxH={'600px'} pt={'50px'} position={'relative'}>
        <PtoRequestHistory
          isLoadingPtos={isLoadingPtos}
          isFetchingNextPtosPage={isFetchingNextPtosPage}
          hasNextPage={hasNextPage}
          ptos={ptos}
          fetchNextPage={fetchNextPage}
        />
      </VStack>
    </VStack>
  );
};
