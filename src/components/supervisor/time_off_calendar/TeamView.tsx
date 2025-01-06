import { HStack, Box, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { PtoRequestFormatted } from '../../../model/Pto';

interface Props {
  selectedDate: Date;
  holidays: Map<string, string>;
  isPtosFetching: boolean;
}

export const TeamView = ({ selectedDate, holidays, isPtosFetching }: Props) => {
  const queryClient = useQueryClient();
  let ptos = queryClient.getQueryData<PtoRequestFormatted[]>([
    'supervisorCalendar',
    selectedDate.getMonth().toString(),
  ]);
  const days = [];
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
  }

  console.log(ptos);

  return (
    <HStack color={'white'} w={'100%'}>
      <Box w={'300px'} border={'sol'}></Box>
      <HStack w={'100%'}>
        {days.map(d => (
          <Box key={d.getDate()} flexBasis={'100%'}>
            <Text>{d.getDate()}</Text>
          </Box>
        ))}
      </HStack>
    </HStack>
  );
};
