import {
  HStack,
  Heading,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GoPeople } from 'react-icons/go';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import useEmployeePtoRequestsSimplePagination from '../../hooks/useEmployeePtoRequestsSimplePagination';
import useAuthentication from '../../state/useAuthentication';
import useHttpErrorState from '../../state/useHttpErrorState';
import { PaginationBar } from './PaginationBar';
import { ptoTypeTranslatePl } from '../../model/Pto';
import { MetaData } from '../../model/MetaData';
import { useQueryClient } from '@tanstack/react-query';
import { occasionalLeaveTranslatePL } from '../../App';
import { trimText } from '../../utils';

export const EmployeePtoHistory = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const queryClient = useQueryClient();
  const meta: MetaData | undefined = queryClient.getQueryData(['meta']);
  const [selectedEmployee, setSelectedEmployee] = useState(-1);
  const [selectedPage, setSelectedPage] = useState(0);
  const pageSize = 10;

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
    isUserDataError && setError(userDataError);
  }, [isUserDataError]);

  useEffect(() => {
    refetch();
  }, [selectedPage]);
  return (
    <VStack w={'100%'} p={5}>
      <VStack w={'80%'} alignItems={'start'} justifyContent={'center'}>
        <GoPeople size={'3rem'} color='#385898' />
        <Heading>Historia wniosków</Heading>
        <Text>Lista urlopów wg pracownika</Text>
      </VStack>
      <VStack
        w={'100%'}
        maxW={'1600px'}
        mt={5}
        px={4}
        py={10}
        borderRadius={'30px'}
        boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
        bgColor={'rgba(56, 88, 152, 0.4)'}
        color={'whiteAlpha.900'}
      >
        <HStack w={'90%'}>
          <Select
            bgColor={'rgba(56, 88, 152, 0.4)'}
            onChange={e => {
              setSelectedEmployee(+e.target.value);
            }}
          >
            <option value={-1} style={{ background: 'rgba(56, 88, 152, 0.4)' }}>
              Pobierz wnioski pracownika
            </option>
            {userData?.subordinates.map((sub, index) => (
              <option key={sub.appUserId} value={sub.appUserId} style={{ background: 'rgba(56, 88, 152, 0.4)' }}>
                {sub.firstName} {sub.lastName}
              </option>
            ))}
          </Select>
        </HStack>

        <VStack w={'100%'} minH={selectedEmployee <= 0 ? '200px' : '700px'}>
          {selectedEmployee <= 0 && <Heading mt={20}>Wybierz pracownika</Heading>}
          {selectedEmployee > 0 && (
            <>
              <TableContainer w={'90%'} minH={'500px'} p={5}>
                <Table variant='simple'>
                  <TableCaption color={'whiteAlpha.800'} fontWeight={700}>
                    Łącznie {ptosByEmployee && ptosByEmployee.totalElements} elementów
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th color={'whiteAlpha.800'}>ID</Th>
                      <Th color={'whiteAlpha.800'}>Data wniosku</Th>
                      <Th color={'whiteAlpha.800'}>Początek</Th>
                      <Th color={'whiteAlpha.800'}>Koniec</Th>
                      <Th color={'whiteAlpha.800'}>Rodzaj</Th>
                      <Th color={'whiteAlpha.800'}>Uwagi</Th>
                      <Th color={'whiteAlpha.800'} fontSize={'.7rem'}>
                        Dni <br /> roboczych
                      </Th>
                      <Th color={'whiteAlpha.800'} fontSize={'.7rem'}>
                        Dni <br /> kalendarzowych
                      </Th>
                      <Th color={'whiteAlpha.800'}>Status</Th>
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
                          <Td
                            color={
                              pto.leaveType === 'on_saturday_pto' || pto.leaveType === 'occasional_leave'
                                ? 'yellow.300'
                                : ''
                            }
                            cursor={
                              pto.leaveType === 'on_saturday_pto' || pto.leaveType === 'occasional_leave' ? 'help' : ''
                            }
                          >
                            <Tooltip
                              label={
                                pto.occasional_leaveType
                                  ? `${occasionalLeaveTranslatePL.get(pto.occasional_leaveType)}`
                                  : pto.leaveType === 'on_saturday_pto'
                                  ? `Za święto wypadające ${pto.saturday_holiday_date}`
                                  : ''
                              }
                            >
                              {ptoTypeTranslatePl.get(pto.leaveType)}
                            </Tooltip>
                          </Td>
                          <Td color={pto.applicationNotes ? 'yellow.200' : ''}>
                            <Tooltip label={pto.applicationNotes}>{pto.applicationNotes ? trimText(pto.applicationNotes, 10) : 'Brak'}</Tooltip>
                          </Td>
                          <Td>{pto.businessDays}</Td>
                          <Td>{pto.totalDays}</Td>
                          <Tooltip
                            label={
                              pto.wasAccepted
                                ? `Zaakceptowany: ${pto.decisionDateTime}`
                                : !pto.pending && !pto.wasAccepted
                                ? `Odrzucony: ${pto.decisionDateTime} 
                          Powód: ${(pto.declineReason && pto.declineReason) || 'brak'}`
                                : ''
                            }
                          >
                            <Td py={0}>{pto.pending ? 'Oczekuje' : pto.wasAccepted ? 'Zaakceptowany' : 'Odrzucony'}</Td>
                          </Tooltip>
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
            </>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};
