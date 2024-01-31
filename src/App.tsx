import { Box, Flex } from '@chakra-ui/react';
import { MainPage } from './pages/MainPage';
import { Navbar } from './components/Navbar';
import { LoggedUser } from './components/LoggedUser';

function App() {
  return (
    <Flex w={'100wv'} h={'100vh'}>
      <LoggedUser />
      <Navbar />
      <MainPage />
    </Flex>
  );
}

export default App;
