import { Button, HStack, Select, Text, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { EmployeeInfo } from '../../model/User';
import useAuthentication from '../../state/useAuthentication';
import { useState } from 'react';

export const QueryShelf = () => {
  const userId = useAuthentication(s => s.appUser?.userId ?? -1);
  const queryClient = useQueryClient();
  let employees = queryClient.getQueryData<EmployeeInfo[]>(['employees-by-supervisor', userId]);

  // useEffect(() => {
  //   console.log(employees)
  // }, [employees]);

  const [isByEmployeeHovering, setIsByEmployeeHovering] = useState(false);
  return (
    <VStack
      w={'100%'}
      borderRadius={'20px'}
      bg={'linear-gradient(145deg, rgba(55,87,144,1) 18%, rgba(10,110,145,1) 84%)'}
      boxShadow={'8px 8px 24px 2px rgba(60, 70, 90, 1)'}
      minH={'3rem'}
      color={'whiteAlpha.800'}
      fontSize={'2rem'}
      textShadow='
      1px 1px 0 rgba(0, 0, 0, 0.3),  
      2px 2px 0 rgba(0, 0, 0, 0.3), 
      3px 3px 4px rgba(0, 0, 0, 0.5)'
      fontWeight={700}
      align={'start'}
      px={5}
    >
      <HStack w={'100%'} justify={'space-between'} spacing={10}>
        <Text>Wyszukaj wnioski</Text>
        <HStack>
          <Button>Ostatnich 10</Button>
        </HStack>
      </HStack>
    </VStack>
  );
};
