import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  adminMode: boolean;
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViewSwitch = ({ adminMode, setAdminMode }: Props) => {
  return (
    <Flex
      onClick={() => setAdminMode(s => !s)}
      bg={'blue.100'}
      borderRadius={'20px'}
      cursor={'pointer'}
      w={'500px'}
      h={'15px'}
      overflow={'hidden'}
      mb={{ base: 0, monitorM: 5 }}
      flexGrow={0}
      flexShrink={0}
    >
      <Flex
        w={'500px'}
        justifyContent={'center'}
        alignItems={'center'}
        flexShrink={0}
        transform={adminMode ? 'translateX(-100%)' : 'translateX(0)'}
        transitionProperty={'transform'}
        transitionDuration={'200ms'}
        transitionTimingFunction={'ease-in'}
      >
        Moje urlopy
      </Flex>
      <Flex
        w={'500px'}
        justifyContent={'center'}
        alignItems={'center'}
        flexShrink={0}
        transform={adminMode ? 'translateX(-100%)' : 'translateX(0)'}
        transitionProperty={'transform'}
        transitionDuration={'200ms'}
        transitionTimingFunction={'ease-in'}
      >
        Wnioski pracowników
      </Flex>
    </Flex>
  );
};
