import { Badge, Button, HStack, Select, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLast10PtosByAcceptor from '../../hooks/usePtosByAcceptor';
import { PtoRequestFormatted } from '../../model/Pto';
import useHttpErrorState from '../../state/useHttpErrorState';
import { leaveTypePolish } from '../Calendar/CalendarPtoDetails';
import { Freelancer } from '../badges/Freelancer';
import usePtoModalStore from '../../state/usePtoModalStore';
import { EmployeeInfo } from '../../model/User';

interface Props {
  employees: EmployeeInfo[] | undefined;
  isEmployeesFetching: boolean;
}

export const QueryShelf = ({ employees, isEmployeesFetching }: Props) => {
  const navigate = useNavigate();
  const setError = useHttpErrorState(s => s.setError);
  const [isCollasped, setIsCollapsed] = useState(true);
  const queryClient = useQueryClient();
  const setPtoExtended = usePtoModalStore(s => s.setPtoExtendedModal);

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

  const onShowCallendar = (ptoStart: Date) => {
    const date = ptoStart.getFullYear() + '-' + (ptoStart.getMonth() + 1) + '-' + ptoStart.getDate();
    navigate('/calendar?date=' + date);
  };

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
        <HStack>
          <Text
            color={'whiteAlpha.800'}
            textShadow='
                  1px 1px 0 rgba(0, 0, 0, 0.3),  
                  2px 2px 0 rgba(0, 0, 0, 0.3), 
                  3px 3px 4px rgba(0, 0, 0, 0.5)'
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
          <Button
            onClick={e => {
              refetchLast10();
              setIsCollapsed(false);
            }}
          >
            Ostatnich 10
          </Button>
        </HStack>

        <HStack color={'whiteAlpha.800'}>
          <Select defaultValue={undefined} placeholder={'Wybierz pracownika'} minW={'200px'} >
            <optgroup style={{ background: '#385898' }}>
              {employees &&
                employees.map(e => (
                  <option key={e.appUserId} value={e.appUserId}>
                    {e.firstName} {e.lastName}
                  </option>
                ))}
            </optgroup>
          </Select>
        </HStack>
      </HStack>

      <VStack w={'100%'} p={2}>
        {islast10Fetching && <Spinner />}
        {!islast10Fetching &&
          cachedData &&
          cachedData.map(r => {
            const isPending = !!r.decisionDateTime == false;
            const wasAccepted = !!r.wasAccepted;
            return (
              <HStack
                key={r.id}
                w={'100%'}
                color={'whiteAlpha.800'}
                px={10}
                _hover={{ bgColor: '#233B85' }}
                py={1}
                borderRadius={'10px'}
                onClick={() => setPtoExtended(r)}
              >
                <Badge variant={'solid'} colorScheme={isPending ? 'yellow' : wasAccepted ? 'green' : 'red'}>
                  ID: {r.id}
                </Badge>
                <HStack flex={1}>
                  <Text>{r.applierFirstName}</Text>
                  <Text>{r.applierLastName}</Text>
                  {r.applierFreelancer && <Freelancer size='' />}
                </HStack>
                <Tooltip
                  label={
                    r.leaveType === 'occasional_leave'
                      ? r.occasional_descriptionPolish
                      : r.leaveType === 'on_saturday_pto'
                      ? `${r.saturday_holiday_desc} ${r.saturday_holiday_date}`
                      : ''
                  }
                >
                  <Text flex={1}>{leaveTypePolish.get(r.leaveType)}</Text>
                </Tooltip>
                <Tooltip label='Przejdź do kalendarza'>
                  <HStack
                    flex={1}
                    onClick={event => {
                      event.stopPropagation();
                      onShowCallendar(r.ptoStart);
                    }}
                    cursor={'pointer'}
                  >
                    <Text>
                      {r.ptoStart.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {r.ptoEnd.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </Text>
                  </HStack>
                </Tooltip>
                <HStack flex={1}>
                  <Text>Dni roboczych:</Text>
                  <Text>{r.businessDays}</Text>
                  <Text ml={2}>kalendarzowych: </Text>
                  <Text>{r.totalDays}</Text>
                </HStack>
              </HStack>
            );
          })}
      </VStack>
    </VStack>
  );
};
