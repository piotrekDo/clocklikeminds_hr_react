import { Button, HStack, Heading, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';
import useUserPtoSummary from '../../hooks/useUserPtoSummary';
import useAuthentication from '../../state/useAuthentication';
import { useEffect } from 'react';
import useHttpErrorState from '../../state/useHttpErrorState';
import { PtoCard } from './PtoCard';
import usePtoByUser from '../../hooks/usePtoRequestsByUser';
import React from 'react';

interface Props {
  onopen: () => void;
}

export const PtoSummary = ({ onopen }: Props) => {
  const appuser = useAuthentication(s => s.appUser);
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
      <HStack justifyContent={'center'} alignItems={'start'} fontWeight={'600'} w={'100%'} gap={5}>
        <VStack w={'100%'} minH={'140px'} bg={'#F5F4F6'} borderRadius={'20px'} p={5}>
          <Text w={'100%'} textAlign={'center'}>
            Podsumowanie
          </Text>
          {appuser?.isActive && (
            <HStack fontSize={'1.2rem'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
              <VStack spacing={0}>
                {!isFetching && summary && (
                  <Tooltip label={`W tym pozostałe z zeszłego roku ${summary.ptoDaysAccruedLastYear}`}>
                    <Text>{summary.ptoDaysAccruedLastYear + summary.ptoDaysAccruedCurrentYear}</Text>
                  </Tooltip>
                )}
                {isFetching && <Spinner />}
                <Text>Naliczone</Text>
              </VStack>
              <VStack spacing={0}>
                {!isFetching && summary && (
                  <Tooltip label={`W tym dni z ubiegłego roku ${summary.ptoDaysLeftFromLastYear}`}>
                    <Text>{summary.ptoDaysLeftFromLastYear + summary.ptoDaysLeftCurrentYear}</Text>
                  </Tooltip>
                )}
                {isFetching && <Spinner />}
                <Text>Pozostałe</Text>
              </VStack>
              <VStack spacing={0}>
                {!isFetching && summary && <Text>{summary.ptoDaysTaken}</Text>}
                {isFetching && <Spinner />}
                <Text>Wykorzystane</Text>
              </VStack>
            </HStack>
          )}
          {!appuser?.isActive && (
            <HStack fontSize={'1.2rem'} minW={'300px'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
              <Text>Konto nieaktywne</Text>
            </HStack>
          )}
        </VStack>
        {appuser?.isActive && (
          <HStack bg={'#F5F4F6'} minH={'140px'} borderRadius={'20px'} p={5} cursor={'pointer'} onClick={onopen}>
            <FaPlus />
            <Text>Nowy wniosek</Text>
          </HStack>
        )}
      </HStack>

      <VStack w={'100%'} h={'100%'} maxH={'600px'} pt={'50px'} position={'relative'}>
        {isLoadingPtos && <Spinner />}
        {!isLoadingPtos && ptos?.pages[0].content.length === 0 && <Heading>Brak historii wniosków</Heading>}

        {!isLoadingPtos && ptos && ptos?.pages[0].content.length > 0 && (
          <VStack w={'100%'} h={'100%'} overflowY={'scroll'} p={3} pb={12}>
            <Heading>Ostatnie wnioski:</Heading>
            {ptos.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.content.map((r, rIndex) => (
                  <PtoCard key={r.id} pto={r} />
                ))}
              </React.Fragment>
            ))}
            {ptos?.pages[0].content.length > 0 && (
              <Button
                isDisabled={isFetchingNextPtosPage || !hasNextPage}
                position={'absolute'}
                w={'200px'}
                bottom={5}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPtosPage ? <Spinner /> : hasNextPage ? 'Pobierz więcej' : 'To już wszystko'}
              </Button>
            )}
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};
