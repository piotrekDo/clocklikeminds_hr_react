import { Box, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaBusinessTime, FaCalendarAlt } from 'react-icons/fa';
import { GoCheckCircleFill, GoClockFill, GoXCircleFill } from 'react-icons/go';
import { MdSupervisorAccount } from 'react-icons/md';
import { PtoRequestResponse } from '../../model/Pto';
import { CalendarPageIcon } from '../general/CalendarPageIcon';

interface Props {
  pto: PtoRequestResponse;
}

// const pendingGradient = 'linear-gradient(105deg, rgba(143,195,34,1) 0%, rgba(253,187,45,1) 100%)'
// const acceptedGradient = 'linear-gradient(132deg, rgba(179,199,36,1) 0%, rgba(80,199,36,1) 69%)'

export const PtoCard = ({ pto }: Props) => {
  const [daysTotalHovering, setDaysTotalhovering] = useState(false);
  const [daysBusinessHovering, setDaysBusinesshovering] = useState(false);
  const request = new Date(pto.requestDateTime);
  const ptoStartLocal = new Date(pto.ptoStart);
  const ptoEndLocal = new Date(pto.ptoEnd);
  const ptoStart = new Date(Date.UTC(ptoStartLocal.getFullYear(), ptoStartLocal.getMonth(), ptoStartLocal.getDate()));
  const ptoEnd = new Date(Date.UTC(ptoEndLocal.getFullYear(), ptoEndLocal.getMonth(), ptoEndLocal.getDate()));
  const decision = pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined;

  return (
    <VStack
      position={'relative'}
      w={'100%'}
      maxW={'800px'}
      flexShrink={0}
      flexGrow={0}
      mb={1}
      px={2}
      justifyContent={'start'}
      alignItems={'center'}
      borderRadius={'20px'}
      spacing={0}
      bg={
        pto.pending ? 'rgba(255, 255, 120, .4)' : pto.wasAccepted ? 'rgba(20, 255, 120, .4)' : 'rgba(255, 120, 120, .4)'
      }
      transitionProperty={'height'}
      transitionDuration={'250ms'}
      boxShadow={'6px 4px 4px 0px rgba(66, 68, 90, 1)'}
      color={'blackAlpha.800'}
    >
      <Flex
        position={'absolute'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={'.9rem'}
        fontWeight={'600'}
        color={'whiteAlpha.900'}
        top={'-5px'}
        left={0}
        borderRadius={'50px'}
        bg={'#385898'}
        w={'40px'}
        h={'20px'}
        p={1}
        boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
      >
        ID:{pto.id}
      </Flex>
      <Tooltip
        whiteSpace='pre-line'
        label={`Akceptujący:
        ${pto.acceptorFirstName} ${pto.acceptorLastName}
        ${pto.acceptorEmail}`}
      >
        <Flex cursor={'help'} position={'absolute'} fontSize={'2rem'} color={'#385898'} bottom={0} left={2}>
          <MdSupervisorAccount />
        </Flex>
      </Tooltip>
      <VStack w={'100%'}>
        <HStack w={'100%'} px={'40px'} py={1} justifyContent={'space-evenly'} alignItems={'center'}>
          <Tooltip
            whiteSpace='pre-line'
            label={`Data wniosku:
        ${request.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}
        ${request.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`}
          >
            <Box cursor={'help'}>
              <CalendarPageIcon date={request} size='sm' />
            </Box>
          </Tooltip>
          <HStack w={'100px'} justifyContent={'space-between'}>
            <CalendarPageIcon date={ptoStart} size='sm' />
            <CalendarPageIcon date={ptoEnd} size='sm' />
          </HStack>
          <VStack borderRadius={'20px'} color={'#385898'} fontWeight={'500'} gap={0} spacing={0}>
            <HStack
              position={'relative'}
              onMouseEnter={e => setDaysBusinesshovering(true)}
              onMouseLeave={e => setDaysBusinesshovering(false)}
            >
              <Text
                style={{
                  position: 'absolute',
                  fontSize: '.8rem',
                  width: '130px',
                  right: '-5px',
                  opacity: daysBusinessHovering ? 1 : 0,
                  visibility: daysBusinessHovering ? 'visible' : 'hidden',
                  transitionProperty: 'transform, visibility, opacity',
                  transitionDuration: '.25s',
                  transform: daysBusinessHovering ? 'translateX(-2px)' : 'translateX(0)',
                }}
              >
                Dni roboczych
              </Text>
              <FaBusinessTime />
              <Box>{pto.businessDays}</Box>
            </HStack>
            <HStack
              position={'relative'}
              onMouseEnter={e => setDaysTotalhovering(true)}
              onMouseLeave={e => setDaysTotalhovering(false)}
            >
              <Text
                style={{
                  position: 'absolute',
                  fontSize: '.8rem',
                  width: '130px',
                  right: '-5px',
                  opacity: daysTotalHovering ? 1 : 0,
                  visibility: daysTotalHovering ? 'visible' : 'hidden',
                  transitionProperty: 'transform, visibility, opacity',
                  transitionDuration: '.2s',
                  transform: daysTotalHovering ? 'translateX(-35px)' : 'translateX(0)',
                }}
              >
                Dni kalendarzowych
              </Text>
              <FaCalendarAlt />
              <Box>{pto.totalDays}</Box>
            </HStack>
          </VStack>
          <Flex
            position={'absolute'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            top={0}
            right={0}
            bg={'#385898'}
            w={'100px'}
            h={'20px'}
            color={'whiteAlpha.700'}
            fontSize={'.9rem'}
            borderRadius={'0 50px 0 50px'}
            boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
          >
            {pto.pending && (
              <>
                <Text>Oczekuje</Text>
                <GoClockFill />
              </>
            )}
            {!pto.pending && pto.wasAccepted && (
              <Tooltip
                whiteSpace='pre-line'
                label={`Data decyzji:
                      ${
                        decision && decision.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })
                      }, ${decision && decision.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`}
              >
                <Flex cursor={'help'} w={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
                  <Text fontSize={'.6rem'}>Zaakceptowany</Text>
                  <GoCheckCircleFill />
                </Flex>
              </Tooltip>
            )}
            {!pto.pending && !pto.wasAccepted && (
              <Tooltip
                whiteSpace='pre-line'
                label={`Data decyzji:
          ${decision && decision.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}, ${
                  decision && decision.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })
                }
          Powód odmowy: ${pto.declineReason ? pto.declineReason : 'Brak podanego powodu'}`}
              >
                <Flex cursor={'help'} w={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
                  <Text fontSize={'.6rem'}>Odrzucony</Text>
                  <GoXCircleFill />
                </Flex>
              </Tooltip>
            )}
          </Flex>
        </HStack>
      </VStack>
    </VStack>
  );
};
