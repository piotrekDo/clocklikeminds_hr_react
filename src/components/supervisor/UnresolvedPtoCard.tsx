import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaBusinessTime, FaCalendarAlt, FaExclamationCircle, FaUserTie } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus } from 'react-icons/fa6';
import { GiPalmTree } from 'react-icons/gi';
import { MdChildFriendly, MdEventRepeat, MdTimer } from 'react-icons/md';
import useResolvePto from '../../hooks/useResolvePto';
import { PtoRequestFormatted, ResolvePtoRequest } from '../../model/Pto';
import useHttpErrorState from '../../state/useHttpErrorState';
import usePtoModalStore from '../../state/usePtoModalStore';
import { CalendarPageIcon } from '../general/CalendarPageIcon';
import { Freelancer } from '../badges/Freelancer';
import { InfoIcon } from '@chakra-ui/icons';

interface Props {
  p: PtoRequestFormatted;
}

export const UnresolvedPtoCard = ({ p }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setPtoToCompare = usePtoModalStore(s => s.setPtoToCompareDates);
  const setPtoExtendedModal = usePtoModalStore(s => s.setPtoExtendedModal);
  const [isRejecting, setIsRejecting] = useState(false);
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isError, error, isLoading, isSuccess } = useResolvePto();
  const toast = useToast();

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

  const handleAcceptPto = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: p.id,
      isAccepted: true,
      declineReason: undefined,
    };
    sendRequest(request);
  };

  const handleRejectPto = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: p.id,
      isAccepted: false,
      declineReason: (inputRef && inputRef.current?.value) || undefined,
    };

    sendRequest(request);
  };
  return (
    <VStack w={'1000px'} position={'relative'}>
      <Flex
        zIndex={1}
        position={'absolute'}
        justifyContent={'center'}
        alignItems={'center'}
        fontWeight={'800'}
        color={'whiteAlpha.900'}
        top={'-5px'}
        left={0}
        borderRadius={'50px'}
        bg={'#385898'}
        w={'50px'}
        h={'20px'}
        p={1}
        boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
        cursor={'pointer'}
        onClick={() => setPtoExtendedModal(p)}
      >
        ID:{p.id}
      </Flex>
      {p.applicationNotes && (
        <Tooltip label={p.applicationNotes}>
          <Flex zIndex={1} position={'absolute'} top={0} right={'-20px'} cursor={'help'}>
            <FaExclamationCircle size={'40px'} color='wheat' />
          </Flex>
        </Tooltip>
      )}
      {p.applierNotes && (
        <Tooltip label={p.applierNotes}>
          <Flex zIndex={1} position={'absolute'} bottom={0} right={'-20px'} cursor={'pointer'}>
            <InfoIcon fontSize={'40px'} color='green.200' />
          </Flex>
        </Tooltip>
      )}

      <VStack
        w={'100%'}
        position={'relative'}
        pt={3}
        bgColor={'rgba(56, 88, 152, 0.4)'}
        borderRadius={'25px'}
        boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
        mb={3}
        overflow={'hidden'}
      >
        <VStack
          w={'100%'}
          position={'relative'}
          h={!isRejecting ? '90px' : '180px'}
          flexGrow={0}
          flexShrink={0}
          transition={'height .2s ease'}
          overflow={'hidden'}
          justifyContent={'space-between'}
          borderRadius={'0 0 0 25px'}
        >
          <Box
            w={'100px'}
            h={'100px'}
            bg={'red'}
            position={'absolute'}
            left={'-10px'}
            top={'15px'}
            opacity={'.4'}
            borderRadius={'50%'}
          >
            <img
              src={p.applierImageUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              referrerPolicy='no-referrer'
            />
          </Box>
          <HStack w={'100%'}>
            <HStack flexBasis={'100%'} justifyContent={'space-evenly'} ml={10}>
              <Box color={'whiteAlpha.800'} fontWeight={'700'} fontSize={'1.1rem'} position={'relative'}>
                {p.applierFreelancer && (
                  <Box position={'absolute'} right={'-60px'} top={'-15px'} opacity={0.7}>
                    <Freelancer size='2.5rem' />
                  </Box>
                )}
                <Text>{p.applierFirstName}</Text>
                <Text>{p.applierLastName}</Text>
              </Box>
              <Tooltip
                whiteSpace='pre-line'
                label={`Data wniosku:
        ${p.requestDateTime.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}
        ${p.requestDateTime.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`}
              >
                <Box>
                  <CalendarPageIcon date={p.requestDateTime} />
                </Box>
              </Tooltip>
            </HStack>
            <HStack flexBasis={'100%'} justifyContent={'space-around'} p={2}>
              <VStack
                h={'60px'}
                cursor={'pointer'}
                justifyContent={'space-around'}
                w={'50%'}
                onClick={() => setPtoToCompare(p)}
              >
                <Tooltip
                  label={`${p.ptoStart.toLocaleString('pl-PL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })} - ${p.ptoEnd.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' })}`}
                >
                  <HStack>
                    <CalendarPageIcon date={p.ptoStart} />
                    <CalendarPageIcon date={p.ptoEnd} />
                  </HStack>
                </Tooltip>
              </VStack>
              <Box cursor={'help'} color={'whiteAlpha.800'}>
                {p.leaveType === 'pto' && (
                  <Tooltip label='Wypoczynkowy'>
                    <Box>
                      <GiPalmTree size={'40px'} />
                    </Box>
                  </Tooltip>
                )}
                {p.leaveType === 'pto_on_demand' && (
                  <Tooltip label='Na żądanie'>
                    <Box>
                      <MdTimer size={'40px'} />
                    </Box>
                  </Tooltip>
                )}
                {p.leaveType === 'on_saturday_pto' && (
                  <Tooltip label={`Odbiór za święto w sobotę: ${p.saturday_holiday_date}`}>
                    <Box>
                      <MdEventRepeat size={'40px'} />
                    </Box>
                  </Tooltip>
                )}
                {p.leaveType === 'occasional_leave' && (
                  <Tooltip label={`Okolicznościowy: ${p.occasional_descriptionPolish}`}>
                    <Box>
                      <FaUserTie size={'40px'} />
                    </Box>
                  </Tooltip>
                )}
                {p.leaveType === 'child_care' && (
                  <Tooltip label='Opieka nad dzieckiem'>
                    <Box>
                      <MdChildFriendly size={'40px'} />
                    </Box>
                  </Tooltip>
                )}
              </Box>
              <VStack borderRadius={'20px'} color={'whiteAlpha.800'} fontWeight={'700'}>
                <HStack>
                  <FaBusinessTime />
                  <Box>{p.businessDays}</Box>
                </HStack>
                <HStack>
                  <FaCalendarAlt />
                  <Box>{p.totalDays}</Box>
                </HStack>
              </VStack>
            </HStack>
            <Box flexBasis={'50%'}>
              <HStack w={'100%'} justifyContent={'space-evenly'}>
                <Tooltip label='Zaakceptuj'>
                  <Box
                    w={'60px'}
                    borderRadius={'50%'}
                    _hover={{ w: '70px', boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)' }}
                    transition={'all .25s ease'}
                  >
                    <FaCircleCheck size={'100%'} color='#00DD00' cursor={'pointer'} onClick={handleAcceptPto} />
                  </Box>
                </Tooltip>
                <Tooltip label='Odrzuć'>
                  <Box
                    w={'60px'}
                    borderRadius={'50%'}
                    _hover={{ w: '70px', boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)' }}
                    transition={'all .25s ease'}
                  >
                    <FaCircleMinus
                      size={'100%'}
                      color='#FFA0A0'
                      cursor={'pointer'}
                      onClick={e => setIsRejecting(s => !s)}
                    />
                  </Box>
                </Tooltip>
              </HStack>
            </Box>
          </HStack>
          <HStack w={'100%'} h={'80px'} alignItems={'center'} display={!isRejecting ? 'none' : 'flex'} px={5}>
            <InputGroup border={'transparent'} boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}>
              <InputLeftAddon bg={'transparent'} color={'whiteAlpha.800'} as={'em'} fontWeight={'700'}>
                Powód odmowy:
              </InputLeftAddon>
              <Input
                ref={inputRef}
                color={'whiteAlpha.900'}
                placeholder='Opcjonalnie'
                _placeholder={{ color: 'whiteAlpha.500' }}
              />
              <InputRightAddon bg={'transparent'} p={0}>
                <Button colorScheme='red' w={'100%'} onClick={handleRejectPto}>
                  Odrzuc
                </Button>
              </InputRightAddon>
            </InputGroup>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
