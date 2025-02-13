import { Box, HStack, Heading, Tooltip, Text, SkeletonText, SkeletonCircle, Stack, Skeleton } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Employee } from '../../../model/User';
import useEmployeeState from '../../../state/useEmployeesState';
import { Freelancer } from '../../badges/Freelancer';

interface Props {
  employee: Employee | undefined;
}

export const EmployeeDetailsHeading = ({ employee }: Props) => {
  const setSelectedEmployee = useEmployeeState(s => s.setSelectedEmployee);
  const setisFinishingRegistration = useEmployeeState(s => s.setIsFinisshingRegistration);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);

  const handleBackArrowClick = () => {
    setSelectedEmployee(undefined);
    setIsUpdatingEmployee(undefined);
  };

  return (
    <HStack justifyContent={'center'} w={'50vw'} position={'relative'}>
      <Box position={'absolute'} left={0} cursor={'pointer'} borderRadius={'50%'} onClick={e => handleBackArrowClick()}>
        <IoArrowBack size={'40px'} color='' />
      </Box>
      {!employee && (
        <HStack w={'80%'}>
          <SkeletonCircle size='10' />
          <Skeleton flex='1' height='5' variant='pulse' />
        </HStack>
      )}
      {employee && !employee.registrationFinished && (
        <Tooltip hasArrow placement='right' label={'Konto wymaga dokończenia rejestracji'}>
          <Box cursor={'pointer'} onClick={setisFinishingRegistration}>
            <FaExclamationCircle size={'3rem'} color='red' />
          </Box>
        </Tooltip>
      )}
      {employee && (
        <Heading display={'flex'} gap={5}>
          <Text>
            {employee.firstName} {employee.lastName}
          </Text>
          {employee?.imageUrl && (
            <Box
              w={'40px'}
              h={'40px'}
              borderRadius={'30px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              overflow={'hidden'}
            >
              <img
                src={employee.imageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy='no-referrer'
              />
            </Box>
          )}
          {employee.freelancer && <Freelancer size='3rem' />}
        </Heading>
      )}
    </HStack>
  );
};
