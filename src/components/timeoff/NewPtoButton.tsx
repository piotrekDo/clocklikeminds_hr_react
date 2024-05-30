import { HStack, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import usePtoRequestState from '../../state/usePtoRequestState';

export const NewPtoButton = () => {
  const setIsRequestingPto = usePtoRequestState(s => s.setIsRequestingPto);
  return (
    <HStack
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      h={'140px'}
      borderRadius={'20px'}
      _hover={{ transform: 'scale(1.1)' }}
      transition={'transform .15s ease-in'}
    >
      <HStack w={'100%'} h={'100%'} p={5} cursor={'pointer'} onClick={() => setIsRequestingPto(true)}>
        <FaPlus />
        <Text>Nowy wniosek</Text>
      </HStack>
    </HStack>
  );
};
