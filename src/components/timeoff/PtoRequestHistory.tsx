import { Spinner, Heading, VStack, Button } from '@chakra-ui/react';
import React from 'react';
import { PtoCard } from './PtoCard';
import { PtoRequestResponse } from '../../model/Pto';
import { Page } from '../../model/Page';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

interface Props {
  isLoadingPtos: boolean;
  isFetchingNextPtosPage: boolean;
  hasNextPage: boolean | undefined;
  ptos: InfiniteData<Page<PtoRequestResponse>> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Page<PtoRequestResponse>, Error>>;
}

export const PtoRequestHistory = ({ isLoadingPtos, isFetchingNextPtosPage, hasNextPage, ptos, fetchNextPage }: Props) => {
  return (
    <>
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
    </>
  );
};
