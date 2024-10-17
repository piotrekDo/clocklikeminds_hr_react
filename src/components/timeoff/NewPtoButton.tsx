import { HStack, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import usePtoRequestState from '../../state/usePtoRequestState';
import useThemeState from '../../state/useThemeState';

export const NewPtoButton = () => {
  const theme = useThemeState(s => s.themeConfig);
  const setIsRequestingPto = usePtoRequestState(s => s.setIsRequestingPto);
  const setSelectedPtoType = usePtoRequestState(s => s.setSelectedPtoType);
  return (
    <HStack
      h={'140px'}
      borderRadius={'20px'}
      bg={theme.elementBg}
      boxShadow={'8px 8px 20px 0px rgba(66, 68, 90, .8)'}
      color={theme.fontColor}
      fontWeight={700}
      _hover={{ transform: 'scale(1.1)' }}
      transition={'transform .15s ease-in'}
    >
      <HStack
        w={'100%'}
        h={'100%'}
        p={5}
        cursor={'pointer'}
        onClick={() => {
          setIsRequestingPto(true);
          setSelectedPtoType('pto');
        }}
      >
        <FaPlus />
        <Text>Nowy wniosek</Text>
      </HStack>
    </HStack>
  );
};
