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
      <Text w={'100%'} textAlign={'center'}>
        Podsumowanie
      </Text>
      {isUserActive && (
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
      {!isUserActive && (
        <HStack fontSize={'1.2rem'} minW={'300px'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
          <Text>Konto nieaktywne</Text>
        </HStack>
      )}
    </VStack>
  );
};
