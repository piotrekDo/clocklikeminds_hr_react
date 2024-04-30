import { Box, Flex, HStack, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FaCalendarTimes, FaCheckCircle, FaClock, FaRegCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { PtoRequestResponse } from '../../model/Pto';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface Props {
  pto: PtoRequestResponse;
}

export const PtoCard = ({ pto }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const request = new Date(pto.requestDateTime);
  const decision = pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined;

  return (
    <VStack
      position={'relative'}
      w={'100%'}
      h={!isExpanded ? '50px' : '250px'}
      flexShrink={0}
      flexGrow={0}
      px={2}
      justifyContent={'start'}
      alignItems={'center'}
      overflow={'hidden'}
      borderRadius={'20px'}
      spacing={0}
      bg={pto.pending ? 'yellow.200' : pto.wasAccepted ? 'whatsapp.100' : 'red.100'}
      transitionProperty={'height'}
      transitionDuration={'250ms'}
    >
      <HStack w={'100%'} h={'50px'} flexShrink={0} justifyContent={'center'} alignItems={'center'} fontSize={'.9rem'}>
        <Tooltip label={'Data wniosku'}>
          <HStack flexBasis={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Text>
              {request.toLocaleString('pl-PL', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </HStack>
        </Tooltip>
        <Tooltip label={'Pierwszy dzień urlopu'}>
          <HStack flexBasis={'100%'} justifyContent={'center'} alignItems={'center'}>
            <FaRegCalendarCheck />
            <Text>{pto.ptoStart}</Text>
          </HStack>
        </Tooltip>
        <Tooltip label={'Ostatni dzień urlopu'}>
          <HStack flexBasis={'100%'} justifyContent={'center'} alignItems={'center'}>
            <FaCalendarTimes />
            <Text>{pto.ptoEnd}</Text>
          </HStack>
        </Tooltip>
        <Tooltip label={pto.pending ? 'Oczekuje na akceptację' : pto.wasAccepted ? 'Zaakceptowany' : 'Odrzucony'}>
          <Box flexBasis={'30%'} justifyContent={'center'} alignItems={'center'}>
            {pto.pending && <FaClock size={'1.7rem'} />}
            {!pto.pending && pto.wasAccepted && <FaCheckCircle size={'1.7rem'} />}
            {!pto.pending && !pto.wasAccepted && <FaTimesCircle size={'1.7rem'} />}
          </Box>
        </Tooltip>
        <Box
          flexBasis={'30%'}
          justifyContent={'center'}
          alignItems={'center'}
          cursor={'pointer'}
          onClick={e => setIsExpanded(e => !e)}
        >
          <TriangleDownIcon
            boxSize={'1.5rem'}
            transitionProperty={'transform'}
            transitionDuration={'250ms'}
            transform={isExpanded ? 'rotateX(180deg)' : ''}
          />
        </Box>
      </HStack>
      <VStack h={'calc(100% - 60px)'} w={'100%'} flexShrink={0} flexGrow={0}>
        <Heading w={'100%'} textAlign={'left'} fontSize={'1rem'}>
          Id wniosku: {pto.id}
        </Heading>
        <HStack w={'100%'} spacing={10}>
          <VStack w={'50%'} textAlign={'left'}>
            <Heading w={'100%'} fontSize={'1rem'}>
              Akceptujący
            </Heading>
            <Text w={'100%'}>
              {pto.acceptorFirstName} {pto.acceptorLastName}
            </Text>
            <Text w={'100%'}>{pto.acceptorEmail}</Text>
          </VStack>
          <VStack w={'50%'}>
            <Heading w={'100%'} fontSize={'1rem'}>
              Podsumowanie
            </Heading>
            <Text w={'100%'}>Łącznie dni: {pto.totalDays}</Text>
            <Text w={'100%'}>W tym roboczych: {pto.businessDays}</Text>
          </VStack>
        </HStack>
        <VStack w={'100%'} mt={2}>
          <Text w={'100%'}>
            Data rozpatrzenia:{' '}
            {decision
              ? decision.toLocaleDateString('pl-PL', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Oczekujący'}
          </Text>
          {!pto.pending && !pto.wasAccepted && (
            <Text w={'100%'}>Podód odmowy: {pto.declineReason ? pto.declineReason : 'Brak podanego powodu'}</Text>
          )}
        </VStack>
      </VStack>
      {isExpanded && (
        <Flex
          position={'absolute'}
          right={5}
          bottom={5}
          h={'30px'}
          w={'30px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box flexShrink={0} w={'100%'} h={'100%'}>
            <FcCancel size={'100%'} cursor={'pointer'} onClick={() => setIsCanceling(true)} />
          </Box>
          <HStack
            position={'absolute'}
            w={'200px'}
            right={isCanceling ? '30px' : '-30px'}
            visibility={isCanceling ? 'visible' : 'collapse'}
            transitionProperty={'right, visibility'}
            transitionDuration={'100ms'}
            transitionTimingFunction={'ease-in-out'}
            justifyContent={'space-around'}
          >
            <Box cursor={'pointer'}>
              <CheckIcon fontSize={'1rem'} />
            </Box>
            <Box cursor={'pointer'} onClick={() => setIsCanceling(false)}>
              <CloseIcon fontSize={'.8rem'} />
            </Box>
            <Box>Na pewno?</Box>
          </HStack>
        </Flex>
      )}
    </VStack>
  );
};
