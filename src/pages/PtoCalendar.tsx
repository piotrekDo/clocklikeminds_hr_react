import { VStack } from '@chakra-ui/react';
import { Calendar } from '../components/supervisor/time_off_calendar/Calendar';


export const PtoCalendar = () => {
  return (
    <VStack w={'100%'} h={'100%'} p={5}>
      <Calendar />
    </VStack>
  );
};
