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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaBusinessTime, FaCalendarAlt } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus } from 'react-icons/fa6';
import useResolvePto from '../../hooks/useResolvePto';
import { PtoRequestFormatted, ResolvePtoRequest } from '../../model/Pto';
import useAuthentication from '../../state/useAuthentication';
import usePtoComparationStore from '../../state/usePtoComparationState';
import { CalendarPageIcon } from '../general/CalendarPageIcon';

interface Props {
  p: PtoRequestFormatted;
}

export const UnresolvedPtoCard = ({ p }: Props) => {
  const user = useAuthentication(s => s.appUser);
  const inputRef = useRef<HTMLInputElement>(null);
  const setPtoToCompare = usePtoComparationStore(s => s.setPto);
  const [isRejecting, setIsRejecting] = useState(false);
  const { mutate: sendRequest, isError, error, isLoading } = useResolvePto();

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
    <VStack
      w={'100%'}
      maxW={'1100px'}
      position={'relative'}
      pt={3}
      bgColor={'rgba(56, 88, 152, 0.4)'}
      borderRadius={'25px'}
      boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
      mb={3}
    >
      <Flex
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
      >
        ID:{p.id}
      </Flex>
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
          bottom={'-20px'}
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
            <Box color={'whiteAlpha.800'} fontWeight={'700'} fontSize={'1.1rem'}>
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
              <HStack>
                <CalendarPageIcon date={p.ptoStart} />
                <CalendarPageIcon date={p.ptoEnd} />
              </HStack>
            </VStack>
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
  );
};
