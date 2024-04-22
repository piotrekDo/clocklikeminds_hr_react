import React, { useEffect } from 'react';
import usePtoToAccept from '../hooks/usePtoToAccept';
import useAuthentication from '../state/useAuthentication';
import { HStack, VStack } from '@chakra-ui/react';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const { data: ptosToAccept, isFetching, isLoading, isError, refetch } = usePtoToAccept(appUser?.userId || -1);
  useEffect(() => {
    console.log(ptosToAccept);
  }, [ptosToAccept]);
  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack bg={'red.100'} w={'100%'} h={'100%'} flexShrink={0}></HStack>
      <HStack bg={'blue.100'} w={'100%'} h={'100%'} flexShrink={0}></HStack>
    </VStack>
  );
};
