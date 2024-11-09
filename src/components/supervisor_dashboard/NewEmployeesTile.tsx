import { Badge, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useThemeState from '../../state/useThemeState';

interface Props {
    newEmployees: number
}

export const NewEmployeesTile = ({newEmployees}: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  const navigate = useNavigate();

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
      cursor={'pointer'}
      transition={'transform .2s ease-in'}
      _hover={{
        transform: 'scale(1.05) translateX(5px)',
        '& span': {
          right: '10px',
          opacity: 1,
        },
      }}
      onClick={e => {
        navigate('/employees');
      }}
    >
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
      <>
        <Text fontSize={'2rem'} fontWeight={700} as={'em'}>
          Nowe konta
        </Text>
        <Text fontSize={'1.3rem'} fontWeight={600}>
          wymagające dokończenia rejestracji: {newEmployees}
        </Text>
      </>
    </VStack>
  );
};
