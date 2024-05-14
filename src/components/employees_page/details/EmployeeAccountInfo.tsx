import { HStack, Text, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { MdOutlineManageAccounts } from 'react-icons/md';
import useUpdateUserPermission from '../../../hooks/useUpdateUserPermission';
import { Employee, UpdateUserPermissionRequest } from '../../../model/User';
import useAuthentication from '../../../state/useAuthentication';
import useEmployeeState from '../../../state/useEmployeesState';
import { Activebadge } from '../../badges/Activebadge';
import { AdminBadge } from '../../badges/AdminBadge';
import { SupervisorBadge } from '../../badges/SupervisorBadge';
import { UserBadge } from '../../badges/UserBadge';

interface Props {
  employee: Employee;
}

export const EmployeeAccountInfo = ({ employee }: Props) => {
  const currentUserId = useAuthentication(s => s.appUser?.userId);
  const [isPermissionDetailsHovering, setIsPermissionDetailsHovering] = useState(false);
  const isUpdatingEmployee = useEmployeeState(s => s.isUpdatingEmployee);
  const setIsUpdatingEmployee = useEmployeeState(s => s.setIsUpdatingEmployee);
  const toast = useToast();

  const [userHasAdminPermission, setUserHasAdminPermission] = useState(
    employee.userRoles.filter(r => r.roleName === 'admin').length > 0
  );
  const [userHasSupervisorRole, setUserHasSupervisorRole] = useState(
    employee.userRoles.filter(r => r.roleName === 'supervisor').length > 0
  );
  const [userIsActive, setUserIsActive] = useState(employee.active);

  const cancelUpdating = (): void => {
    setUserHasAdminPermission(employee.userRoles.filter(r => r.roleName === 'admin').length > 0);
    setUserIsActive(employee.active);
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
    const request: UpdateUserPermissionRequest = {
      appUserId: employee.appUserId,
      hasAdminPermission: userHasAdminPermission,
      hasSupervisorRole: userHasSupervisorRole,
      isActive: userIsActive,
    };
    sendRequest(request);
  };

  const {
    mutate: sendRequest,
    isSuccess,
    isLoading,
    isError: isUpdatingError,
    error: updatingError,
  } = useUpdateUserPermission(submitCallback);

  return (
    <VStack
      bg={'#385898'}
      color={'whiteAlpha.800'}
      w={'100%'}
      p={3}
      borderRadius={'20px'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      onMouseEnter={() => setIsPermissionDetailsHovering(true)}
      onMouseLeave={() => setIsPermissionDetailsHovering(false)}
    >
      <VStack alignItems={'start'} w={'100%'}>
        <HStack position={'relative'}>
          <MdOutlineManageAccounts size={'50px'} />
          {employee.registrationFinished && isUpdatingEmployee === 'permissionDetails' && (
            <HStack cursor={'pointer'} position={'absolute'} opacity={1} right={'-100'}>
              <FcApprove size={'2rem'} onClick={() => handleSubmit()} />
              <FcDisapprove size={'2rem'} onClick={() => cancelUpdating()} />
            </HStack>
          )}

          {employee.appUserId !== currentUserId &&
            employee.registrationFinished &&
            isUpdatingEmployee !== 'permissionDetails' && (
              <HStack
                cursor={'pointer'}
                position={'absolute'}
                opacity={isPermissionDetailsHovering ? 1 : 0}
                right={isPermissionDetailsHovering ? '-10' : 0}
                transitionProperty={'right, opacity'}
                transitionDuration={'250ms'}
                transitionTimingFunction={'ease'}
                onClick={() => setIsUpdatingEmployee('permissionDetails')}
              >
                <CiEdit size={'2rem'} />
              </HStack>
            )}
        </HStack>
        <Text as={'em'} fontWeight={'700'} fontSize={'1.3rem'}>
          Konto użytkownika
        </Text>
      </VStack>
      {isUpdatingEmployee !== 'permissionDetails' && (
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
          {employee.userRoles.map(r => r.roleName).indexOf('supervisor') > -1 && (
            <HStack w={'100%'}>
              <SupervisorBadge />
              <Text>Rola przełożonego</Text>
            </HStack>
          )}
        </VStack>
      )}
      {isUpdatingEmployee === 'permissionDetails' && (
        <VStack w={'100%'}>
          <HStack
            w={'100%'}
            cursor={'pointer'}
            opacity={userIsActive ? 1 : 0.4}
            onClick={() => setUserIsActive(s => !s)}
          >
            <Activebadge />
            <Text>Konto aktywne</Text>
          </HStack>
          <HStack w={'100%'}>
            <UserBadge />
            <Text>Uprawnienia użytkownika</Text>
          </HStack>
          <HStack
            w={'100%'}
            cursor={'pointer'}
            opacity={userHasAdminPermission ? 1 : 0.4}
            onClick={() => setUserHasAdminPermission(s => !s)}
          >
            <AdminBadge />
            <Text>Administrator systemu</Text>
          </HStack>
          <HStack
            w={'100%'}
            cursor={'pointer'}
            opacity={userHasSupervisorRole ? 1 : 0.4}
            onClick={() => setUserHasSupervisorRole(s => !s)}
          >
            <SupervisorBadge />
            <Text>Rola przełożonego</Text>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};
