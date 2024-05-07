import { Badge, Flex } from '@chakra-ui/react';

export const Activebadge = () => {
  return (
    <Flex justifyContent={'center'} >
      <Badge variant={'solid'} colorScheme='green' as={'em'} boxShadow={'3px 3px 12px 0px rgba(66, 68, 90, 1)'}>
        Aktywny
      </Badge>
    </Flex>
  );
};
