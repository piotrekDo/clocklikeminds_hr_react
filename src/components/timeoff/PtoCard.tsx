import { Box, HStack, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaCalendarTimes, FaCheckCircle, FaClock, FaRegCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { PtoRequestResponse } from '../../model/Pto';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface Props {
  pto: PtoRequestResponse;
}

export const PtoCard = ({ pto }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const request = new Date(pto.requestDateTime);

  return (
    <VStack
      w={'100%'}
      h={!isExpanded ? '50px' : '250px'}
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
            {pto.pending && <FaClock size={'1.7rem'}/>}
            {!pto.pending && pto.wasAccepted && <FaCheckCircle size={'1.7rem'} />}
            {!pto.pending && !pto.wasAccepted && <FaTimesCircle size={'1.7rem'} />}
          </Box>
        </Tooltip>
        <Box flexBasis={'30%'} justifyContent={'center'} alignItems={'center'} cursor={'pointer'} onClick={e => setIsExpanded(e => !e)}>
          <TriangleDownIcon boxSize={'1.5rem'}/>
        </Box>
      </HStack>
      <VStack h={'calc(100% - 60px)'} w={'100%'} border={'solid'} flexShrink={0} flexGrow={0}>
        <Heading w={'100%'} textAlign={'left'} fontSize={'1rem'}>Id wniosku: {pto.id}</Heading>
      <HStack w={'100%'} spacing={10}>
              <VStack w={'50%'} alignContent={'start'} justifyContent={'start'}>
                <Heading  fontSize={'1rem'}>Akceptujący</Heading>
                <Text>{pto.acceptorFirstName} {pto.acceptorLastName}</Text>
                <Text>{pto.acceptorEmail}</Text>
              </VStack>
              <VStack w={'50%'} alignContent={'start'} justifyContent={'start'} border={'solid'}>
                <Heading fontSize={'1rem'}>.</Heading>
                <Text>Łącznie dni: {pto.totalDays}</Text>
                <Text>W tym roboczych: {pto.businessDays}</Text>
              </VStack>
      </HStack>
      </VStack>
    </VStack>
  );
};
