import { HStack, Text } from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';

export const Uppernavbar = () => {
  const navigate = useNavigate();
  const logoutFromApp = useAuthentication(s => s.logout);
  const user = useAuthentication(s => s.appUser);

  const onLogoutHandler = () => {
    logoutFromApp();
    navigate('/');
  };

  return (
    <HStack
      position={'fixed'}
      color={'whiteAlpha.900'}
      right={'0'}
      top={'0'}
      w={'100%'}
      h={'60px'}
      px={5}
      py={2}
      borderRadius={'20px 0 0 20px'}
      spacing={10}
      justifyContent={'end'}
    >
      <HStack cursor={'pointer'} fontSize={'1.3rem'}>
        {/* <FaRegCircleUser  size={'2rem'}/> */}
        <Text>{user?.userEmail}</Text>
      </HStack>
      <FaPowerOff onClick={onLogoutHandler} size={'1.5rem'} cursor={'pointer'} />
    </HStack>
  );
};
