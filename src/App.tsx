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
import { PtoRequestExtendedModal } from './components/timeoff/PtoRequestExtendedModal';
import usePtoModalStore from './state/usePtoModalStore';
import { PtoRequestExtendedModalForSupervisor } from './components/timeoff/PtoRequestExtendedModalForSupervisor';
import { PtoCompareModal } from './components/supervisor/requests/PtoCompareModal';

export const occasionalLeaveTranslatePL: Map<string, string> = new Map<string, string>();

function App() {
  const { appUser } = useAuthentication();
  const theme = useThemeState(s => s.themeConfig);
  const { error } = useHttpErrorState();
  const toast = useToast();
  const { isSuccess, data, isError, error: metaDataError } = useMetaData(!!appUser);
  const {
    ptoToCompareDates,
    ptoExtendedModal,
    ptoExtendedForUser,
    setPtoToCompareDates,
    setPtoExtendedModal,
    setPtoExtendedForUser,
  } = usePtoModalStore();

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

  const onModalClose = () => {
    setPtoExtendedForUser(undefined);
    setPtoExtendedModal(undefined);
  };

  const onCloseCompareModal = () => {
    setPtoToCompareDates(undefined);
  };

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
      <PtoRequestExtendedModal isOpen={!!ptoExtendedForUser} onClose={onModalClose} />
      <PtoRequestExtendedModalForSupervisor isOpen={!!ptoExtendedModal} onClose={onModalClose} />
      <PtoCompareModal isOpen={!!ptoToCompareDates} onClose={onCloseCompareModal} />

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
