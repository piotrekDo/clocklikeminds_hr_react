import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { MdEventRepeat } from 'react-icons/md';
import { UserPtoSummary } from '../../model/Pto';
import usePtoRequestState from '../../state/usePtoRequestState';
import { CalendarPageIcon } from '../general/CalendarPageIcon';

interface Props {
  isUserActive: boolean;
  summary: UserPtoSummary | undefined;
  isFetching: boolean;
}

export const PtoDaysLeftUsedSummary = ({ isUserActive, summary, isFetching }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setIsRequestingPto = usePtoRequestState(s => s.setIsRequestingPto);
  const hasUnusedHolidayOnSaturday: boolean =
    summary && summary?.saturdayHolidaysCurrentYear.filter(holiday => !holiday.usedDate).length > 0 ? true : false;

  const onUseHolidayOnSaturday = () => {
    onClose();
    setIsRequestingPto(true);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'1.1rem'}>Naliczone dni wolne za święta w sobotę w bieżącym roku</ModalHeader>
          <ModalCloseButton />
          <ModalBody w={'100%'}>
            {!summary?.saturdayHolidaysCurrentYear && <Text>Brak naliczonych dni wolnych</Text>}
            {summary?.saturdayHolidaysCurrentYear &&
              summary.saturdayHolidaysCurrentYear.map(holiday => {
                const holidayDate = new Date(holiday.date);
                const ptoDate = holiday.usedDate ? new Date(holiday.usedDate) : undefined;
                return (
                  <HStack w={'500px'} justifyContent={'center'} mt={4}>
                    <Box w={'200px'}>
                      <CalendarPageIcon date={holidayDate} size='md' />
                    </Box>
                    <Box flexBasis={'100%'}>
                      <Text ml={4} fontSize={'1.4rem'} as={'i'} fontWeight={'600'}>
                        {holiday.note}
                      </Text>
                    </Box>
                    {ptoDate && (
                      <HStack flexBasis={'100%'}>
                        <Text>wykorzystany: </Text>
                        <CalendarPageIcon date={ptoDate} />
                      </HStack>
                    )}
                    {!ptoDate && (
                      <Flex flexBasis={'100%'}>
                        <Button flexBasis={'100%'} onClick={onUseHolidayOnSaturday}>
                          Wykorzystaj
                        </Button>
                      </Flex>
                    )}
                  </HStack>
                );
              })}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <VStack position={'relative'} w={'100%'} p={5}>
        <Tooltip label='Dni świąteczne w sobotę'>
          <Box position={'absolute'} onClick={onOpen} top={2} right={2} cursor={'pointer'}>
            {hasUnusedHolidayOnSaturday && (
              <Box w={'15px'} h={'15px'} borderRadius={'50%'} bg={'red'} position={'absolute'} top={0} left={0}></Box>
            )}
            <MdEventRepeat color={'#385898'} size={'40px'} />
          </Box>
        </Tooltip>
        <Text w={'100%'} fontSize={'1.3rem'} textAlign={'center'} as={'b'}>
          Podsumowanie
        </Text>
        {isUserActive && (
          <HStack fontSize={'1.2rem'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <VStack spacing={0}>
              {!isFetching && summary && (
                <Tooltip label={`W tym pozostałe z zeszłego roku ${summary.ptoDaysAccruedLastYear}`}>
                  <Text as={'em'}>{summary.ptoDaysAccruedLastYear + summary.ptoDaysAccruedCurrentYear}</Text>
                </Tooltip>
              )}
              {isFetching && <Spinner />}
              <Text as={'b'}>Naliczone</Text>
            </VStack>
            <VStack spacing={0}>
              {!isFetching && summary && (
                <Tooltip label={`W tym dni z ubiegłego roku ${summary.ptoDaysLeftFromLastYear}`}>
                  <Text as={'em'}>{summary.ptoDaysLeftFromLastYear + summary.ptoDaysLeftCurrentYear}</Text>
                </Tooltip>
              )}
              {isFetching && <Spinner />}
              <Text as={'b'}>Pozostałe</Text>
            </VStack>
            <VStack spacing={0}>
              {!isFetching && summary && <Text as={'em'}>{summary.ptoDaysTaken}</Text>}
              {isFetching && <Spinner />}
              <Text as={'b'}>Wykorzystane</Text>
            </VStack>
          </HStack>
        )}
        {!isUserActive && (
          <HStack fontSize={'1.2rem'} minW={'300px'} w={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <Text as={'b'}>Konto nieaktywne</Text>
          </HStack>
        )}
      </VStack>
    </>
  );
};
