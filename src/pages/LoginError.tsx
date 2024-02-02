import { Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { backgroundGradient } from '../library'

export const LoginError = () => {
  return (
    <VStack w={'100%'} h={'100%'} justifyContent={'center'} bg={backgroundGradient} spacing={5}>
        <Heading>Nie posiadasz dostępu do aplikacji</Heading>
        <Text>Skontaktuj się z ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</Text>
    </VStack>
  )
}
