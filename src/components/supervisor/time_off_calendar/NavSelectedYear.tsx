import { Flex, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useThemeState from '../../../state/useThemeState';

interface Props {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const bgOptions = `
linear-gradient(
    90deg,
    hsl(240deg 100% 64%) 0%,
    hsl(234deg 100% 64%) 46%,
    hsl(230deg 100% 63%) 63%,
    hsl(225deg 100% 63%) 74%,
    hsl(222deg 100% 62%) 82%,
    hsl(218deg 100% 61%) 87%,
    hsl(215deg 100% 61%) 91%,
    hsl(212deg 100% 60%) 95%,
    hsl(209deg 100% 59%) 97%,
    hsl(206deg 100% 59%) 99%,
    hsl(204deg 100% 58%) 100%,
    hsl(201deg 100% 57%) 100%,
    hsl(199deg 100% 55%) 101%,
    hsl(197deg 100% 54%) 100%,
    hsl(194deg 100% 50%) 100%
  )
`;

export const NavSelectedYear = ({ selectedDate, setSelectedDate }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const [isYearHovering, setIsYearHovering] = useState<boolean>(false);
  const [yearInput, setYearInput] = useState<number>(selectedDate.getFullYear());

  const handleYearChange = () => {
    setSelectedDate(new Date(yearInput, selectedDate.getMonth(), 1));
  };

  useEffect(() => {
    setYearInput(selectedDate.getFullYear());
  }, [selectedDate]);

  return (
    <Flex pos={'relative'} onMouseEnter={e => setIsYearHovering(true)} onMouseLeave={e => setIsYearHovering(false)}>
      <Input
        fontSize={'1.2rem'}
        fontWeight={'700'}
        type='number'
        zIndex={2}
        p={2}
        w={'70px'}
        bg={isYearHovering ? '#385898' : 'transparent'}
        border={''}
        borderRadius={0}
        color={isYearHovering ? 'whiteAlpha.900' : theme.fontColor}
        value={yearInput}
        onChange={e => setYearInput(+e.target.value)}
        transition={'color .25s'}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleYearChange();
          }
        }}
        onBlur={handleYearChange}
      ></Input>
      <Flex
        pos={'absolute'}
        w={'100%'}
        h={'30px'}
        justify={'center'}
        align={'center'}
        color={'whiteAlpha.900'}
        cursor={'pointer'}
        opacity={isYearHovering ? 1 : 0}
        pointerEvents={isYearHovering ? 'auto' : 'none'}
        top={!isYearHovering ? 0 : '-30px'}
        left={0}
        zIndex={1}
        bg={'#385898'}
        borderRadius={'10px 10px 0 0'}
        transition={'opacity .25s, top .25s'}
        onClick={e => {
          setYearInput(y => y + 1);
          setSelectedDate(new Date(yearInput + 1, selectedDate.getMonth(), 1));
        }}
      >
        +
      </Flex>
      <Flex
        pos={'absolute'}
        w={'100%'}
        h={'30px'}
        justify={'center'}
        align={'center'}
        color={'whiteAlpha.900'}
        cursor={'pointer'}
        opacity={isYearHovering ? 1 : 0}
        pointerEvents={isYearHovering ? 'auto' : 'none'}
        top={!isYearHovering ? 0 : '40px'}
        left={0}
        zIndex={1}
        bg={'#385898'}
        borderRadius={'0 0 10px 10px'}
        transition={'opacity .25s, top .25s'}
        onClick={e => {
          setYearInput(y => y - 1);
          setSelectedDate(new Date(yearInput - 1, selectedDate.getMonth(), 1));
        }}
      >
        -
      </Flex>
    </Flex>
  );
};
