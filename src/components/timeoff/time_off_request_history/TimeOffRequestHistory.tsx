import { AttachmentIcon } from '@chakra-ui/icons';
import { VStack, HStack, Tooltip, Flex, Input, Text } from '@chakra-ui/react';
import { RequestHistoryDto } from '../../../model/Pto';
import { StatusRegistrated } from './StatusRegistrated';
import { StatusAccepted } from './StatusAccepted';
import { StatusRejected } from './StatusRejected';
import { StatusMarkedWithdraw } from './StatusMarkedWithdraw';
import { StatusWithdrawn } from './StatusWithdrawn';
import { StatusWithdrawnDeclined } from './StatusWithdrawnDeclined';

interface Props {
  history: RequestHistoryDto;
}

export const TimeOffRequestHistory = ({ history }: Props) => {
  return (
    <VStack key={history.historyId} align={'start'} borderRadius={'20px'} p={2}>
      <HStack>
        {history.action === 'REGISTER' && <StatusRegistrated />}
        {history.action === 'ACCEPTED' && <StatusAccepted />}
        {history.action === 'DECLINED' && <StatusRejected />}
        {history.action === 'MARKED_WITHDRAW' && <StatusMarkedWithdraw />}
        {history.action === 'WITHDRAW' && <StatusWithdrawn />}
        {history.action === 'WITHDRAW_DECLINED' && <StatusWithdrawnDeclined />}
        <Flex>
          <Text>{new Date(history.dateTime).toLocaleString('pl-PL')}</Text>
        </Flex>
        <Flex>
          <Text>
            {history.firstName} {history.lastName}
          </Text>
        </Flex>
      </HStack>
      <Input
        w={'500px'}
        h={'fit-content'}
        isDisabled
        value={history.notes ? history.notes : 'Brak uwag'}
        resize={'none'}
        _disabled={{
          cursor: 'default',
        }}
      />
    </VStack>
  );
};
