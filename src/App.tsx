import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { LoggedUser } from './components/LoggedUser';
import { Navbar } from './components/Navbar';
import useAuthentication from './state/useAuthentication';

function App() {
  const { appUser } = useAuthentication();
  return (
    <Flex w={'100wv'} minH={'100vh'} h={'100vh'}>
      {appUser && (
        <>
          <LoggedUser />
          <Navbar />
        </>
      )}
      <Outlet />
    </Flex>
  );
}

export default App;
