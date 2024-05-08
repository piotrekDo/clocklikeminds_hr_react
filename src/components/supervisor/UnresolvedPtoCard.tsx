import { HStack, Flex, VStack, Box, Text, Tooltip, useAccordion } from '@chakra-ui/react';
import { FaBusinessTime, FaCalendarAlt } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus } from 'react-icons/fa6';
import { CalendarPageIcon } from '../general/CalendarPageIcon';
import { PtoRequestFormatted, ResolvePtoRequest } from '../../model/Pto';
import usePtoComparationStore from '../../state/usePtoComparationState';
import { useState } from 'react';
import useResolvePto from '../../hooks/useResolvePto';
import useAuthentication from '../../state/useAuthentication';

interface Props {
  p: PtoRequestFormatted;
}

export const UnresolvedPtoCard = ({ p }: Props) => {
  const user = useAuthentication(s => s.appUser);
  const setPtoToCompare = usePtoComparationStore(s => s.setPto);
  const [isHoveringDates, setIsHoveringDates] = useState(false);
  const { mutate: sendRequest, isError, error, isLoading } = useResolvePto();

  const handleAcceptPto = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: p.id,
      isAccepted: true,
      declineReason: undefined,
    };
    sendRequest(request);
  };
  return (
    <HStack
      position={'relative'}
      w={'100%'}
      p={3}
      bgColor={'rgba(56, 88, 152, 0.4)'}
      borderRadius={'25px'}
      boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
      my={1}
      flexGrow={0}
      flexShrink={0}
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
      <HStack flexBasis={'100%'} justifyContent={'space-evenly'}>
        <Box>
          {p.applierImageUrl && (
            <Box
              w={'40px'}
              h={'40px'}
              borderRadius={'30px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              overflow={'hidden'}
            >
              <img
                src={p.applierImageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy='no-referrer'
              />
            </Box>
          )}
        </Box>
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
      <HStack
        flexBasis={'100%'}
        justifyContent={'space-around'}
        p={2}
        // overflow={'hidden'}
        onMouseEnter={() => setIsHoveringDates(true)}
        onMouseLeave={() => setIsHoveringDates(false)}
      >
        <VStack
          h={'60px'}
          cursor={'pointer'}
          justifyContent={'space-around'}
          w={'50%'}
          onClick={() => setPtoToCompare(p)}
          //   transition={'transform .25s'} transform={isHoveringDates ? 'translateY(-100px)' : ''}
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
      <Box flexBasis={'100%'}>
        <HStack w={'100%'} justifyContent={'space-evenly'}>
          <FaCircleCheck size={'60px'} color='#00DD00' onClick={handleAcceptPto} cursor={'pointer'}/>
          <FaCircleMinus size={'60px'} color='#FFA0A0' />
        </HStack>
      </Box>
    </HStack>
  );
};
