import { Badge, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useThemeState from '../../state/useThemeState';

interface Props {
  unresolvedRequestsCount: number;
  requestToWithdraw: number;
}

export const NewRequestsTile = ({ unresolvedRequestsCount, requestToWithdraw }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const navigate = useNavigate();

  const unresolved = unresolvedRequestsCount > 0 || requestToWithdraw > 0;

  return (
    <VStack
      position={'relative'}
      bg={'whiteAlpha.400'}
      borderRadius={'10px'}
      w={'300px'}
      h={'100%'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      p={5}
      align={'start'}
      overflow={'hidden'}
      color={theme.fontColor}
      cursor={unresolved ? 'pointer' : 'default'}
      transition={'transform .2s ease-in'}
      _hover={{
        transform: unresolved ? 'scale(1.05) translateX(5px)' : 'none',
        '& span': {
          right: '10px',
          opacity: 1,
        },
      }}
      onClick={e => {
        if (!unresolved) return;
        navigate('/supervisor');
      }}
    >
      {unresolved && (
        <Badge
          pos={'absolute'}
          right={'-70px'}
          opacity={0}
          colorScheme='green'
          variant={'solid'}
          p={2}
          borderRadius={'5px'}
          transition={'right .2s ease-in, opacity .2s ease-in'}
        >
          PRZEJDŹ
        </Badge>
      )}
      {unresolved ? (
        <>
          <Text fontSize={'2rem'} fontWeight={700} as={'em'}>
            Wnioski
          </Text>
          <Text fontSize={'1.3rem'} fontWeight={600}>
            Do akceptacji: {unresolvedRequestsCount}
          </Text>
          <Text fontSize={'1.3rem'} fontWeight={600}>
            Zgłoszone do wycofania: {requestToWithdraw}
          </Text>
        </>
      ) : (
        <VStack w={'100%'} justify={'center'} align={'center'} spacing={0}>
          <Text fontSize={'2rem'} fontWeight={700}>
            Brak nowych
          </Text>
          <Text fontSize={'2rem'} fontWeight={700}>
            wniosków
          </Text>
        </VStack>
      )}
    </VStack>
  );
};
