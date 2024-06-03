import { Button, Flex, Input, VStack, useToast, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import useHttpErrorState from '../../../state/useHttpErrorState';
import useNewHolidayOnSaturday from '../../../hooks/useNewHolidayOnSaturday';
import { HolidayOnSaturday } from '../../../model/Pto';

export const CustomHolidayOnSaturday = () => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [isSaturday, setIsSaturday] = useState(false);
  const notesRef = useRef<HTMLInputElement>(null);
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isSuccess, isLoading, isError, error } = useNewHolidayOnSaturday();

  useEffect(() => {
    if (isError) {
      setError(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
      toast({
        title: 'Dodano dzień urlopowy',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
    }
  }, [isSuccess]);

  const checkIfSaturday = (date: string): boolean => {
    if (!date) return false;
    const day = new Date(date);
    return day.getDay() === 6;
  };

  const handleSubmit = () => {
    if (!date || !notesRef.current) return;
    const holidayRequest: HolidayOnSaturday = {
      id: 0,
      date: date,
      note: notesRef.current?.value,
    };
    sendRequest(holidayRequest);
  };

  return (
    <VStack
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      position={'relative'}
      spacing={1}
      bg={'#385898'}
      p={3}
      borderRadius={'20px'}
      minW={'300px'}
      overflow={'hidden'}
    >
      <Flex
        position={'absolute'}
        top={0}
        left={0}
        zIndex={10}
        w={'100%'}
        h={'100%'}
        bg={'rgba(56,88,152,.95)'}
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        transform={isEditing ? 'translateX(100%)' : ''}
        transitionProperty={'transform'}
        transitionDuration={'.35s'}
        onClick={e => setIsEditing(true)}
      >
        <Text as={'i'} color={'whiteAlpha.800'} fontSize={'1.4rem'} fontWeight={'800'}>
          Stwórz własne
        </Text>
      </Flex>
      <Input
        size={'sm'}
        type='date'
        color={'whiteAlpha.800'}
        onChange={e => {
          setDate(e.target.value);
          checkIfSaturday(e.target.value) ? setIsSaturday(true) : setIsSaturday(false);
        }}
      />
      <Input
        size={'sm'}
        ref={notesRef}
        color={'whiteAlpha.800'}
        placeholder='notka'
        _placeholder={{ color: 'whiteAlpha.700' }}
      />
      <Button w={'100%'} size={'sm'} isDisabled={!date || !isSaturday} onClick={handleSubmit}>
        {!date && 'Wybierz datę'}
        {date && !isSaturday && 'Wybrany dzień nie jest sobotą'}
        {date && isSaturday && 'Wyślij'}
      </Button>
    </VStack>
  );
};
