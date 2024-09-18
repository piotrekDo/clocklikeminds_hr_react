import { AttachmentIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

export const StatusRegistrated = () => {
  return (
    <Tooltip label='Zgłoszony'>
      <Flex cursor={'help'}>
        <AttachmentIcon fontSize={'1.2rem'} />
      </Flex>
    </Tooltip>
  );
};
