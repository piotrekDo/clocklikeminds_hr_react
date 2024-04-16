import { Box, Flex, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavbar } from './components/nav/SideNavbar';
import { Uppernavbar } from './components/nav/UpperNavbar';
import { backgroundGradient } from './library';
import useAuthentication from './state/useAuthentication';
import useHttpErrorState from './state/useHttpErrorState';

function App() {
  const { appUser, isAdmin } = useAuthentication();
  const { error } = useHttpErrorState();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error.code + ' ' + error.header,
        description: error.details,
        status: 'error',
        isClosable: true,
        position: 'top-left',
      });
    }
  }, [error]);

  return (
    <Flex w={'100wv'} minH={'100vh'} maxH={'100vh'} h={'100vh'} bg={backgroundGradient}>
      {appUser && (
        <>
          <Uppernavbar />
          <SideNavbar />
        </>
      )}
      <Box w={'100%'} h={'100%'} pt={'60px'}>
        <Box w={'100%'} h={'100%'} borderRadius={'50px 0 0 0'} bg={'white'}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
