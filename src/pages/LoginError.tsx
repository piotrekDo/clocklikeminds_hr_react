import { Heading, Text, VStack } from '@chakra-ui/react';

export const LoginError = () => {
  return (
    <VStack w={'100%'} h={'100%'} justifyContent={'center'} spacing={5}>
      <Heading>Nie posiadasz dostępu do aplikacji</Heading>
      <Text>Skontaktuj się z ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</Text>
    </VStack>
  );
};
