import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/react';
import usePtoRequestState from '../../state/usePtoRequestState';

interface Props {
  isLoading: boolean;
  isSimplified: boolean;
}

export const PtoDatesForm = ({ isLoading, isSimplified }: Props) => {
  const { startDate, endDate, setStartDate, setEndDate } = usePtoRequestState();
  const defaultStartDate = startDate ? startDate.toISOString().slice(0, 10) : '';
  const defaultEndDate = endDate ? endDate.toISOString().slice(0, 10) : '';

  return (
    <Box>
      <HStack>
        <InputGroup>
          <InputLeftAddon bg={'#385898'} color={'whiteAlpha.900'}>
            {(!isSimplified && 'Od') || 'W dniu'}
          </InputLeftAddon>
          <Input
            border={'solid 2px'}
            isDisabled={isLoading}
            type='date'
            value={defaultStartDate}
            onChange={e => {
              const val = e.target.value;
              let localDate;
              if (val) {
                localDate = new Date(val);
              }
              const newStartDate =
                localDate && new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
              setStartDate(newStartDate);
              if (isSimplified) {
                setEndDate(newStartDate);
              }
            }}
          />
        </InputGroup>
        {!isSimplified && (
          <InputGroup>
            <Input
              border={'solid 2px'}
              isDisabled={isLoading}
              type='date'
              value={defaultEndDate}
              onChange={e => {
                const val = e.target.value;
                let localDate;
                if (val) {
                  localDate = new Date(val);
                }
                const newEndDate =
                  localDate && new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
                setEndDate(newEndDate);
              }}
            />
            <InputRightAddon bg={'#385898'} color={'whiteAlpha.900'} border={'solid 2px'}>
              Do
            </InputRightAddon>
          </InputGroup>
        )}
      </HStack>
    </Box>
  );
};
