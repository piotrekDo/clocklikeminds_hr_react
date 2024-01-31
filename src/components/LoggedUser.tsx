import { Box, HStack, Text } from '@chakra-ui/react';
import { FaRegCircleUser } from 'react-icons/fa6';

import { backgroundGradient } from '../library';

export const LoggedUser = () => {
  return (
    <HStack
      position={'fixed'}
      color={'whiteAlpha.900'}
      right={'0'}
      top={'20px'}
      bg={backgroundGradient}
      px={5}
      py={2}
      borderRadius={'20px 0 0 20px'}
      cursor={'pointer'}
    >
      <Text>Piotr Domagalski</Text>
      <Box>
        <FaRegCircleUser />
      </Box>
    </HStack>
  );
};
