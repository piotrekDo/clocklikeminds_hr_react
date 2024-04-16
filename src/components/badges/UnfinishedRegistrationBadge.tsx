import { Flex, Tooltip } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

export const UnfinishedRegistrationBadge = () => {
  return (
    <Tooltip placement='top' hasArrow label={'Konto wymaga dokończenia rejestracji'}>
      <Flex justifyContent={'center'}>
        <FaExclamationCircle color='orange' size={'1.3rem'} />
      </Flex>
    </Tooltip>
  );
};
