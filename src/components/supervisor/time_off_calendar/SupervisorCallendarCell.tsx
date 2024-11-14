import { HStack, Text } from '@chakra-ui/react';
import useThemeState from '../../../state/useThemeState';

interface Props {
  day: Date;
  isToday: boolean;
  isHoliday: string | undefined;
  isSunday: boolean;
}

export const SupervisorCallendarCell = ({ day, isToday, isHoliday, isSunday }: Props) => {
  const theme = useThemeState(s => s.themeConfig);
  return (
    <HStack spacing={0} w={'100%'} align={'start'} h={'100%'} fontWeight={600}>
      {day.getDate() != 1 && (
        <Text
          color={isSunday || isHoliday ? 'red.200' : theme.fontColor}
          textDecoration={isToday ? 'underline' : 'none'}
        >
          {day.getDate()}
        </Text>
      )}
      {day.getDate() === 1 && (
        <Text color={isSunday || isHoliday ? 'red.200' : theme.fontColor}>
          {day.toLocaleString('pl-PL', { day: 'numeric', month: 'short' })}
        </Text>
      )}
      {isHoliday && (
        <Text fontSize={'.6rem'} color={theme.fontColor}>
          {isHoliday}
        </Text>
      )}
    </HStack>
  );
};
