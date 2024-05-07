import { HStack, Input, Text, Tooltip, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { LuPalmtree } from 'react-icons/lu';
import useUpdateHolidayData from '../../../hooks/useUpdateHolidayData';
import { Employee, UpdateHolidayDataRequest } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import useHttpErrorState from '../../../state/useHttpErrorState';

interface Props {
  employee: Employee;
}

export const EmployeeTimeOffDetails = ({ employee }: Props) => {
  const isUpdatingEmployee = useEmployeeState(s => s.isUpdatingEmployee);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);
  const [isHolidayDetailsHovering, setIsHolidayDetailsHovering] = useState(false);

  const [ptoDaysCurrentYearNewValue, setPtoDaysCurrentYearNewValue] = useState<number | undefined>(
    employee.ptoDaysAccruedCurrentYear + employee.ptoDaysAccruedLastYear
  );
  const [ptoDaysAcquiredLastYearNewValue, setPtoDaysAcquiredLastYearNewValue] = useState<number | undefined>(
    employee.ptoDaysAccruedLastYear
  );

  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);

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
  } = useUpdateHolidayData(submitCallback);

  const cancelUpdating = (): void => {
    setPtoDaysCurrentYearNewValue(undefined);
    setPtoDaysAcquiredLastYearNewValue(undefined);
    setIsUpdatingEmployee(undefined);
  };

  const handleSubmit = () => {
    if (!ptoDaysCurrentYearNewValue && !ptoDaysAcquiredLastYearNewValue) {
      cancelUpdating();
      return;
    }

    const request: UpdateHolidayDataRequest = {
      appUserId: employee.appUserId,
      ptoTotalDaysNewValue: ptoDaysCurrentYearNewValue,
      ptoDaysAcquiredLastYearNewValue: ptoDaysAcquiredLastYearNewValue,
    };

    sendRequest(request);
  };

  useEffect(() => {
    isUpdatingError && setError(updatingError);
  }, [isUpdatingError]);

  return (
    <VStack
      alignItems={'start'}
      p={3}
      borderRadius={'20px'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      onMouseEnter={() => setIsHolidayDetailsHovering(true)}
      onMouseLeave={() => setIsHolidayDetailsHovering(false)}
    >
      <HStack w={'100%'} maxW={'1000px'}>
        <VStack alignItems={'start'}>
          <HStack w={'50px'} pos={'relative'}>
            <LuPalmtree size={'50px'} color='#385898' />
            {employee.registrationFinished && isUpdatingEmployee === 'holidayDetails' && (
              <HStack cursor={'pointer'} position={'absolute'} opacity={1} right={'-100'}>
                <FcApprove size={'2rem'} onClick={() => handleSubmit()} />
                <FcDisapprove size={'2rem'} onClick={() => cancelUpdating()} />
              </HStack>
            )}
            {employee.registrationFinished && isUpdatingEmployee !== 'holidayDetails' && (
              <HStack
                cursor={'pointer'}
                position={'absolute'}
                opacity={isHolidayDetailsHovering ? 1 : 0}
                right={isHolidayDetailsHovering ? '-10' : 0}
                transitionProperty={'right, opacity'}
                transitionDuration={'250ms'}
                transitionTimingFunction={'ease'}
                onClick={() => setIsUpdatingEmployee('holidayDetails')}
              >
                <CiEdit size={'2rem'} />
              </HStack>
            )}
          </HStack>
          <Text as={'em'} fontWeight={'700'} fontSize={'1.3rem'}>
            Informacje o urlopie
          </Text>
        </VStack>
      </HStack>
      <HStack w={'100%'} border={'2px solid #385898'} borderRadius={'10px'} p={5} mt={'20px'} boxShadow={'3px 3px 12px 0px rgba(66, 68, 90, 1)'}>
        <VStack flexBasis={'100%'}>
          <HStack w={'100%'}>
            <Text flexBasis={'100%'} as={'b'}>
              Dni naliczone:
            </Text>
            {isUpdatingEmployee !== 'holidayDetails' && (
              <Text flexBasis={'50%'}>{employee.ptoDaysAccruedCurrentYear + employee.ptoDaysAccruedLastYear}</Text>
            )}
            {isUpdatingEmployee === 'holidayDetails' && (
              <Input
                size='xs'
                min={0}
                maxW={'80px'}
                type='number'
                defaultValue={employee.ptoDaysAccruedCurrentYear + employee.ptoDaysAccruedLastYear}
                onChange={e => setPtoDaysCurrentYearNewValue(+e.target.value)}
              />
            )}
          </HStack>
          <Tooltip label='Dni niewykorzystane w ubiegłym roku, dodane do puli urlopów w roku bieżącym. Wykorzystywane w pierwszej kolejności.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'} fontSize={'.8rem'}>
                W tym z ubiegłego roku:
              </Text>
              {isUpdatingEmployee !== 'holidayDetails' && (
                <Text flexBasis={'50%'}>{employee.ptoDaysAccruedLastYear}</Text>
              )}
              {isUpdatingEmployee === 'holidayDetails' && (
                <Input
                  size='xs'
                  min={0}
                  maxW={'80px'}
                  type='number'
                  defaultValue={employee.ptoDaysAccruedLastYear}
                  onChange={e => setPtoDaysAcquiredLastYearNewValue(+e.target.value)}
                />
              )}
            </HStack>
          </Tooltip>
        </VStack>
        <VStack flexBasis={'100%'} alignItems={'start'}>
          <Tooltip label='Suma dni wykorzystanych w bieżacym roku. Wliczono wykorzystane dni pozostałe z roku ubiegłego.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'}>
                Dni wykorzystane:
              </Text>
              <Text flexBasis={'50%'}>{employee.ptoDaysTaken}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label='Niewykorzystane dni, pozostałe z ubiegłego roku i zalegające do wykorzystania. Naliczne w pierwszej kolejności. Wliczone do dni wykorzystanych.'>
            <HStack w={'100%'} cursor={'help'}>
              <Text flexBasis={'100%'} as={'b'} fontSize={'.8rem'}>
                Pozostałe z ubiegłego roku:
              </Text>
              <Text flexBasis={'50%'}>{employee.ptoDaysLeftFromLastYear}</Text>
            </HStack>
          </Tooltip>
        </VStack>
      </HStack>
    </VStack>
  );
};
