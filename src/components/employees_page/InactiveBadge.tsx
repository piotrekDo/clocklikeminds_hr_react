import { Flex, Tooltip } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

export const InactiveBadge = () => {
  return (
    <Tooltip placement='top' hasArrow label={'Konto nieaktywne'}>
      <Flex justifyContent={'center'}>
        <FaExclamationCircle color='red' size={'1.3rem'} />
      </Flex>
    </Tooltip>
  );
};
