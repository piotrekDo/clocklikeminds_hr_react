import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { RequestHistoryDto } from '../../../model/Pto';
import { StatusAccepted } from './StatusAccepted';
import { StatusMarkedWithdraw } from './StatusMarkedWithdraw';
import { StatusRegistrated } from './StatusRegistrated';
import { StatusRejected } from './StatusRejected';
import { StatusWithdrawn } from './StatusWithdrawn';
import { StatusWithdrawnDeclined } from './StatusWithdrawnDeclined';

interface Props {
  history: RequestHistoryDto;
  size?: Size;
}

type Size = 'normal' | 'sm' | 'xs';

export const TimeOffRequestHistory = ({ history, size = 'normal' }: Props) => {
  return (
    <VStack
      key={history.historyId}
      align={'start'}
      borderRadius={'20px'}
      p={size === 'normal' ? 2 : 1}
      fontSize={size === 'normal' ? '1rem' : '.9rem'}
      w={'100%'}
    >
      <HStack>
        <Box color={'black'}>
          {history.action === 'REGISTER' && <StatusRegistrated />}
          {history.action === 'ACCEPTED' && <StatusAccepted />}
          {history.action === 'DECLINED' && <StatusRejected />}
          {history.action === 'MARKED_WITHDRAW' && <StatusMarkedWithdraw />}
          {history.action === 'WITHDRAW' && <StatusWithdrawn />}
          {history.action === 'WITHDRAW_DECLINED' && <StatusWithdrawnDeclined />}
        </Box>
        <Flex>
          <Text fontSize={size === 'xs' ? '.7rem' : ''}>{new Date(history.dateTime).toLocaleString('pl-PL')}</Text>
        </Flex>
        <Flex>
          <Text fontSize={size === 'xs' ? '.7rem' : ''}>
            {history.firstName} {history.lastName}
          </Text>
        </Flex>
      </HStack>
      <Text
        w={size === 'normal' ? '500px' : size === 'sm' ? '300px' : '100%'}
        border={'1px solid'}
        borderRadius={'5px'}
        px={1}
        as={'em'}
        fontSize={size === 'xs' ? '.8rem' : ''}
      >
        {history.notes ? history.notes : 'Brak uwag'}
      </Text>
    </VStack>
  );
};
