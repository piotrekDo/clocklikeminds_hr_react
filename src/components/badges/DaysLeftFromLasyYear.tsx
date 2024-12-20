import { Flex, Tooltip } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

export const DaysLeftFromLasyYear = ({ daysleft }: { daysleft: number }) => {
    return (
    <Tooltip placement='top' hasArrow label={`Niewykorzystane ${daysleft} dni z ubiegłego roku`}>
      <Flex justifyContent={'center'}>
        <FaExclamationCircle color='orange' size={'1.3rem'} />
      </Flex>
    </Tooltip>
  );
};
