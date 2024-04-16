import { Badge, Flex } from '@chakra-ui/react';

export const Activebadge = () => {
  return (
    <Flex justifyContent={'center'}>
      <Badge variant={'solid'} colorScheme='green'>
        Aktywny
      </Badge>
    </Flex>
  );
};
