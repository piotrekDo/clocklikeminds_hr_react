import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Switch,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsSuitcaseLg } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import useJobPostitions from '../../hooks/useJobPositions';
import { Employee, UpdateHireDataRequest } from '../../model/User';
import useEmployeeState from '../../state/useEmployeesState';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import useHttpErrorState from '../../state/useHttpErrorState';
import useUpdateHireData from '../../hooks/useUpdateHireData';

interface Props {
  employee: Employee;
}

export const EmployeeContractinformation = ({ employee }: Props) => {
  const [showDateEndInput, setShowDateEndInput] = useState(true);
  const [isHireDetailsHovering, setIsHireDetailsHovering] = useState(false);
  const isUpdatingEmployee = useEmployeeState(s => s.isUpdatingEmployee);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);

  const [positionKey, setPositionKey] = useState<undefined | string>(undefined);
  const [positionChangeDate, setPositionChangeDate] = useState<undefined | string>(undefined);
  const [workStartDate, setWorkStartDate] = useState<undefined | string>(undefined);
  const [workEndDate, setWorkEndDate] = useState<undefined | string>(undefined);

  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { data: positions } = useJobPostitions();

  const cancelUpdating = (): void => {
    setPositionKey(undefined);
    setPositionChangeDate(undefined);
    setWorkStartDate(undefined);
    setWorkEndDate(undefined);
    setIsUpdatingEmployee();
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
  }

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
    };
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

  return (
    <VStack>
      <HStack
        w={'100%'}
        maxW={'1000px'}
        margin={'0 auto'}
        justifyContent={'center'}
        alignItems={'start'}
        onMouseEnter={() => setIsHireDetailsHovering(true)}
        onMouseLeave={() => setIsHireDetailsHovering(false)}
      >
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <VStack alignItems={'start'}>
            <HStack w={'50px'} pos={'relative'} bg={'white'}>
              <BsSuitcaseLg size={'50px'} color='#F27CA2' />
              {employee.active && isUpdatingEmployee && (
                <HStack cursor={'pointer'} position={'absolute'} opacity={1} right={'-100'}>
                  <FcApprove size={'2rem'} onClick={() => handleSubmit()} />
                  <FcDisapprove size={'2rem'} onClick={() => cancelUpdating()} />
                </HStack>
              )}
              {employee.active && !isUpdatingEmployee && (
                <HStack
                  cursor={'pointer'}
                  position={'absolute'}
                  opacity={isHireDetailsHovering ? 1 : 0}
                  right={isHireDetailsHovering ? '-10' : 0}
                  transitionProperty={'right, opacity'}
                  transitionDuration={'250ms'}
                  transitionTimingFunction={'ease'}
                  onClick={() => setIsUpdatingEmployee()}
                >
                  <CiEdit size={'2rem'} />
                </HStack>
              )}
            </HStack>
            <Text as={'b'} fontSize={'1.3rem'}>
              Informacje o zatrudnieniu
            </Text>
          </VStack>
        </VStack>
        <VStack flexBasis={'100%'}>
          <VStack w={'100%'} p={5} bg={'#F4F4F4'} maxW={'400px'}>
            <FormControl>
              <FormLabel>Stanowisko</FormLabel>
              {!isUpdatingEmployee && (
                <Text border={'2px solid lightgray'} bg={'white'} borderRadius={'5px'} p={1}>
                  {(employee.position && employee.position.displayName) || 'Uzupełnij dane'}
                </Text>
              )}
              {isUpdatingEmployee && (
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
              {isUpdatingEmployee &&
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
              <Checkbox isChecked={employee.stillHired}>Nadal zatrudniony</Checkbox>
            </FormControl>
          </VStack>
        </VStack>
      </HStack>
      <HStack w={'100%'} border={'2px solid lightgray'} borderRadius={'10px'} p={5} mt={'20px'}>
        <VStack flexBasis={'100%'}>
          <Box as='b'>Data rozpoczęcia pracy</Box>
          {!isUpdatingEmployee && (
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
          {isUpdatingEmployee && (
            <Input type='date' defaultValue={employee.hireStart} onChange={e => setWorkStartDate(e.target.value)} />
          )}
        </VStack>
        <VStack flexBasis={'100%'}>
          <Box flexBasis={'100%'} as='b'>
            Data wygaśnięcia umowy:{' '}
          </Box>
          {!isUpdatingEmployee && (
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
          {isUpdatingEmployee && (
            <Flex w={'100%'} h={'100%'} justifyContent={'space-between'} alignItems={'center'}>
              {showDateEndInput && <Text>Umowa na czas nieokreślony</Text>}
              {!showDateEndInput && <Input type='date' onChange={e => setWorkEndDate(e.target.value)} />}
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
