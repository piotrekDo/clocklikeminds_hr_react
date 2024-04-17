import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsSuitcaseLg } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import useJobPostitions from '../../../hooks/useJobPositions';
import useUpdateHireData from '../../../hooks/useUpdateHireData';
import { Employee, UpdateHireDataRequest } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import useHttpErrorState from '../../../state/useHttpErrorState';
import useSupervisors from '../../../hooks/useSupervisors';

interface Props {
  employee: Employee;
}

export const EmployeeContractinformation = ({ employee }: Props) => {
  const [showDateEndInput, setShowDateEndInput] = useState<boolean>(!employee.hireEnd);
  const [isHireDetailsHovering, setIsHireDetailsHovering] = useState(false);
  const isUpdatingEmployee = useEmployeeState(s => s.isUpdatingEmployee);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);

  const [positionKey, setPositionKey] = useState<undefined | string>(undefined);
  const [positionChangeDate, setPositionChangeDate] = useState<undefined | string>(undefined);
  const [workStartDate, setWorkStartDate] = useState<undefined | string>(undefined);
  const [workEndDate, setWorkEndDate] = useState<undefined | string>(employee.hireEnd || undefined);
  const [supervisorId, setSupervisorId] = useState<undefined | number>(employee.supervisorId);

  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { data: positions } = useJobPostitions();
  const { data: supervisors } = useSupervisors();

  const cancelUpdating = (): void => {
    setPositionKey(undefined);
    setPositionChangeDate(undefined);
    setWorkStartDate(undefined);
    setWorkEndDate(undefined);
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

  const {
    mutate: sendRequest,
    isSuccess,
    isLoading,
    isError: isUpdatingError,
    error: updatingError,
  } = useUpdateHireData(submitCallback);

  const handleSubmit = () => {
    const request: UpdateHireDataRequest = {
      appUserId: employee?.appUserId,
      positionKey: positionKey,
      positionChangeDate: positionChangeDate,
      workStartDate: workStartDate,
      workEndDate: workEndDate,
      supervisorId: supervisorId,
    };
    console.log(request)
    sendRequest(request);
  };

  useEffect(() => {
    isUpdatingError && setError(updatingError);
  }, [isUpdatingError]);

  const determineSeniority = () => {
    const years = Math.floor(employee.seniorityInMonths / 12);
    const months = (employee.seniorityInMonths - years * 12) % 12;

    if (years > 0) {
      return `${years} lat, ${months} miesięcy`;
    } else {
      return `${months} miesięcy`;
    }
  };

  const getTodayInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDefaultHireEndDate = () => {
    if (employee.hireEnd) {
      const date = new Date(employee.hireEnd);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return getTodayInput();
    }
  };

  return (
    <VStack
      w={'100%'}
      alignItems={'start'}
      onMouseEnter={() => setIsHireDetailsHovering(true)}
      onMouseLeave={() => setIsHireDetailsHovering(false)}
    >
      <HStack w={'100%'} alignItems={'start'}>
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <HStack w={'50px'} pos={'relative'} bg={'white'}>
            <BsSuitcaseLg size={'50px'} color='#F27CA2' />
            {employee.registrationFinished && isUpdatingEmployee === 'hireDetails' && (
              <HStack cursor={'pointer'} position={'absolute'} opacity={1} right={'-100'}>
                <FcApprove size={'2rem'} onClick={() => handleSubmit()} />
                <FcDisapprove size={'2rem'} onClick={() => cancelUpdating()} />
              </HStack>
            )}
            {employee.registrationFinished && isUpdatingEmployee !== 'hireDetails' && (
              <HStack
                cursor={'pointer'}
                position={'absolute'}
                opacity={isHireDetailsHovering ? 1 : 0}
                right={isHireDetailsHovering ? '-10' : 0}
                transitionProperty={'right, opacity'}
                transitionDuration={'250ms'}
                transitionTimingFunction={'ease'}
                onClick={() => setIsUpdatingEmployee('hireDetails')}
              >
                <CiEdit size={'2rem'} />
              </HStack>
            )}
          </HStack>
          <Text as={'b'} fontSize={'1.3rem'}>
            Informacje o zatrudnieniu
          </Text>
        </VStack>
        <VStack flexBasis={'100%'} alignItems={'end'}>
          <VStack w={'100%'} p={5} bg={'#F4F4F4'} maxW={'400px'}>
            <FormControl>
              <FormLabel>Stanowisko</FormLabel>
              {isUpdatingEmployee !== 'hireDetails' && (
                <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                  {(employee.position && employee.position.displayName) || 'Uzupełnij dane'}
                </Text>
              )}
              {isUpdatingEmployee === 'hireDetails' && (
                <Select
                  bg={'white'}
                  placeholder={employee.position ? '' : 'Uzupełnij dane'}
                  onChange={e => setPositionKey(e.target.value)}
                >
                  {employee.position && (
                    <>
                      <optgroup label='Obecne:'>
                        <option value={employee.position.positionKey}>{employee.position.displayName}</option>
                      </optgroup>
                      <optgroup></optgroup>
                    </>
                  )}
                  <optgroup label='---'>
                    {positions?.map(p => (
                      <option key={p.positionKey} value={p.positionKey}>
                        {p.displayName}
                      </option>
                    ))}
                  </optgroup>
                </Select>
              )}
              {isUpdatingEmployee === 'hireDetails' &&
                positionKey &&
                (!employee.position || positionKey != employee.position.positionKey) && (
                  <>
                    <FormLabel mt={2}>Zmiana od:</FormLabel>
                    <Input
                      bg={'white'}
                      type='date'
                      defaultValue={getTodayInput()}
                      onChange={e => setPositionChangeDate(e.target.value)}
                    />
                  </>
                )}
            </FormControl>
            <FormControl>
              <FormLabel>Adres e-mail</FormLabel>
              <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                {employee.userEmail}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Przełożony</FormLabel>
              {isUpdatingEmployee !== 'hireDetails' && (
                <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                  {employee.supervisorFirstName && employee.supervisorLastName
                    ? `${employee.supervisorFirstName} ${employee.supervisorLastName}`
                    : 'Uzupełnij dane'}
                </Text>
              )}
              {isUpdatingEmployee === 'hireDetails' && (
                <Select
                  bg={'white'}
                  placeholder={employee.supervisorId ? '' : 'Uzupełnij dane'}
                  onChange={e => setSupervisorId(+e.target.value)}
                >
                  {employee.supervisorId && (
                    <>
                      <optgroup label='Obecne:'>
                        <option value={employee.supervisorId}>
                          {employee.supervisorFirstName} {employee.supervisorLastName}
                        </option>
                      </optgroup>
                      <optgroup></optgroup>
                    </>
                  )}
                  <optgroup label='---'>
                    {supervisors?.map(s => (
                      <option key={s.appUserId} value={s.appUserId}>
                        {s.firstName} {s.lastName}
                      </option>
                    ))}
                  </optgroup>
                </Select>
              )}
            </FormControl>
            <FormControl>
              <Checkbox isChecked={employee.stillHired}>Nadal zatrudniony</Checkbox>
            </FormControl>
          </VStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} border={'2px solid lightgray'} borderRadius={'10px'} p={5} mt={'20px'}>
        <VStack flexBasis={'100%'}>
          <Box as='b'>Data rozpoczęcia pracy</Box>
          {isUpdatingEmployee !== 'hireDetails' && (
            <Box flexBasis={'100%'}>
              {(employee.hireStart &&
                new Date(employee.hireStart).toLocaleString('pl-PL', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })) ||
                'Uzupełnij dane'}
            </Box>
          )}
          {isUpdatingEmployee === 'hireDetails' && (
            <Input type='date' defaultValue={employee.hireStart} onChange={e => setWorkStartDate(e.target.value)} />
          )}
        </VStack>
        <VStack flexBasis={'100%'}>
          <Box flexBasis={'100%'} as='b'>
            Data wygaśnięcia umowy:{' '}
          </Box>
          {isUpdatingEmployee !== 'hireDetails' && (
            <Box flexBasis={'100%'}>
              {employee.hireStart &&
                employee.hireEnd &&
                new Date(employee.hireEnd).toLocaleString('pl-PL', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              {employee.hireStart && !employee.hireEnd && 'Umowa na czas nieokreślony'}
              {!employee.hireStart && !employee.hireEnd && 'Uzupełnij dane'}
            </Box>
          )}
          {isUpdatingEmployee === 'hireDetails' && (
            <Flex w={'100%'} h={'100%'} justifyContent={'space-between'} alignItems={'center'}>
              {showDateEndInput && <Text>Umowa na czas nieokreślony</Text>}
              {!showDateEndInput && (
                <Input
                  type='date'
                  defaultValue={getDefaultHireEndDate()}
                  onChange={e => setWorkEndDate(e.target.value)}
                />
              )}
              <VStack>
                <TriangleUpIcon cursor={'pointer'} onClick={() => setShowDateEndInput(data => !data)} />
                <TriangleDownIcon cursor={'pointer'} onClick={() => setShowDateEndInput(data => !data)} />
              </VStack>
            </Flex>
          )}
        </VStack>
        <VStack flexBasis={'100%'}>
          <Box as='b'>Staż</Box>
          <Box>{determineSeniority()}</Box>
        </VStack>
      </HStack>
    </VStack>
  );
};
