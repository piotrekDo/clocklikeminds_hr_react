import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/react';
import usePtoRequestState from '../../state/usePtoRequestState';

export const SimplePtoForm = () => {
  const { startDate, endDate, setStartDate, setEndDate } = usePtoRequestState();
  const defaultStartDate = startDate ? startDate.toISOString().slice(0, 10) : '';
  const defaultEndDate = endDate ? endDate.toISOString().slice(0, 10) : '';

  return (
    <Box>
      <HStack>
        <InputGroup>
          <InputLeftAddon>Od</InputLeftAddon>
          <Input
            type='date'
            value={defaultStartDate}
            onChange={e => {
              const localDate = new Date(e.target.value);
              setStartDate(new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())));
            }}
          />
        </InputGroup>
        <InputGroup>
          <Input
            type='date'
            value={defaultEndDate}
            onChange={e => {
              const localDate = new Date(e.target.value);
              setEndDate(new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())));
            }}
          />
          <InputRightAddon>Do</InputRightAddon>
        </InputGroup>
      </HStack>
    </Box>
  );
};
