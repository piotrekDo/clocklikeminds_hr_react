import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/react';

interface Props {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export const SimplePtoForm = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  const defaultStartDate = startDate ? startDate.toISOString().slice(0, 10) : '';
  const defaultEndDate = endDate ? endDate.toISOString().slice(0, 10) : '';
  console.log(defaultStartDate)
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
