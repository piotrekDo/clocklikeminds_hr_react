import { Box, Flex, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavbar } from './components/nav/SideNavbar';
import { Uppernavbar } from './components/nav/UpperNavbar';
import useMetaData from './hooks/useMetaData';
import useAuthentication from './state/useAuthentication';
import useHttpErrorState from './state/useHttpErrorState';
import useThemeState from './state/useThemeState';
import { lightBackground } from './library';

export const occasionalLeaveTranslatePL: Map<string, string> = new Map<string, string>();

function App() {
  const { appUser } = useAuthentication();
  const theme = useThemeState(s => s.themeConfig);
  const { error } = useHttpErrorState();
  const toast = useToast();
  const { isSuccess, data, isError, error: metaDataError } = useMetaData(!!appUser);

  useEffect(() => {
    if (isSuccess) {
      data.occasionalLeaveTypes.forEach(type => {
        occasionalLeaveTranslatePL.set(type.occasionalType, type.descriptionPolish);
      });
    }
  }, [isSuccess]);

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
    if (metaDataError) {
      toast({
        title: 'Błąd pobierania meta-danych aplikacji',
        description: 'Sprawdź połączenie internetowe',
        status: 'error',
        isClosable: true,
        position: 'top-left',
      });
    }
  }, [error, metaDataError]);

  return (
    <Flex
      w={'100wv'}
      minH={'100vh'}
      maxH={'100vh'}
      h={'100vh'}
      backgroundImage={appUser ? theme.bg : lightBackground}
      justifyContent={'end'}
      alignItems={'end'}
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
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
