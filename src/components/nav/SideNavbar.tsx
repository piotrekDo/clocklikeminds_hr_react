import { Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { CgHome } from 'react-icons/cg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuPalmtree } from 'react-icons/lu';
import { RiTeamLine } from 'react-icons/ri';
import useAuthentication from '../../state/useAuthentication';
import { NavbarLink } from './NavbarLink';
import useThemeState from '../../state/useThemeState';

export const SideNavbar = () => {
  const theme = useThemeState(s => s.themeConfig);
  const isAdmin = useAuthentication(s => s.isAdmin);
  const isSupervisor = useAuthentication(s => s.isSupervisor);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onLogoClickhandler = () => {
    setIsExpanded(s => !s);
  };

  return (
    <VStack
      w={!isExpanded ? '80px' : '270px'}
      minH={'100vh'}
      h={'100%'}
      py={5}
      justifyContent={'start'}
      transition={'width .25s'}
      overflow={'hidden'}
      zIndex={10}
      color={theme.fontColor}
    >
      <Flex
        h={'100px'}
        w={'100%'}
        justifyContent={'center'}
        cursor={'pointer'}
        mb={'20px'}
        onClick={onLogoClickhandler}
      >
        {/* <Box maxW={'80px'} p={2} color={'white'}>
          <Image src={logo} />
        </Box> */}
      </Flex>
      <VStack w={'100%'} h={'100%'} alignItems={'start'} spacing={5}>
        <NavbarLink to='/home' text='Home'>
          <CgHome size={'40px'} />
        </NavbarLink>
        {(isAdmin || isSupervisor) && (
          <NavbarLink to='/supervisor' text='Mój zespół'>
            <RiTeamLine size={'40px'} />
          </NavbarLink>
        )}
        {(isAdmin || isSupervisor) && (
          <NavbarLink to='/calendar' text='Kalendarz'>
            <FaRegCalendarAlt size={'40px'} />
          </NavbarLink>
        )}
        {isAdmin && (
          <NavbarLink to='/employees' text='Pracownicy'>
            <GoPeople size={'40px'} />
          </NavbarLink>
        )}
        <NavbarLink to='/timeoff' text='Urlopy'>
          <LuPalmtree size={'40px'} />
        </NavbarLink>
        <NavbarLink to='/profile' text='Profil'>
          <IoSettingsOutline size={'40px'} />
        </NavbarLink>
      </VStack>
    </VStack>
  );
};
