import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

export const StatusWithdrawn = () => {
  return (
    <Tooltip label='Wycofany'>
      <Flex cursor={'help'}>
        <DeleteIcon fontSize={'1.2rem'} />
      </Flex>
    </Tooltip>
  );
};
