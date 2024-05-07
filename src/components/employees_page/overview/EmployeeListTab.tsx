import { HStack, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { GoPeople } from 'react-icons/go';
import { Page } from '../../../model/Page';
import { EmployeeBasic } from '../../../model/User';
import { EmployeeTable } from './EmployeeTable';

interface Props {
  employees: Page<EmployeeBasic> | undefined;
  pendingRegistration: number | undefined;
  isEmployeesFetching: boolean;
}

export const EmployeeListTab = ({ employees, isEmployeesFetching, pendingRegistration }: Props) => {
  return (
    <VStack w={'100%'} h={'100%'} >
      <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
        <HStack w={'80%'} justifyContent={'space-around'}>
          <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
            <GoPeople size={'3rem'} color='#385898' />
            <Heading>Pracownicy</Heading>
            <Text>Lista pracowników</Text>
          </VStack>
          <HStack as='b' w={'40%'}>
            {!isEmployeesFetching && employees && <Text>{pendingRegistration}</Text>}
            {isEmployeesFetching && <Spinner />}
            <Text>oczekujących na dokończenie rejestracji</Text>
          </HStack>
        </HStack>
        {!isEmployeesFetching && employees && <EmployeeTable employees={employees.content || []} />}
        {isEmployeesFetching && <Spinner />}
      </VStack>
    </VStack>
  );
};
