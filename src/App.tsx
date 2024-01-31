import { Box, Flex } from '@chakra-ui/react';
import { MainPage } from './pages/MainPage';
import { Navbar } from './components/Navbar';
import { LoggedUser } from './components/LoggedUser';
import { TimeOff } from './pages/TimeOff';

function App() {
  return (
    <Flex w={'100wv'} minH={'100vh'} h={'100vh'}>
      <LoggedUser />
      <Navbar />
      <TimeOff />
    </Flex>
  );
}

export default App;
