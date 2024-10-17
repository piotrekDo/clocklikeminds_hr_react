import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import useThemeState from '../../state/useThemeState';

export const SetThemeButton = () => {
  const { themeName, themeConfig, setTheme } = useThemeState();
  const [isHovering, setIshovering] = useState<boolean>(false);
  return (
    <Flex
      fontSize={'2rem'}
      w={'30px'}
      h={'30px'}
      justify={'center'}
      align={'center'}
      cursor={'pointer'}
      pos={'relative'}
      color={themeConfig.secondColor}
      onMouseEnter={e => setIshovering(true)}
      onMouseLeave={e => setIshovering(false)}
      transition={'color 500ms'}
    >
      <Flex
        justify={'center'}
        align={'center'}
        transform={isHovering ? 'translateY(-5px)' : ''}
        transition={'transform 200ms'}
      >
        {themeName === 'dark' && <MoonIcon />}
        {themeName === 'light' && <SunIcon />}
      </Flex>

      <Flex
        pos={'absolute'}
        right={isHovering ? '-35px' : 0}
        fontSize={'1.5rem'}
        w={'35px'}
        h={'30px'}
        justify={'center'}
        align={'center'}
        cursor={'pointer'}
        opacity={isHovering ? 1 : 0}
        transition={'right 200ms, opacity 200ms'}
        onClick={e => setTheme('dark')}
      >
        <MoonIcon />
      </Flex>
      <Flex
        pos={'absolute'}
        left={isHovering ? '-35px' : 0}
        fontSize={'1.5rem'}
        w={'35px'}
        h={'30px'}
        justify={'center'}
        align={'center'}
        cursor={'pointer'}
        opacity={isHovering ? 1 : 0}
        transition={'left 200ms, opacity 200ms'}
        onClick={e => setTheme('light')}
      >
        <SunIcon />
      </Flex>
    </Flex>
  );
};
