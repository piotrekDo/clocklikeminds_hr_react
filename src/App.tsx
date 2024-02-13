import { Box, Flex, calc, useToast } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Uppernavbar } from './components/UpperNavbar';
import { SideNavbar } from './components/SideNavbar';
import useAuthentication from './state/useAuthentication';
import { adminBackgroundGradient, backgroundGradient } from './library';
import useHttpErrorState from './state/useHttpErrorState';
import { useEffect } from 'react';

function App() {
  const { appUser, isAdmin } = useAuthentication();
  const {error} = useHttpErrorState();
  const toast = useToast();

  useEffect(() => {
    if(error) {
      toast({
        title: error.code + ' ' +  error.header,
        description: error.details,
        status: 'error',
        isClosable: true,
        position: 'top-left',

      })
    }
  }, [error]);

  return (
    <Flex w={'100wv'} minH={'100vh'} h={'100vh'} bg={ backgroundGradient}>
      {appUser && (
        <>
          <Uppernavbar />
          <SideNavbar />
        </>
      )}
      <Box w={'100%'} h={'100%'} pt={'60px'}>
        <Box w={'100%'} h={'100%'} borderRadius={'50px 0 0 0'}  bg={'white'}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
