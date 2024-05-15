import { Box, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import usePtoRequestsForSelectedYear from '../../hooks/usePtoRequestsForSelectedyear';
import useAuthentication from '../../state/useAuthentication';
import { CalendarGrid } from './CalendarGrid';
import { PtoCard } from '../timeoff/PtoCard';

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
      position={'relative'}
      overflow={'hidden'}
      bg={'#385898'}
      opacity={'.9'}
      py={1}
      w={'100%'}
      maxH={'calc(100vh - 100px)'}
      borderRadius={'20px'}
      px={{ base: 2, monitorM: 5 }}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      color={'whiteAlpha.900'}
    >
      {/* <Flex position={'absolute'} top={0} w={'100%'} bg={'#385898'} justifyContent={'center'} pt={1} alignContent={'center'}>
        <PtoCard pto={ptos[0]}/>
      </Flex> */}
      <HStack
        w={'100%'}
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
          <HStack position={'absolute'} right={150}>
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
