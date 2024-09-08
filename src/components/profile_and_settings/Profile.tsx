import { FormControl, FormLabel, HStack, Switch, Text, VStack } from '@chakra-ui/react';

export const Profile = () => {
  return (
    <HStack
      w={'100%'}
      h={'100%'}
      justifyContent={'center'}
      alignItems={'start'}
      p={2}
      borderRadius={'30px 10px 10px 30px'}
    >
      <Text as={'em'} fontWeight={'700'} fontSize={'1.8rem'} color={'whiteAlpha.900'}>
        Twój profil
      </Text>
      <VStack>

      </VStack>
    </HStack>
  );
};
