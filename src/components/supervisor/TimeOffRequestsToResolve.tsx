import { VStack, HStack, Heading, Spinner, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { GoPeople } from 'react-icons/go';
import { UnresolvedPtoCard } from './UnresolvedPtoCard';
import { PtoRequestFormatted } from '../../model/Pto';

interface Props {
  unresolvedPtos: PtoRequestFormatted[] | undefined;
  isUnresolvedPtosFetching: boolean;
  isUnresolvedPtosLoading: boolean;
}

export const TimeOffRequestsToResolve = ({
  unresolvedPtos,
  isUnresolvedPtosFetching,
  isUnresolvedPtosLoading,
}: Props) => {
  return (
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
  );
};
