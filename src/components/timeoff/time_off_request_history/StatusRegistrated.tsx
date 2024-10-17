import { AttachmentIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

interface Props {
  fontSize?: string;
}

export const StatusRegistrated = ({fontSize = '1.2rem'}: Props) => {
  return (
    <Tooltip label='Zgłoszony'>
      <Flex cursor={'help'}>
        <AttachmentIcon fontSize={fontSize} />
      </Flex>
    </Tooltip>
  );
};
