import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
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
          transitionProperty={'background'}
          transitionDuration={'.5s'}
        >
          <Flex
            cursor={'pointer'}
            w={'80px'}
            justifyContent={'center'}
            transform={isActive ? 'translateX(10px)' : ''}
            transition={'transform 200ms'}
          >
            {children}
          </Flex>
          <Text>{text}</Text>
        </Flex>
      )}
    </NavLink>
  );
};
