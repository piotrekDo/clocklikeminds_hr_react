import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import usePtoRequestsForSelectedYear from '../../hooks/usePtoRequestsForSelectedyear';
import useAuthentication from '../../state/useAuthentication';
import { CalendarGrid } from './CalendarGrid';
import { PtoRequestFormatted } from '../../model/Pto';
import { CalendarPtoDetails } from './CalendarPtoDetails';

export const Calendar = () => {
  const { appUser } = useAuthentication();
  const [showPto, setShowPto] = useState<PtoRequestFormatted | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());
  const { data: ptos, isFetching } = usePtoRequestsForSelectedYear(appUser?.userId || -1, selectedYear.getFullYear());

  const onArrowRightClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() + 1, 0, 1));
  };

  const onArrowLeftClickHandler = () => {
    setSelectedYear(s => new Date(s.getFullYear() - 1, 0, 1));
  };

  return (
    <Box w={'100%'} h={'100%'} position={'relative'}>
      <VStack
        position={'relative'}
        bg={'#385898'}
        py={{base: 0, monitorM: 5}}
        w={'100%'}
        maxH={'calc(100vh - 100px)'}
        borderRadius={'20px'}
        px={{ base: 2, monitorM: 5 }}
        color={'whiteAlpha.900'}
        zIndex={10}
        spacing={1}
        filter={'drop-shadow(8px 5px 10px black)'}

      >
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
        <CalendarGrid selectedYear={selectedYear} daysOff={ptos || []} setShowPto={setShowPto} />
      </VStack>
      <Box
        borderRadius={'20px'}
        pos={'absolute'}
        top={'15px'}
        left={!showPto ? '10px' : '-400px'}
        transitionProperty={'left'}
        transitionDuration={'.2s'}
      >
        <CalendarPtoDetails timeOff={showPto} onClosePtoDetailshandler={() => setShowPto(undefined)} />
      </Box>
    </Box>
  );
};
