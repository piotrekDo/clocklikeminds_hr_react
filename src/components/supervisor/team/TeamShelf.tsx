import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EmployeeInfo } from '../../../model/User';
import { EmployeeCard } from './EmployeeCard';

interface Props {
  employees: EmployeeInfo[];
}

export const TeamShelf = ({ employees }: Props) => {
  const [isCollasped, setIsCollapsed] = useState(employees.length === 0);
  const [isExpandedd, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsCollapsed(employees.length === 0);
  }, [employees.length]);
  return (
    <VStack
      borderRadius={'20px'}
      bg={'linear-gradient(145deg, rgba(55,87,144,1) 18%, rgba(10,110,145,1) 84%)'}
      boxShadow={'8px 8px 24px 2px rgba(60, 70, 90, 1)'}
      w={'100%'}
      h={isCollasped ? '3rem' : ''}
      overflow={'hidden'}
    >
      <HStack w={'100%'} justify={'space-between'} px={5}>
        <Text
          fontSize={'2rem'}
          color={'whiteAlpha.800'}
          textShadow='
          1px 1px 0 rgba(0, 0, 0, 0.3),  
          2px 2px 0 rgba(0, 0, 0, 0.3), 
          3px 3px 4px rgba(0, 0, 0, 0.5)'
          fontWeight={'700'}
          w={'100%'}
          cursor={'pointer'}
          onClick={e => {
            if (employees.length === 0) return;
            setIsCollapsed(s => !s);
          }}
        >
          Zespół
        </Text>
        <Box>
          <Button onClick={e => setIsExpanded(s => !s)}>Pokaż wszystkie</Button>
        </Box>
      </HStack>
      <HStack
        w={'100%'}
        flexWrap={'wrap'}
        spacing={5}
        px={2}
        py={5}
        h={!isExpandedd ? '440px' : ''}
        overflow={'hidden'}
      >
        {employees.map(e => (
          <EmployeeCard key={e.appUserId} employee={e} />
        ))}
      </HStack>
    </VStack>
  );
};
