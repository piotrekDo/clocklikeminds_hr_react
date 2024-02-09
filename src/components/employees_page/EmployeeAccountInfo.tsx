import { HStack, Text, VStack } from '@chakra-ui/react';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { Employee } from '../../model/User';
import { AdminBadge } from '../AdminBadge';
import { UserBadge } from '../UserBadge';
import { Activebadge } from './Activebadge';

interface Props {
  employee: Employee;
}

export const EmployeeAccountInfo = ({ employee }: Props) => {
  return (
    <VStack w={'100%'}>
      <VStack alignItems={'start'} w={'100%'}>
        <MdOutlineManageAccounts size={'50px'} color='#F27CA2' />
        <Text as={'b'} fontSize={'1.3rem'}>
          Konto użytkownika
        </Text>
      </VStack>
      <VStack w={'100%'}>
        {employee.active && (
          <HStack w={'100%'}>
            <Activebadge />
            <Text>Konto aktywne</Text>
          </HStack>
        )}
        {employee.userRoles.map(r => r.roleName).indexOf('user') > -1 && (
          <HStack w={'100%'}>
            <UserBadge />
            <Text>Uprawnienia użytkownika</Text>
          </HStack>
        )}
        {employee.userRoles.map(r => r.roleName).indexOf('admin') > -1 && (
          <HStack w={'100%'}>
            <AdminBadge />
            <Text>Administrator systemu</Text>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};
