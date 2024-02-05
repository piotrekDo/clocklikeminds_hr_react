import { HStack, Text } from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import { adminBackgroundGradient, backgroundGradient } from '../library';
import useAuthentication from '../state/useAuthentication';

export const LoggedUser = () => {
  const navigate = useNavigate();
  const logoutFromApp = useAuthentication(s => s.logout);
  const isAdmin = useAuthentication(s => s.isAdmin);

  const onLogoutHandler = () => {
    logoutFromApp();
    navigate('/');
  };

  return (
    <HStack
      position={'fixed'}
      color={'whiteAlpha.900'}
      right={'0'}
      top={'20px'}
      bg={isAdmin ? adminBackgroundGradient : backgroundGradient}
      px={5}
      py={2}
      borderRadius={'20px 0 0 20px'}
      spacing={10}
    >
      <HStack cursor={'pointer'} fontSize={'1.3rem'}>
        <FaRegCircleUser />
        <Text>Piotr Domagalski</Text>
      </HStack>
      <FaPowerOff onClick={onLogoutHandler} size={'1.5rem'} cursor={'pointer'} />
    </HStack>
  );
};
