import { Box, VStack } from '@chakra-ui/react';
import { Employee } from '../../../model/User';
import { EmployeeAccountInfo } from './EmployeeAccountInfo';
import { EmployeeContractinformation } from './EmployeeContractinformation';
import { EmployeeGeneralInformation } from './EmployeeGeneralInformation';
import { EmployeeHistory } from './EmployeeHistory';
import { EmployeeTimeOffDetails } from './EmployeeTimeOffDetails';

interface Props {
  employee: Employee | undefined;
  isFetching: boolean;
}

export const EmployeeDetails = ({ employee, isFetching }: Props) => {
  return (
    <VStack
      maxW={'1000px'}
      margin={'0 auto'}
      opacity={!isFetching && employee && employee.registrationFinished ? 1 : 0.4}
      position={'relative'}
      gap={'50px'}
    >
      {!isFetching && employee && !employee.registrationFinished && (
        <Box position={'absolute'} left={0} top={0} w={'100%'} h={'100%'} zIndex={10}></Box>
      )}
      <Box w={'100%'} mt={'20px'}>
        <EmployeeGeneralInformation employee={employee} />
      </Box>
      <Box w={'100%'}>{employee && <EmployeeContractinformation employee={employee} />}</Box>
      <Box w={'100%'}>{employee && <EmployeeTimeOffDetails employee={employee} />}</Box>
      <Box w={'100%'}>{employee && <EmployeeHistory employee={employee} />}</Box>
      <Box w={'100%'} mb={'70px'}>
        {employee && <EmployeeAccountInfo employee={employee} />}
      </Box>
    </VStack>
  );
};
