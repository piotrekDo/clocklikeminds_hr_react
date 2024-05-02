import { Flex, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
  children: ReactNode;
}

export const NavbarLink = ({ to, text, children }: Props) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Flex
          w={'400px'}
          justifyContent={'start'}
          alignItems={'center'}
          background={isActive ? 'whiteAlpha.900' : 'inherit'}
          borderRadius={'50px'}
          transitionProperty={'background'}
          transitionDuration={'.5s'}
        >
          <Flex
            cursor={'pointer'}
            w={'80px'}
            justifyContent={'center'}
            color={isActive ? 'blue.400' : ''}
            transitionProperty={'color'}
            transitionDuration={'.5s'}
          >
            {children}
          </Flex>
          <Text>{text}</Text>
        </Flex>
      )}
    </NavLink>
  );
};
