import { CheckIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

export const StatusAccepted = () => {
  return (
    <Tooltip label='Zaakceptowany'>
      <Flex cursor={'help'}>
        <CheckIcon fontSize={'1.2rem'} />
      </Flex>
    </Tooltip>
  );
};
