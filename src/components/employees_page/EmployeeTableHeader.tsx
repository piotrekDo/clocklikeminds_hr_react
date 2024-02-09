import { HStack, Box, Text, VStack, Select } from '@chakra-ui/react';
import { CiFilter } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';

export const EmployeeTableHeader = () => {
  return (
    <VStack w={'100%'} bg={'#F4F4F4'} p={3}>
      {/* <HStack w={'100%'} px={5}>
        <Select placeholder='Filter' w={'100px'}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </HStack> */}
      <HStack w={'100%'} gap={0}>
        <Box flexBasis={'50%'} as='b'></Box>
        <Text flexBasis={'100%'} as='b'>
          Imię
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Nazwisko
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Stanowisko
        </Text>
        <Text flexBasis={'100%'} as='b'>
          Staż
        </Text>
        <Text flexBasis={'50%'} as='b'>
          Status
        </Text>
      </HStack>
    </VStack>
  );
};
