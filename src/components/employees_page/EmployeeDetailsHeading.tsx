import { HStack, Heading, Tooltip, Box, VStack } from '@chakra-ui/react';
import { BsPersonWorkspace } from 'react-icons/bs';
import { FaExclamationCircle } from 'react-icons/fa';
import { Employee } from '../../model/User';
import { IoArrowBack } from 'react-icons/io5';
import useEmployeeState from '../../state/useEmployeesState';

interface Props {
  employee: Employee;
}

export const EmployeeDetailsHeading = ({ employee }: Props) => {
  const setSelectedEmployee = useEmployeeState(s => s.setSelectedEmployee);
  return (
    <HStack justifyContent={'center'} w={'50vw'} position={'relative'}>
      <Box position={'absolute'} left={0} cursor={'pointer'} onClick={e => setSelectedEmployee(undefined)}>
        <IoArrowBack size={'40px'} color='#F27CA2' />
      </Box>
      {!employee.active && (
        <Tooltip hasArrow placement='right' label={'Konto wymaga dokończenia rejestracji'}>
          <Box>
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
