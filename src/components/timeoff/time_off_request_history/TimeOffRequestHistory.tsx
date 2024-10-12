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
  size?: string;
}

export const TimeOffRequestHistory = ({ history, size = 'normal' }: Props) => {
  return (
    <VStack
      key={history.historyId}
      align={'start'}
      borderRadius={'20px'}
      p={size === 'small' ? 1 : 2}
      fontSize={size === 'small' ? '.9rem' : '1rem'}
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
          <Text>{new Date(history.dateTime).toLocaleString('pl-PL')}</Text>
        </Flex>
        <Flex>
          <Text>
            {history.firstName} {history.lastName}
          </Text>
        </Flex>
      </HStack>
      {/* <Input
        w={size === 'small' ? '300px' : '500px'}
        h={'fit-content'}
        isDisabled
        value={history.notes ? history.notes : 'Brak uwag'}
        resize={'vertical'}
        _disabled={{
          cursor: 'default',
        }}
      /> */}
      <Text w={size === 'small' ? '300px' : '500px'} border={'1px solid'} borderRadius={'5px'} px={1} as={'em'}>
        {history.notes ? history.notes : 'Brak uwag'}
      </Text>
    </VStack>
  );
};
