import { Box, HStack, Heading, Tooltip } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Employee } from '../../model/User';
import useEmployeeState from '../../state/useEmployeesState';

interface Props {
  employee: Employee;
}

export const EmployeeDetailsHeading = ({ employee }: Props) => {
  const setSelectedEmployee = useEmployeeState(s => s.setSelectedEmployee);
  const setisFinishingRegistration = useEmployeeState(s => s.setIsFinisshingRegistration);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);

  const handleBackArrowClick = () => {
    setSelectedEmployee(undefined);
    setIsUpdatingEmployee(undefined);
  }
  
  return (
    <HStack justifyContent={'center'} w={'50vw'} position={'relative'}>
      <Box position={'absolute'} left={0} cursor={'pointer'} onClick={e => handleBackArrowClick()}>
        <IoArrowBack size={'40px'} color='#F27CA2' />
      </Box>
      {!employee.registrationFinished && (
        <Tooltip hasArrow placement='right' label={'Konto wymaga dokończenia rejestracji'}>
          <Box cursor={'pointer'} onClick={setisFinishingRegistration}>
            <FaExclamationCircle size={'2rem'} color='red' />
          </Box>
        </Tooltip>
      )}
      <Heading>
        {employee.firstName} {employee.lastName}
      </Heading>
    </HStack>
  );
};
