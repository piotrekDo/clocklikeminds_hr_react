import { Button, Heading, Spinner, VStack } from '@chakra-ui/react';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import React from 'react';
import { Page } from '../../model/Page';
import { PtoRequestResponse } from '../../model/Pto';
import { PtoCard } from './PtoCard';
import usePtoModalStore from '../../state/usePtoModalStore';
import { PtoRequestExtendedModal } from './PtoRequestExtendedModal';

interface Props {
  isLoadingPtos: boolean;
  isFetchingNextPtosPage: boolean;
  hasNextPage: boolean | undefined;
  ptos: InfiniteData<Page<PtoRequestResponse>> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Page<PtoRequestResponse>, Error>>;
}

export const PtoRequestHistory = ({
  isLoadingPtos,
  isFetchingNextPtosPage,
  hasNextPage,
  ptos,
  fetchNextPage,
}: Props) => {
  const ptoExtendedForUser = usePtoModalStore(s => s.ptoExtendedForUser);
  const setPtoExtendedForUser = usePtoModalStore(s => s.setPtoExtendedForUser);

  const onModalClose = () => {
    setPtoExtendedForUser(undefined);
  };

  return (
    <>
      <PtoRequestExtendedModal isOpen={!!ptoExtendedForUser} onClose={onModalClose} />

      {isLoadingPtos && <Spinner />}
      {!isLoadingPtos && ptos?.pages[0].content.length === 0 && <Heading>Brak historii wniosków</Heading>}

      {!isLoadingPtos && ptos && ptos?.pages[0].content.length > 0 && (
        <VStack
          w={'100%'}
          h={'100%'}
          overflowY={'scroll'}
          p={3}
          pb={12}
          style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
        >
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
    </>
  );
};
