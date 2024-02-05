import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { CgHome } from 'react-icons/cg';
import { GoPeople } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuPalmtree } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import logo from '../assets/CM-logo-color.png';
import { adminBackgroundGradient, backgroundGradient } from '../library';
import useAuthentication from '../state/useAuthentication';

export const Navbar = () => {
  const isAdmin = useAuthentication(s => s.isAdmin);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onLogoClickhandler = () => {
    setIsExpanded(s => !s);
  };

  return (
    <VStack
      w={!isExpanded ? '80px' : '250px'}
      minH={'100vh'}
      h={'100%'}
      py={5}
      bg={isAdmin ? adminBackgroundGradient : backgroundGradient}
      justifyContent={'space-between'}
      transition={'width .25s'}
      overflow={'hidden'}
    >
      <Flex
        h={'100px'}
        w={'100%'}
        justifyContent={'center'}
        cursor={'pointer'}
        mb={'20px'}
        onClick={onLogoClickhandler}
      >
        <Box maxW={'80px'} p={2}>
          <Image src={logo} />
        </Box>
      </Flex>
      <VStack w={'100%'} h={'100%'} alignItems={'start'} spacing={5}>
        <NavLink to={'/home'}>
          <Flex w={'400px'} justifyContent={'start'} alignItems={'center'}>
            <Flex cursor={'pointer'} w={'80px'} justifyContent={'center'}>
              <CgHome size={'40px'} color='' />
            </Flex>
            <Text>Home</Text>
          </Flex>
        </NavLink>
        <NavLink to={'/timeoff'}>
          <Flex w={'400px'} justifyContent={'start'} alignItems={'center'}>
            <Flex cursor={'pointer'} w={'80px'} justifyContent={'center'}>
              <LuPalmtree size={'40px'} />
            </Flex>
            <Text>Urlopy</Text>
          </Flex>
        </NavLink>
        {isAdmin && (
          <NavLink to={'/employees'}>
            <Flex w={'400px'} justifyContent={'start'} alignItems={'center'}>
              <Flex cursor={'pointer'} w={'80px'} justifyContent={'center'}>
                <GoPeople size={'40px'} />
              </Flex>
              <Text>Pracownicy</Text>
            </Flex>
          </NavLink>
        )}
        <NavLink to={'/profile'}>
          <Flex w={'400px'} justifyContent={'start'} alignItems={'center'}>
            <Flex cursor={'pointer'} w={'80px'} justifyContent={'center'}>
              <IoSettingsOutline size={'40px'} />
            </Flex>
            <Text>Profil</Text>
          </Flex>
        </NavLink>
      </VStack>
    </VStack>
  );
};
