import { Box, Flex, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavbar } from './components/nav/SideNavbar';
import { Uppernavbar } from './components/nav/UpperNavbar';
import { backgroundGradient, loggedBackgorund } from './library';
import useAuthentication from './state/useAuthentication';
import useHttpErrorState from './state/useHttpErrorState';

function App() {
  const { appUser } = useAuthentication();
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
    <Flex
      w={'100wv'}
      minH={'100vh'}
      maxH={'100vh'}
      h={'100vh'}
      bg={!appUser ? backgroundGradient : loggedBackgorund}
      justifyContent={'end'}
      alignItems={'end'}
      transition={'background-color .5s ease-in, color .5s ease-in'}
    >
      {appUser && (
        <>
          <Uppernavbar />
          <SideNavbar />
        </>
      )}
      <Box
        w={`calc(100vw - 70px)`}
        h={`calc(100vh - 60px)`}
        px={{ base: 0, '4K': '250px' }}
        py={{ base: 0, '4K': '50px' }}
        borderRadius={'50px 0 0 0'}
        // bg={'white'}
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}

      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
