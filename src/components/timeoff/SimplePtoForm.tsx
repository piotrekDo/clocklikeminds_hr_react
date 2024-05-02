import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/react';
import usePtoRequestState from '../../state/usePtoRequestState';

export const SimplePtoForm = () => {
  const options = { timeZone: 'Europe/Warsaw' };
  const { startDate, endDate, setStartDate, setEndDate } = usePtoRequestState();
  console.log(startDate);
  console.log(startDate && startDate.toISOString());
  console.log(startDate && startDate.toLocaleString('sv', options));
  const defaultStartDate = startDate ? startDate.toLocaleString('sv', options).slice(0, 10) : '';
  const defaultEndDate = endDate ? endDate.toLocaleString('sv', options).slice(0, 10) : '';

  return (
    <Box>
      <HStack>
        <InputGroup>
          <InputLeftAddon>Od</InputLeftAddon>
          <Input type='date' value={defaultStartDate} onChange={e => setStartDate(new Date(e.target.value))} />
        </InputGroup>
        <InputGroup>
          <Input type='date' value={defaultEndDate} onChange={e => setEndDate(new Date(e.target.value))} />
          <InputRightAddon>Do</InputRightAddon>
        </InputGroup>
      </HStack>
    </Box>
  );
};
