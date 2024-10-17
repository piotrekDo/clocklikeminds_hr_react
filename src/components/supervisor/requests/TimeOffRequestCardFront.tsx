import { Box, Button, Flex, HStack, Input, Text, Tooltip, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { LuCalendarClock, LuCalendarOff } from 'react-icons/lu';
import { MdOutlineEditCalendar } from 'react-icons/md';
import child_care from '../../../assets/child_care_leave.jpeg';
import holiday_summer from '../../../assets/holiday_summer.jpeg';
import occasional_leave from '../../../assets/occasional_leave.jpg';
import on_request_holiday from '../../../assets/pto_on_request.jpg';
import saturday_holiday from '../../../assets/saturday_holiday.jpg';
import useResolvePto from '../../../hooks/useResolvePto';
import { PtoRequestFormatted, ResolvePtoRequest } from '../../../model/Pto';
import useHttpErrorState from '../../../state/useHttpErrorState';
import usePtoModalStore from '../../../state/usePtoModalStore';

interface Props {
  request: PtoRequestFormatted;
}

const leaveTypePolish = new Map<string, string>([
  ['pto', 'Urlop wypoczynkowy'],
  ['pto_on_demand', 'Urlop na żądanie'],
  ['occasional_leave', 'Urlop okolicznościowy'],
  ['child_care', 'Opieka nad dzieckiem'],
  ['on_saturday_pto', 'Odbiór za święto w sobotę'],
]);
const bg = new Map<string, string>([
  ['pto', holiday_summer],
  ['pto_on_demand', on_request_holiday],
  ['occasional_leave', occasional_leave],
  ['child_care', child_care],
  ['on_saturday_pto', saturday_holiday],
]);

type Resolve = 'accept' | 'reject' | undefined;

export const TimeOffRequestCardFront = ({ request }: Props) => {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const setPtoToCompare = usePtoModalStore(s => s.setPtoToCompareDates);
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isError, error, isLoading, isSuccess } = useResolvePto();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isResolvig, setIsResolving] = useState<Resolve>(undefined);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Wniosek rozpatrzony poprawnie',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    isError && setError(error);
  }, [isError]);

  const handleResolveRequest = () => {
    const resolve: ResolvePtoRequest = {
      ptoRequestId: request.id,
      isAccepted: (isResolvig && isResolvig === 'accept') || false,
      notes: (inputRef && inputRef.current?.value) || undefined,
    };
    sendRequest(resolve);
  };

  return (
    <VStack
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      overflow={'hidden'}
      boxShadow={'4px 4px 24px 0px rgba(66, 68, 90, 1)'}
      style={{ backfaceVisibility: 'hidden' }}
      onMouseEnter={e => !isResolvig && setIsHovering(true)}
      onMouseLeave={e => setIsHovering(false)}
    >
      <Box pos={'absolute'} w={'100%'} h={'100%'} bgImage={bg.get(request.leaveType)} bgPos={'center'} opacity={0.25} />
      <Box pos={'absolute'} bottom={0} left={isHovering ? 0 : '-50%'} w={'50%'} transition={'left .15s'} zIndex={1000}>
        <Button
          colorScheme='green'
          w={'100%'}
          borderRadius={0}
          onClick={e => {
            e.stopPropagation();
            setIsHovering(false);
            setIsResolving('accept');
          }}
        >
          Zaakceptuj
        </Button>
      </Box>
      <Box
        pos={'absolute'}
        bottom={0}
        right={isHovering ? 0 : '-50%'}
        w={'50%'}
        transition={'right .15s'}
        zIndex={1000}
      >
        <Button
          colorScheme='red'
          w={'100%'}
          borderRadius={0}
          onClick={e => {
            e.stopPropagation();
            setIsHovering(false);
            setIsResolving('reject');
          }}
        >
          Odrzuć
        </Button>
      </Box>
      {isResolvig && (
        <VStack pos={'absolute'} w={'100%'} bottom={0}>
          <Box
            w={'90%'}
            zIndex={1000}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Input
              ref={inputRef}
              color={'whiteAlpha.900'}
              placeholder='Uwagi (opcjonalnie)'
              _placeholder={{ color: 'whiteAlpha.500' }}
            />
          </Box>
          <HStack w={'100%'} spacing={0}>
            <Button
              w={'100%'}
              borderRadius={0}
              colorScheme={isResolvig === 'accept' ? 'green' : 'red'}
              zIndex={1000}
              onClick={e => {
                e.stopPropagation();
                handleResolveRequest();
              }}
            >
              {isResolvig === 'accept' ? 'Zaakceptuj' : 'Odrzuć'}
            </Button>
            <Button
              w={'100%'}
              borderRadius={0}
              colorScheme='yellow'
              zIndex={1000}
              onClick={e => {
                e.stopPropagation();
                setIsResolving(undefined);
              }}
            >
              Anuluj
            </Button>
          </HStack>
        </VStack>
      )}
      <VStack zIndex={100} w={'100%'} h={'100%'} color={'whiteAlpha.800'} fontWeight={'600'} fontSize={'1.2rem'}>
        <HStack w={'100%'} justify={'start'}>
          <Flex>
            {request.applierImageUrl ? (
              <img
                src={request.applierImageUrl}
                style={{
                  width: '3rem',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  opacity: 0.9,
                  filter: 'blur(1px)',
                }}
                referrerPolicy='no-referrer'
              />
            ) : (
              <FaRegCircleUser filter='blur(2px)' opacity={0.4} size={'100%'} />
            )}
          </Flex>
          <Text fontSize={'1.3rem'} fontWeight={'700'}>
            {request.applierFirstName} {request.applierLastName}
          </Text>
        </HStack>
        <VStack minH={'3.5rem'}>
          <Text>{leaveTypePolish.get(request.leaveType)}</Text>
          {request.leaveType === 'occasional_leave' && <Text>{request.occasional_descriptionPolish}</Text>}
          {request.leaveType === 'on_saturday_pto' && (
            <Text>
              {request.saturday_holiday_date} {request.saturday_holiday_desc}
            </Text>
          )}
        </VStack>
        <HStack
          boxShadow={'4px 4px 14px 0px rgba(60, 70, 90, 1)'}
          p={2}
          borderRadius={'5px'}
          transition={'transform .2s'}
          _hover={{ transform: 'scale(1.2)', transition: 'transform .2s' }}
          onClick={e => {
            e.stopPropagation();
            setPtoToCompare(request);
          }}
        >
          <Text>{request.ptoStart.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
          <Text>-</Text>
          <Text>{request.ptoEnd.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
        </HStack>
        <HStack>
          <Text>Dni roboczych: {request.businessDays}</Text>
        </HStack>
        <HStack fontSize={'1.3rem'} w={'200px'} justify={'space-evenly'}>
          <VStack>
            <Tooltip label='Łącznie dni naliczonych'>
              <Box>
                <MdOutlineEditCalendar />
              </Box>
            </Tooltip>
            <Text>{request.applierPtoDaysTaken + request.applierPtoDaysTotal}</Text>
          </VStack>
          <VStack>
            <Tooltip label='Łącznie dni wykorzystanych'>
              <Box>
                <LuCalendarOff />
              </Box>
            </Tooltip>
            <Text>{request.applierPtoDaysTaken}</Text>
          </VStack>
          <VStack>
            <Tooltip label='Dni pozostałych'>
              <Box>
                <LuCalendarClock />
              </Box>
            </Tooltip>
            <Text>{request.applierPtoDaysTotal}</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
