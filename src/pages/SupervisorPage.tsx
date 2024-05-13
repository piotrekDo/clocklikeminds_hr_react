import {
  Box,
  Button,
  Flex,
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
import useEmployeeDetails from '../hooks/useEmployeeDetails';
import useEmployeePtoRequestsSimplePagination from '../hooks/useEmployeePtoRequestsSimplePagination';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import { GoPeople } from 'react-icons/go';
import { CalendarPageIcon } from '../components/general/CalendarPageIcon';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaCircleMinus } from 'react-icons/fa6';
import { FaBusinessTime } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { UnresolvedPtoCard } from '../components/supervisor/UnresolvedPtoCard';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import usePtoComparationStore from '../state/usePtoComparationState';
import { PtoCompareModal } from '../components/supervisor/PtoCompareModal';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const { pto, setPto } = usePtoComparationStore();
  const [selectedEmployee, setSelectedEmployee] = useState(-1);
  const [selectedPage, setSelectedPage] = useState(0);
  const pageSize = 2;

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

  useEffect(() => {
    refetch();
  }, [selectedPage]);

  const onCloseModal = () => {
    setPto(undefined);
  };

  return (
    <>
      <PtoCompareModal isOpen={!!pto} onClose={onCloseModal} />
      <VStack w={'100%'} h={'100%'}>
        <VStack w={'100%'}>
          <VStack w={'80%'} alignItems={'start'} justifyContent={'center'}>
            <GoPeople size={'3rem'} color='#385898' />
            <Heading>Urlopy do akceptacji</Heading>
            <Text>Lista urlopów oczekujących na rozpatrzenie</Text>
          </VStack>
          <VStack w={'80%'}
          alignItems={'start'}>
            {unresolvedPtos?.map(p => (
              <UnresolvedPtoCard key={p.id} p={p} />
            ))}
          </VStack>
        </VStack>

        {/* <VStack w={'100%'}>
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
      </VStack> */}
      </VStack>
    </>
  );
};
