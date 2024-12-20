import { Badge, Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useLast10PtosByAcceptor from '../../hooks/usePtosByAcceptor';
import useHttpErrorState from '../../state/useHttpErrorState';
import { useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../../model/Pto';
import { leaveTypePolish } from '../Calendar/CalendarPtoDetails';

export const QueryShelf = () => {
  const setError = useHttpErrorState(s => s.setError);
  const [isCollasped, setIsCollapsed] = useState(true);
  const queryClient = useQueryClient();

  const {
    data: last10Requests,
    refetch: refetchLast10,
    isFetching: islast10Fetching,
    isError: isLast10Error,
    error: last10Error,
  } = useLast10PtosByAcceptor();

  useEffect(() => {
    isLast10Error && setError(last10Error);
  }, [isLast10Error]);

  const cachedData = queryClient.getQueryData<PtoRequestFormatted[]>(['ptosByAcceptor']);
  const queryState = queryClient.getQueryState(['ptosByAcceptor']);
  const cacheCreatedAt = queryState?.dataUpdatedAt ? new Date(queryState.dataUpdatedAt) : null;
  console.log(cacheCreatedAt);
  console.log(cachedData);

  return (
    <VStack
      borderRadius={'20px'}
      bg={'linear-gradient(145deg, rgba(55,87,144,1) 18%, rgba(10,110,145,1) 84%)'}
      boxShadow={'8px 8px 24px 2px rgba(60, 70, 90, 1)'}
      w={'100%'}
      h={isCollasped ? '3rem' : ''}
      overflow={'hidden'}
    >
      <HStack w={'100%'} justify={'space-between'} px={5}>
        <HStack
          color={'whiteAlpha.800'}
          textShadow='
          1px 1px 0 rgba(0, 0, 0, 0.3),  
          2px 2px 0 rgba(0, 0, 0, 0.3), 
          3px 3px 4px rgba(0, 0, 0, 0.5)'
        >
          <Text
            fontSize={'2rem'}
            fontWeight={'700'}
            w={'100%'}
            cursor={'pointer'}
            onClick={e => {
              setIsCollapsed(s => !s);
            }}
          >
            Historia wniosków
          </Text>
          <Button onClick={e => {
            refetchLast10();
            setIsCollapsed(false)
          }}>Ostatnich 10</Button>
        </HStack>
      </HStack>

      <VStack w={'100%'} p={2}>
        {islast10Fetching  && <Spinner />}
        {!islast10Fetching && cachedData &&
          cachedData.map(r => {
            const isPending = !!r.decisionDateTime == false
            const wasAccepted = !!r.wasAccepted;
            return (
              <HStack key={r.id}>
                <Badge variant={'solid'} colorScheme={isPending ? 'yellow' : wasAccepted ? 'green' : 'red'}>
                  ID: {r.id}
                </Badge>
                <Text>{r.applierFirstName}</Text>
                <Text>{r.applierLastName}</Text>
                <Text>{leaveTypePolish.get(r.leaveType)}</Text>
              </HStack>
            );
          })}
      </VStack>
    </VStack>
  );
};
