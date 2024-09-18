import { RepeatClockIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

export const StatusMarkedWithdraw = () => {
  return (
    <Tooltip label='Zgłoszony do wycofania'>
      <Flex cursor={'help'}>
        <RepeatClockIcon fontSize={'1.2rem'} />
      </Flex>
    </Tooltip>
  );
};
