import { HStack, VStack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { EmployeeInfo } from '../../model/User';
import useAuthentication from '../../state/useAuthentication';

export const QueryShelf = () => {
  const userId = useAuthentication(s => s.appUser?.userId ?? -1);
  const queryClient = useQueryClient();
  let employees = queryClient.getQueryData<EmployeeInfo[]>(['employees-by-supervisor', userId]);

  // useEffect(() => {
  //   console.log(employees)
  // }, [employees]);

  return (
    <VStack w={'100%'}>
      <HStack>

      </HStack>
    </VStack>
  )
}
