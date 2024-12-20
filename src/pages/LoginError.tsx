import { Heading, Link, Text, VStack } from '@chakra-ui/react';

export const LoginError = () => {
  return (
    <VStack w={'100%'} h={'100%'} justifyContent={'center'} spacing={5} color={'blackAlpha.800'}>
      <VStack maxW={'1300px'} justify={'center'} align={'center'}  p={20} borderRadius={'10px'}>
        <Heading textAlign={'center'}>
          Przepraszamy, dostęp do tej aplikacji jest zarezerwowany wyłącznie dla pracowników firmy Clocklike Minds Sp. z
          o.o.
        </Heading>
        <Text textAlign={'center'} fontSize={'2rem'} fontWeight={600} mt={5}>
          Użytkownicy spoza naszej organizacji nie mogą korzystać z tego portalu.
        </Text>
        <Text textAlign={'center'} fontSize={'2rem'} fontWeight={600} mt={5}>
          Jeśli jesteś zainteresowany dołączeniem do naszego zespołu, zapraszamy do odwiedzenia strony rekrutacyjnej pod
          adresem
        </Text>
        <Link
          href='https://clocklikeminds.com/career/'
          textAlign={'center'}
          fontSize={'2rem'}
          fontWeight={600}
          fontStyle={'italic'}
        >
          clocklikeminds.com/career
        </Link>
      </VStack>
    </VStack>
  );
};
