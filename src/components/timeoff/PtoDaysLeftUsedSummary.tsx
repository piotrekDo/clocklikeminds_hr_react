import { HStack, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react';
import { UserPtoSummary } from '../../model/Pto';

interface Props {
  isUserActive: boolean;
  summary: UserPtoSummary | undefined;
  isFetching: boolean;
}

export const PtoDaysLeftUsedSummary = ({ isUserActive, summary, isFetching }: Props) => {
  return (
    <VStack w={'100%'} p={5}>
      <Text w={'100%'} fontSize={'1.3rem'} textAlign={'center'} as={'b'}>
        Podsumowanie
      </Text>
      {isUserActive && (
        <HStack fontSize={'1.2rem'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
          <VStack spacing={0}>
            {!isFetching && summary && (
              <Tooltip label={`W tym pozostałe z zeszłego roku ${summary.ptoDaysAccruedLastYear}`}>
                <Text as={'em'}>{summary.ptoDaysAccruedLastYear + summary.ptoDaysAccruedCurrentYear}</Text>
              </Tooltip>
            )}
            {isFetching && <Spinner />}
            <Text as={'b'}>Naliczone</Text>
          </VStack>
          <VStack spacing={0}>
            {!isFetching && summary && (
              <Tooltip label={`W tym dni z ubiegłego roku ${summary.ptoDaysLeftFromLastYear}`}>
                <Text as={'em'}>{summary.ptoDaysLeftFromLastYear + summary.ptoDaysLeftCurrentYear}</Text>
              </Tooltip>
            )}
            {isFetching && <Spinner />}
            <Text as={'b'}>Pozostałe</Text>
          </VStack>
          <VStack spacing={0}>
            {!isFetching && summary && <Text as={'em'}>{summary.ptoDaysTaken}</Text>}
            {isFetching && <Spinner />}
            <Text as={'b'}>Wykorzystane</Text>
          </VStack>
        </HStack>
      )}
      {!isUserActive && (
        <HStack fontSize={'1.2rem'} minW={'300px'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
          <Text as={'b'}>Konto nieaktywne</Text>
        </HStack>
      )}
    </VStack>
  );
};
