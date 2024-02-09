import { Box, Tooltip } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

export const InactiveBadge = () => {
  return (
    <Tooltip placement='top' hasArrow label={'Konto wymaga dokończenia rejestracji'}>
      <Box>
        <FaExclamationCircle color='orange' size={'1.3rem'} />
      </Box>
    </Tooltip>
  );
};
