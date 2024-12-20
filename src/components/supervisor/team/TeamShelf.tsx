import { Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EmployeeInfo } from '../../../model/User';
import { EmployeeCard } from './EmployeeCard';

interface Props {
  employees: EmployeeInfo[];
  isFetching: boolean;
}

export const TeamShelf = ({ employees, isFetching }: Props) => {
  const [isCollasped, setIsCollapsed] = useState(true);
  // const [isExpandedd, setIsExpanded] = useState<boolean>(false);


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
        <HStack
          color={'whiteAlpha.800'}
          textShadow='
          1px 1px 0 rgba(0, 0, 0, 0.3),  
          2px 2px 0 rgba(0, 0, 0, 0.3), 
          3px 3px 4px rgba(0, 0, 0, 0.5)'
        >
          <Text
            fontSize={'2rem'}
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
          <HStack
            ml={5}
            transform={!isFetching ? 'translateX(-50px)' : 'none'}
            opacity={!isFetching ? 0 : 1}
            transitionProperty={'opacity transform'}
            transitionDuration={'250ms'}
          >
            <Text as={'i'} fontWeight={'600'}>
              odświeżam
            </Text>
            <Spinner />
          </HStack>
        </HStack>
        {/* <Box>
          <Button onClick={e => setIsExpanded(s => !s)}>Pokaż wszystkie</Button>
        </Box> */}
      </HStack>
      <HStack
        w={'100%'}
        flexWrap={'wrap'}
        spacing={5}
        px={2}
        py={5}
        // h={!isExpandedd ? '440px' : ''}
        overflow={'hidden'}
      >
        {employees.map(e => (
          <EmployeeCard key={e.appUserId} employee={e} />
        ))}
      </HStack>
    </VStack>
  );
};
