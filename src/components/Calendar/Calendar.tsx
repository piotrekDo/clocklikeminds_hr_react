import { HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { CalendarGrid } from './CalendarGrid';

export const Calendar = () => {
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());

  const onArrowRightClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() + 1, 0, 1));
  };

  const onArrowLeftClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() - 1, 0, 1));
  };

  return (
    <VStack bg={'#F5F4F6'} w={'600px'} h={'800px'} borderRadius={'20px'} p={5}>
      <HStack justifyContent={'center'} alignItems={'center'} spacing={3}>
        <MdOutlineArrowBackIosNew cursor={'pointer'} onClick={onArrowLeftClickHandler} />
        <Text>{selectedYear.getFullYear()}</Text>
        <MdOutlineArrowForwardIos cursor={'pointer'} onClick={onArrowRightClickHandler} />
      </HStack>
      <CalendarGrid selectedYear={selectedYear} />
    </VStack>
  );
};
