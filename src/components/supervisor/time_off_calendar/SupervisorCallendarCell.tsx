import { HStack, Text } from '@chakra-ui/react';

interface Props {
  day: Date;
  isHoliday: string | undefined;
  isSunday: boolean;
}

export const SupervisorCallendarCell = ({ day, isHoliday, isSunday }: Props) => {
  return (
    <HStack spacing={0} w={'100%'} align={'start'} h={'100%'} fontWeight={600}>
      {day.getDate() != 1 && <Text color={isSunday || isHoliday ? 'red.200' : ''}>{day.getDate()}</Text>}
      {day.getDate() === 1 && (
        <Text color={isSunday || isHoliday ? 'red.200' : ''}>
          {day.toLocaleString('pl-PL', { day: 'numeric', month: 'short' })}
        </Text>
      )}
      {isHoliday && <Text fontSize={'.6rem'}>{isHoliday}</Text>}
    </HStack>
  );
};
