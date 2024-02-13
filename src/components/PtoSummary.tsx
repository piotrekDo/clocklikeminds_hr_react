import { HStack, Heading, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';
import useUserPtoSummary from '../hooks/useUserPtoSummary';
import useAuthentication from '../state/useAuthentication';

interface Props {
  onopen: () => void;
}

export const PtoSummary = ({ onopen }: Props) => {
  const appuser = useAuthentication(s => s.appUser);
  const { data: summary, isError, isFetching } = useUserPtoSummary(appuser?.userId || -1);

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack fontWeight={'600'} w={'100%'} p={5} justifyContent={'space-around'} gap={5}>
        <VStack w={'100%'} h={'100%'} bg={'#F5F4F6'} borderRadius={'20px'} p={5}>
          <Text w={'100%'} textAlign={'center'}>
            Podsumowanie
          </Text>
          {appuser?.isActive && (
            <HStack fontSize={'1.2rem'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
              <VStack spacing={0}>
                {!isFetching && summary && (
                  <Tooltip label={`W tym pozostałe z zeszłego roku ${summary.ptoDaysAccruedLastYear}`}>
                    <Text>{summary.ptoDaysAccruedLastYear + summary.ptoDaysAccruedCurrentYear}</Text>
                  </Tooltip>
                )}
                {isFetching && <Spinner />}
                <Text>Naliczone</Text>
              </VStack>
              <VStack spacing={0}>
                {!isFetching && summary && (
                  <Tooltip label={`W tym dni z ubiegłego roku ${summary.ptoDaysLeftFromLastYear}`}>
                    <Text>{summary.ptoDaysLeftFromLastYear + summary.ptoDaysLeftCurrentYear}</Text>
                  </Tooltip>
                )}
                {isFetching && <Spinner />}
                <Text>Pozostałe</Text>
              </VStack>
              <VStack spacing={0}>
                {!isFetching && summary && <Text>{summary.ptoDaysTaken}</Text>}
                {isFetching && <Spinner />}
                <Text>Wykorzystane</Text>
              </VStack>
            </HStack>
          )}
          {!appuser?.isActive && (
            <HStack fontSize={'1.2rem'} minW={'300px'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
              <Text>Konto nieaktywne</Text>
            </HStack>
          )}
        </VStack>
        {appuser?.isActive && (
          <HStack bg={'#F5F4F6'} h={'100%'} w={'100%'} borderRadius={'20px'} p={5} cursor={'pointer'} onClick={onopen}>
            <FaPlus />
            <Text>Nowy wniosek</Text>
          </HStack>
        )}
      </HStack>

      <VStack w={'100%'} pt={'50px'}>
        {isFetching && <Spinner />}
        {!isFetching && summary?.lastRequests.length === 0 && <Heading>Brak historii wniosków</Heading>}
      </VStack>
    </VStack>
  );
};
