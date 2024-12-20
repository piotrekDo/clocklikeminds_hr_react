import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import useSortState from '../../../state/useSortState';

export const EmployeeTableHeader = () => {
  const {
    employeeTableSortType: sortOrder,
    setEmployeeTableSortType: setSortOrder,
    firstNameFilter,
    lastNameFilter,
    positionFilter,
    setFirstNameFilter,
    setLastNameFilter,
    setPositionFilter,
  } = useSortState();
  const [isFirstNameFiltering, setIsFirstNameFiltering] = useState(false);
  const [isLastNameFiltering, setIsLastNameFiltering] = useState(false);
  const [isPositionFiltering, setIsPositionFiltering] = useState(false);

  return (
    <VStack
      w={'100%'}
      p={3}
      borderRadius={'20px 20px 0 0'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      bg={'#385898'}
      color={'whiteAlpha.900'}
    >
      <HStack w={'100%'} gap={0}>
        <Box flexBasis={'50%'} as='b'></Box>
        <Flex flexBasis={'100%'} px={2}>
          {!isFirstNameFiltering && (
            <Box onClick={() => setIsFirstNameFiltering(true)}>
              <Text as='b'>Imię</Text>
            </Box>
          )}
          {(isFirstNameFiltering || firstNameFilter) && (
            <Box>
              <InputGroup size={'xs'}>
                <Input
                  value={firstNameFilter}
                  onChange={e => {
                    setFirstNameFilter(e.target.value);
                  }}
                />
                <InputRightAddon
                  cursor={'pointer'}
                  bg={'red'}
                  color={'white'}
                  onClick={() => {
                    setIsFirstNameFiltering(false);
                    setFirstNameFilter(undefined);
                  }}
                >
                  X
                </InputRightAddon>
              </InputGroup>
            </Box>
          )}
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
        <Flex flexBasis={'100%'} px={2}>
          {!isLastNameFiltering && (
            <Box onClick={() => setIsLastNameFiltering(true)}>
              <Text as='b'>Nazwisko</Text>
            </Box>
          )}
          {(isLastNameFiltering || lastNameFilter) && (
            <Box>
              <InputGroup size={'xs'}>
                <Input
                  value={lastNameFilter}
                  onChange={e => {
                    setLastNameFilter(e.target.value);
                  }}
                />
                <InputRightAddon
                  cursor={'pointer'}
                  bg={'red'}
                  color={'white'}
                  onClick={() => {
                    setIsLastNameFiltering(false);
                    setLastNameFilter(undefined);
                  }}
                >
                  X
                </InputRightAddon>
              </InputGroup>
            </Box>
          )}
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
        <Flex flexBasis={'100%'} px={2}>
          {!isPositionFiltering && (
            <Box onClick={() => setIsPositionFiltering(true)}>
              <Text as='b'>Stanowisko</Text>
            </Box>
          )}
          {(isPositionFiltering || positionFilter) && (
            <Box>
              <InputGroup size={'xs'}>
                <Input
                  value={positionFilter}
                  onChange={e => {
                    setPositionFilter(e.target.value);
                  }}
                />
                <InputRightAddon
                  cursor={'pointer'}
                  bg={'red'}
                  color={'white'}
                  onClick={() => {
                    setIsPositionFiltering(false);
                    setPositionFilter(undefined);
                  }}
                >
                  X
                </InputRightAddon>
              </InputGroup>
            </Box>
          )}
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
        <Flex flexBasis={'100%'} px={2}>
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
        <Flex flexBasis={'100%'} px={2}>
          <Text as='b' fontSize={'.8rem'}>Dni urlopu pozostałe</Text>
          <VStack spacing={0} ml={3}>
            <TriangleUpIcon
              opacity={sortOrder === 'daysLeftAsc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('daysLeftAsc')}
            />
            <TriangleDownIcon
              opacity={sortOrder === 'daysLeftDesc' ? 1 : 0.3}
              boxSize={'.8rem'}
              cursor={'pointer'}
              onClick={() => setSortOrder('daysLeftDesc')}
            />
          </VStack>
        </Flex>
        <Flex flexBasis={'50%'} px={2}>
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
