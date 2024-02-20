import { Box, Button, HStack, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { GoPeople, GoPlus } from 'react-icons/go';
import { EmployeePosition } from '../../model/User';
import { PositionsTable } from './PositionsTable';

interface Props {
  positions: EmployeePosition[] | undefined;
  isPositionsFetching: boolean;
  handleModalToggle: () => void;
}

export const PositionsListTab = ({ positions, isPositionsFetching, handleModalToggle }: Props) => {
  return (
    <VStack w={'100%'} h={'100%'}>
      <VStack w={'100%'} h={'100%'} pt={'80px'} pb={'20px'} px={'30px'} justifyContent={'start'} gap={'50px'}>
        <HStack w={'80%'} justifyContent={'space-around'}>
          <VStack alignItems={'start'} justifyContent={'center'} w={'50%'}>
            <GoPeople size={'3rem'} color='#F27CA2' />
            <Heading>Stanowiska</Heading>
            <Text>Lista stanowisk</Text>
          </VStack>
          <Box w={'40%'} onClick={handleModalToggle}>
            <Button w={'100%'} maxW={'200px'} h={'80px'}>
              <GoPlus size={'40px'} />
              <Text fontSize={'1.5rem'} as={'b'}>
                Dodaj nowe
              </Text>
            </Button>
          </Box>
        </HStack>
        {!isPositionsFetching && positions && <PositionsTable positions={positions} />}
        {isPositionsFetching && <Spinner />}
      </VStack>
    </VStack>
  );
};
