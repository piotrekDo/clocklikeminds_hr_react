import { Flex, SimpleGrid } from '@chakra-ui/react';

export const Header = () => {
  return (
    <SimpleGrid columns={7} bg={'green.100'} w={1100}>
      <Flex justifyContent={'center'} alignItems={'center'}>
        PON
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        WTO
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        ŚRO
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        CZW
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        PIĄ
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        SOB
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        NIE
      </Flex>
    </SimpleGrid>
  );
};
