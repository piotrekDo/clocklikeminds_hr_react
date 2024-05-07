import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import usePtoRequestsForSelectedYear from '../../hooks/usePtoRequestsForSelectedyear';
import useAuthentication from '../../state/useAuthentication';
import { CalendarGrid } from './CalendarGrid';

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
    <VStack
      // bg={'rgba(66, 68, 90, 1)'}
      py={1}
      w={'100%'}
      maxH={'calc(100vh - 100px)'}
      borderRadius={'20px'}
      px={{ base: 2, monitorM: 5 }}
      position={'relative'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      color={'whiteAlpha.900'}
    >
      <HStack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={3}
        _hover={{ transform: 'scale(1.4)' }}
        transition={'transform .15s ease-in'}
      >
        <MdOutlineArrowBackIosNew cursor={'pointer'} onClick={onArrowLeftClickHandler} />
        <Text as={'b'}>{selectedYear.getFullYear()}</Text>
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
      <CalendarGrid selectedYear={selectedYear} daysOff={ptos || []} />
    </VStack>
  );
};
