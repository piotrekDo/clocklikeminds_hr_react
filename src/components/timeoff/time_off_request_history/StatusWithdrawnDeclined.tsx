import { ArrowRightIcon, CheckIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Flex, HStack, Tooltip } from '@chakra-ui/react';

export const StatusWithdrawnDeclined = () => {
  return (
    <Tooltip label='Wycofanie odrzucone, wniosek zaakceptowany'>
      <HStack cursor={'help'} align={'center'} spacing={2}>
        <RepeatClockIcon fontSize={'1.2rem'} />
        <ArrowRightIcon fontSize={'0.6rem'} />
        <CheckIcon fontSize={'1.2rem'} />
      </HStack>
    </Tooltip>
  );
};
