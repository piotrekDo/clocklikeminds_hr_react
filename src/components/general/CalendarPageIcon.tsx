import { Box, VStack } from '@chakra-ui/react';

interface Props {
  date: Date;
}

export const CalendarPageIcon = ({ date }: Props) => {
  return (
    <VStack gap={0} spacing={0} w={'60px'} borderRadius={'10px 10px 5px 5px'} boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}>
      <Box
        w={'100%'}
        textAlign={'center'}
        p={0}
        borderRadius={'10px 10px 0 0'}
        color={'whiteAlpha.900'}
        bgColor={'red.400'}
        fontSize={'.8rem'}
      >
        {date.getFullYear()}
      </Box>
      <VStack spacing={0} gap={0} w={'100%'} bg={'whiteAlpha.900'} fontSize={'.8rem'} borderRadius={'0 0 5px 5px'}>
        <Box>{date.getDate()}</Box>
        <Box>{date.toLocaleString('pl-PL', { month: 'long' })}</Box>
      </VStack>
    </VStack>
  );
};
