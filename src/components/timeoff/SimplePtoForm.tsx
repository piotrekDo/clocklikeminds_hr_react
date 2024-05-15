import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/react';
import usePtoRequestState from '../../state/usePtoRequestState';

interface Props {
  isLoading: boolean;
}

export const SimplePtoForm = ({ isLoading }: Props) => {
  const { startDate, endDate, setStartDate, setEndDate } = usePtoRequestState();
  const defaultStartDate = startDate ? startDate.toISOString().slice(0, 10) : '';
  const defaultEndDate = endDate ? endDate.toISOString().slice(0, 10) : '';

  return (
    <Box>
      <HStack>
        <InputGroup>
          <InputLeftAddon bg={'#385898'} color={'whiteAlpha.900'}>
            Od
          </InputLeftAddon>
          <Input
            isDisabled={isLoading}
            type='date'
            value={defaultStartDate}
            onChange={e => {
              const localDate = new Date(e.target.value);
              const startDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
              setStartDate(startDate);
            }}
          />
        </InputGroup>
        <InputGroup>
          <Input
            isDisabled={isLoading}
            type='date'
            
            value={defaultEndDate}
            onChange={e => {
              const localDate = new Date(e.target.value);
              const endDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
              setEndDate(endDate);
            }}
          />
          <InputRightAddon bg={'#385898'} color={'whiteAlpha.900'}>
            Do
          </InputRightAddon>
        </InputGroup>
      </HStack>
    </Box>
  );
};
