import { Box, HStack, Text, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { MdOutlineWorkHistory } from 'react-icons/md';
import updatePositionHistoryData from '../../../hooks/useUpdatePositionHistoryData';
import { Employee, EmployeePositionHistory } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import { EmployeeHistoryRecordEdit } from './EmployeeHistoryRecordEdit';

interface Props {
  employee: Employee;
}

export const EmployeeHistory = ({ employee }: Props) => {
  const [isPosHistoryDetailsHovering, setIsPosHistoryDetailsHovering] = useState(false);
  const isUpdatingEmployee = useEmployeeState(s => s.isUpdatingEmployee);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);
  const [editedPosHistory, setEditedPosHistory] = useState<EmployeePositionHistory[]>(
    employee.positionHistory.map(historyItem => ({ ...historyItem }))
  );
  const toast = useToast();

  const cancelUpdating = (): void => {
    setEditedPosHistory(employee.positionHistory.map(historyItem => ({ ...historyItem })));
    setIsUpdatingEmployee(undefined);
  };

  const submitCallback = () => {
    cancelUpdating();
    toast({
      title: 'Dane zmienione',
      position: 'top-left',
      isClosable: true,
      status: 'success',
      duration: 10000,
    });
  };

  const handleSubmit = () => {
    sendRequest(editedPosHistory);
  };

  const {
    mutate: sendRequest,
    isSuccess,
    isLoading,
    isError: isUpdatingError,
    error: updatingError,
  } = updatePositionHistoryData(submitCallback, employee.appUserId);

  return (
    <VStack
      bg={'#385898'}
      color={'whiteAlpha.800'}
      alignItems={'start'}
      w={'100%'}
      p={3}
      borderRadius={'20px'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      onMouseEnter={() => setIsPosHistoryDetailsHovering(true)}
      onMouseLeave={() => setIsPosHistoryDetailsHovering(false)}
    >
      <VStack alignItems={'start'}>
        <HStack pos={'relative'}>
          <MdOutlineWorkHistory size={'50px'}/>
          {employee.registrationFinished && isUpdatingEmployee === 'posHistoryDetails' && (
            <HStack cursor={'pointer'} position={'absolute'} opacity={1} right={'-100'}>
              <FcApprove size={'2rem'} onClick={() => handleSubmit()} />
              <FcDisapprove size={'2rem'} onClick={() => cancelUpdating()} />
            </HStack>
          )}
          {employee.registrationFinished &&
            employee.positionHistory &&
            employee.positionHistory.length > 0 &&
            isUpdatingEmployee !== 'posHistoryDetails' && (
              <HStack
                cursor={'pointer'}
                position={'absolute'}
                opacity={isPosHistoryDetailsHovering ? 1 : 0}
                right={isPosHistoryDetailsHovering ? '-10' : 0}
                transitionProperty={'right, opacity'}
                transitionDuration={'250ms'}
                transitionTimingFunction={'ease'}
                onClick={() => setIsUpdatingEmployee('posHistoryDetails')}
              >
                <CiEdit size={'2rem'} />
              </HStack>
            )}
        </HStack>
        <Text as={'em'} fontWeight={'700'} fontSize={'1.3rem'}>
          Historia stanowisk
        </Text>
      </VStack>
      <VStack w={'100%'}>
        {isUpdatingEmployee !== 'posHistoryDetails' && (
          <>
            {employee.positionHistory.length === 0 && <Box>Brak historii</Box>}
            {employee.positionHistory.length > 0 &&
              employee.positionHistory.map((position, index) => {
                return (
                  <HStack key={index} w={'100%'} justifyContent={'start'} alignItems={'start'}>
                    <Box>
                      {new Date(position.startDate!).toLocaleString('pl-PL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Box>
                    <Box>{position.position.displayName}</Box>
                  </HStack>
                );
              })}
          </>
        )}
        {isUpdatingEmployee === 'posHistoryDetails' && (
          <>
            {employee.positionHistory &&
              employee.positionHistory.length > 0 &&
              employee.positionHistory.map((position, index) => (
                <EmployeeHistoryRecordEdit
                  key={index}
                  empployee={employee}
                  position={position}
                  setEditedPosHistory={setEditedPosHistory}
                />
              ))}
          </>
        )}
      </VStack>
    </VStack>
  );
};
