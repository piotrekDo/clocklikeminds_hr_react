import { Button, Image, Spinner, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import logo from '../assets/CM-logo-color.png';
import { GOOGLE_AUTH_URL } from '../library';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoginHandler = () => {
    setIsLoading(true);
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <VStack position={'absolute'} top={0} left={0} w={'100vw'} h={'100vh'} justifyContent={'center'} spacing={'50px'}>
      <Image src={logo} />
      <Button isLoading={isLoading} spinner={<Spinner />} onClick={onLoginHandler}>
        Zaloguj się z Google
      </Button>
    </VStack>
  );
};
