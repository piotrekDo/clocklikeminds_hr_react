import { HStack, Text } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import usePtoRequestState from '../../state/usePtoRequestState';


export const NewPtoButton = () => {
  const setIsRequestingPto = usePtoRequestState(s => s.setIsRequestingPto);
  const isRequestingPto = usePtoRequestState(s => s.isRequestingPto);
  return (
    <HStack bg={'#F5F4F6'} h={'140px'} borderRadius={'20px'}>
      {!isRequestingPto && (
        <HStack w={'100%'} h={'100%'} p={5} cursor={'pointer'} onClick={() => setIsRequestingPto(true)}>
          <FaPlus />
          <Text>Nowy wniosek</Text>
        </HStack>
      )}
    </HStack>
  );
};
