import { Button, HStack, Text, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HolidayOnSaturday } from '../../../model/Pto';
import { CalendarPageIcon } from '../../general/CalendarPageIcon';
import useNewHolidayOnSaturday from '../../../hooks/useNewHolidayOnSaturday';
import useHttpErrorState from '../../../state/useHttpErrorState';

interface Props {
  holiday: HolidayOnSaturday;
  inDays: number;
}

export const UpcomingSaturdayHoliday = ({ holiday, inDays }: Props) => {
  const toast = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isSuccess, isLoading, isError, error } = useNewHolidayOnSaturday();

  useEffect(() => {
    if (isError) {
      setError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setIsHovering(false);
      setWasClicked(false);
      toast({
        title: 'Dodano dzień urlopowy',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    const holidayRequest: HolidayOnSaturday = {
      id: 0,
      date: holiday.date,
      note: holiday.note,
    };
    sendRequest(holidayRequest);
  };

  return (
    <HStack
    boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}

      cursor={'pointer'}
      overflow={'hidden'}
      position={'relative'}
      p={'3'}
      borderRadius={'20px'}
      bg={'#385898'}
      onMouseEnter={() => {
        if (isLoading) return;
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (wasClicked || isLoading) return;
        setIsHovering(false);
      }}
    >
      {!isLoading && (
        <>
          <HStack filter={!isHovering ? '' : 'blur(2px)'}>
            <CalendarPageIcon date={new Date(holiday.date)} />
            <VStack color={'whiteAlpha.800'}>
              <Text>{holiday.note}</Text>
              <Text>Pozostało {inDays} dni</Text>
            </VStack>
          </HStack>
          <HStack
            w={'110%'}
            h={'100%'}
            bg={'rgba(56,88,152,.8)'}
            spacing={0}
            position={'absolute'}
            justifyContent={'center'}
            alignItems={'center'}
            transform={!isHovering ? 'translateX(105%)' : 'translateX(-10%)'}
            transitionProperty={'transform'}
            transitionDuration={'.25s'}
            transitionTimingFunction={'ease'}
            onClick={() => setWasClicked(true)}
          >
            {!wasClicked && (
              <Text as={'i'} color={'whiteAlpha.800'} fontWeight={'700'}>
                Wyślij
              </Text>
            )}
            {wasClicked && (
              <>
                <Button
                  opacity={0.7}
                  fontSize={'1.2rem'}
                  as={'i'}
                  fontWeight={'700'}
                  w={'100%'}
                  h={'100%'}
                  borderRadius={0}
                  onClick={handleSubmit}
                  colorScheme='green'
                >
                  Tak
                </Button>
                <Button
                  fontSize={'1.2rem'}
                  as={'i'}
                  fontWeight={'700'}
                  opacity={0.7}
                  colorScheme='yellow'
                  w={'100%'}
                  h={'100%'}
                  borderRadius={0}
                  onClick={e => {
                    e.stopPropagation();
                    setWasClicked(false);
                  }}
                >
                  Anuluj
                </Button>
              </>
            )}
          </HStack>
        </>
      )}
    </HStack>
  );
};
