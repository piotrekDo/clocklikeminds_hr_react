import {
  Box,
  Button,
  HStack,
  Heading,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PaginationBar } from '../components/supervisor/PaginationBar';
import { PtoToAcceptCard } from '../components/supervisor/PtoToAcceptCard';
import useEmployeeDetails from '../hooks/useEmployeeDetails';
import useEmployeePtoRequestsSimplePagination from '../hooks/useEmployeePtoRequestsSimplePagination';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';

export const SupervisorPage = () => {
  // const [ptosToAccept, setPtosToAccept] = useState<PtoRequestFormatted[]>([]);
  // const {
  //   data: supervisor,
  //   isFetching: isSupervisorFetching,
  //   isError: isSupervisorFetchingError,
  // } = useEmployeeDetails(appUser?.userId || -1);
  // const {
  //   data: ptosByAcceptor,
  //   isFetching: isPtosFetching,
  //   isLoading: isPtosLoading,
  //   isError: isPtosFetchingError,
  //   refetch: refetchPtos,
  // } = usePtosByAcceptor(appUser?.userId || -1);

  // useEffect(() => {
  //   const ptosToAccept = (ptosByAcceptor && ptosByAcceptor?.filter(p => !p.decisionDateTime)) || [];
  //   setPtosToAccept(ptosToAccept);
  // }, [ptosByAcceptor]);

  // return (
  //   <VStack w={'100%'} h={'100%'}>
  //     <Calendar ptos={ptosByAcceptor?.sort((x,y) => x.ptoStart.getTime() - y.ptoEnd.getTime()) || []}/>
  //   </VStack>
  // );

  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const [selectedEmployee, setSelectedEmployee] = useState(-1);
  const [selectedPage, setSelectedPage] = useState(0);
  const pageSize = 10;

  const {
    data: unresolvedPtos,
    isFetching: isUnresolvedPtosFetching,
    isLoading: isUnresolvedPtosLoading,
    isError: isUnresolvedPtosError,
    error: unresolvedPtosError,
  } = useUnresolvedPtosByAcceptor(appUser?.userId || -1);
  const {
    data: userData,
    isFetching: isUserDataFetching,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
  } = useEmployeeDetails(appUser?.userId || -1);
  const {
    data: ptosByEmployee,
    error: ptosByEmployeeError,
    isLoading: isLoadingPtosByEmployee,
    refetch,
  } = useEmployeePtoRequestsSimplePagination(selectedEmployee, selectedPage, pageSize);

  useEffect(() => {
    isUnresolvedPtosError && setError(unresolvedPtosError);
    isUserDataError && setError(userDataError);
  }, [isUnresolvedPtosError, isUserDataError]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <VStack w={'90%'} p={5} minH={'300px'} maxH={'600px'} alignItems={'start'} overflowY={'scroll'}>
        <Heading textAlign={'left'}>Wnioski do rozpatrzenia</Heading>
        <VStack>
          {isUnresolvedPtosFetching && <Spinner />}
          {!isUnresolvedPtosFetching && unresolvedPtos && unresolvedPtos.length === 0 && (
            <Box>
              <Text>Brak nowych wniosków</Text>
            </Box>
          )}
          {unresolvedPtos &&
            unresolvedPtos.length > 0 &&
            unresolvedPtos.map((pto, index) => <PtoToAcceptCard key={pto.id} pto={pto} />)}
        </VStack>
      </VStack>

      <VStack w={'100%'}>
        <HStack w={'90%'}>
          <Select
            placeholder='Pobierz wnioski pracownika'
            onChange={e => {
              setSelectedEmployee(+e.target.value);
            }}
          >
            {userData?.subordinates.map((sub, index) => (
              <option key={sub.appUserId} value={sub.appUserId}>
                {sub.firstName} {sub.lastName}
              </option>
            ))}
          </Select>
        </HStack>

        <TableContainer w={'90%'} minH={'500px'} p={5}>
          <Table variant='simple'>
            <TableCaption>Łącznie {ptosByEmployee && ptosByEmployee.totalElements} elementów</TableCaption>
            <Thead>
              <Tr>
                <Th>ID wniosku</Th>
                <Th>Data wniosku</Th>
                <Th>Początek</Th>
                <Th>Koniec</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ptosByEmployee?.content.map(pto => {
                const requestDate = new Date(pto.requestDateTime);
                const start = new Date(pto.ptoStart);
                const end = new Date(pto.ptoEnd);
                return (
                  <Tr key={pto.id}>
                    <Td py={2}>{pto.id}</Td>
                    <Td py={0}>
                      {requestDate.toLocaleDateString('pl-PL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Td>
                    <Td py={0}>
                      {start.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </Td>
                    <Td py={0}>
                      {end.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </Td>
                    <Td py={0}>{pto.pending ? 'Oczekuje' : pto.wasAccepted ? 'Zaakceptowany' : 'Odrzucony'}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {ptosByEmployee && ptosByEmployee.totalPages > 1 && (
          <PaginationBar
            currentPage={selectedPage}
            pages={ptosByEmployee?.totalPages || 0}
            switchPage={setSelectedPage}
          />
        )}
      </VStack>
    </VStack>
  );
};
