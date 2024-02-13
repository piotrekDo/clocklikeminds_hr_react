import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { CalendarGrid } from './CalendarGrid';
import usePtoRequestsForSelectedYear from '../../hooks/usePtoRequestsForSelectedyear';
import useAuthentication from '../../state/useAuthentication';

export const Calendar = () => {
  const { appUser } = useAuthentication();
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());
  const { data: ptos, isFetching } = usePtoRequestsForSelectedYear(appUser?.userId || -1, selectedYear.getFullYear());

  const onArrowRightClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() + 1, 0, 1));
  };

  const onArrowLeftClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() - 1, 0, 1));
  };

  return (
    <VStack bg={'#F5F4F6'} w={'600px'} h={'800px'} borderRadius={'20px'} p={5} position={'relative'}>
      <HStack justifyContent={'center'} alignItems={'center'} spacing={3}>
        <MdOutlineArrowBackIosNew cursor={'pointer'} onClick={onArrowLeftClickHandler} />
        <Text>{selectedYear.getFullYear()}</Text>
        <MdOutlineArrowForwardIos cursor={'pointer'} onClick={onArrowRightClickHandler} />
        {isFetching && (
          <HStack position={'absolute'} right={10}>
            <Text fontSize={'.7rem'}>odświeżam...</Text>
            <Box>
              <Spinner size={'sm'} />
            </Box>
          </HStack>
        )}
      </HStack>
      <CalendarGrid selectedYear={selectedYear} daysOff={ptos || []}/>
    </VStack>
  );
};
