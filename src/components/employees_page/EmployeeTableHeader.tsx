import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import useSortState from '../../state/useSortState';

export const EmployeeTableHeader = () => {
  const { employeeTableSortType: sortOrder, setEmployeeTableSortType: setSortOrder } = useSortState();
  return (
    <VStack w={'100%'} bg={'#F4F4F4'} p={3}>
      <HStack w={'100%'} gap={0}>
        <Box flexBasis={'50%'} as='b'></Box>
        <Flex flexBasis={'100%'}>
          <Text as='b'>Imię</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'firstNameAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('firstNameAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'firstNameDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('firstNameDesc')}
            />
          </VStack>
        </Flex>
        <Flex flexBasis={'100%'}>
          <Text as='b'>Nazwisko</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'lastNameAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('lastNameAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'lastNameDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('lastNameDesc')}
            />
          </VStack>
        </Flex>
        <Flex flexBasis={'100%'}>
          <Text as='b'>Stanowisko</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'positionAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('positionAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'positionDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('positionDesc')}
            />
          </VStack>
        </Flex>
        <Flex flexBasis={'100%'}>
          <Text as='b'>Staż</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'seniorityAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('seniorityAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'seniorityDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('seniorityDesc')}
            />
          </VStack>
        </Flex>
        <Flex flexBasis={'50%'}>
          <Text as='b'>Status</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'statusAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('statusAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'statusDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('statusDesc')}
            />
          </VStack>
        </Flex>
      </HStack>
    </VStack>
  );
};
