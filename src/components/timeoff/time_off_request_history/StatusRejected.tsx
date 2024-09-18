import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

export const StatusRejected = () => {
  return (
    <Tooltip label='Odrzucony'>
      <Flex cursor={'help'}>
        <CloseIcon fontSize={'1.2rem'} />
      </Flex>
    </Tooltip>
  );
};
