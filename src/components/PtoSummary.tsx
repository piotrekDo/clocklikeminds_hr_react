import { HStack, Text, VStack } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';

interface Props {
  onopen: () => void;
}

export const PtoSummary = ({onopen}: Props) => {
  return (
    <HStack fontWeight={'600'} p={5} justifyContent={'space-around'} gap={5}>
      <VStack w={'100%'} h={'100%'} bg={'#F5F4F6'} borderRadius={'20px'} p={5}>
        <Text w={'100%'} textAlign={'center'}>
          Podsumowanie
        </Text>
        <HStack fontSize={'1.2rem'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
          <VStack spacing={0}>
            <Text>26</Text>
            <Text>Naliczone</Text>
          </VStack>
          <VStack spacing={0}>
            <Text>20</Text>
            <Text>Pozostałe</Text>
          </VStack>
          <VStack spacing={0}>
            <Text>6</Text>
            <Text>Wykorzystane</Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack bg={'#F5F4F6'} h={'100%'} w={'100%'} borderRadius={'20px'} p={5} cursor={'pointer'} onClick={onopen}>
        <FaPlus />
        <Text>Nowy wniosek</Text>
      </HStack>
    </HStack>
  );
};
