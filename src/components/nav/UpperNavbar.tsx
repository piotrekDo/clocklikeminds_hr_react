import { Box, HStack, Text } from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../state/useAuthentication';
import { Freelancer } from '../badges/Freelancer';

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
      {user?.freelancer && <Freelancer size='3rem' />}
      <HStack cursor={'pointer'} fontSize={'1.3rem'}>
        {user?.imageUrl && (
          <Box
            w={'40px'}
            h={'40px'}
            borderRadius={'30px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}
          >
            <img
              src={user.imageUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              referrerPolicy='no-referrer'
            />
          </Box>
        )}
        <Text as={'b'}>{user?.userEmail}</Text>
      </HStack>
      <Box
        color={'red.100'}
        _hover={{ color: 'red.400', transform: 'scale(1.3)' }}
        transitionProperty={'color transform'}
        transitionDuration={'.5s'}
        transitionTimingFunction={'ease-in-out'}
      >
        <FaPowerOff onClick={onLogoutHandler} size={'1.5rem'} cursor={'pointer'} />
      </Box>
    </HStack>
  );
};
