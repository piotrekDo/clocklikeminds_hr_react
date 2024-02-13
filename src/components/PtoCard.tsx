import { HStack, VStack, Text, Tooltip, Box } from '@chakra-ui/react';
import { PtoRequestResponse } from '../model/Pto';
import { FaCalendarAlt, FaCalendarTimes, FaRegCalendarCheck } from 'react-icons/fa';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';

interface Props {
  pto: PtoRequestResponse;
}

export const PtoCard = ({ pto }: Props) => {
  const acceptedBg = 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(0,255,76,0.7035189075630253) 100%)';
  const pendingBg = 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(232,255,0,0.7035189075630253) 100%)';
  const declinedBg = 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,72,0,0.7035189075630253) 100%)';

  return (
    <VStack
      w={'100%'}
      borderRadius={'15px'}
      bg={pto.pending ? pendingBg : pto.wasAccepted ? acceptedBg : declinedBg}
      fontSize={'1rem'}
      padding={2}
      alignItems={'start'}
    >
      <HStack w={'100%'}>
        <VStack flexBasis={'100%'}>
          <Tooltip label={'Pierwszy dzień urlopu'} hasArrow>
            <HStack>
              <Text>
                <FaRegCalendarCheck />
              </Text>
              <Text>{pto.ptoStart}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label={'Ostatni dzień urlopu'} hasArrow>
            <HStack>
              <Text>
                <FaCalendarTimes />
              </Text>
              <Text>{pto.ptoEnd}</Text>
            </HStack>
          </Tooltip>
        </VStack>
        <VStack flexBasis={'100%'}>
          <Tooltip label={'Data wniosku'} hasArrow>
            <HStack>
              <Text>
                <VscGitPullRequestNewChanges />
              </Text>
              <Text>
                {new Date(pto.requestDateTime).toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'short',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </HStack>
          </Tooltip>
          <HStack>
            <Text>Dni roboczych: </Text>
            <Text>{pto.businessDays}</Text>
          </HStack>
        </VStack>
        <VStack flexBasis={'100%'} fontSize={'2rem'}>
          {pto.pending && (
            <Tooltip label={'Oczekuje na akceptację'} hasArrow>
              <Box>
                <FaClock />
              </Box>
            </Tooltip>
          )}
          {!pto.pending && !pto.wasAccepted && (
            <Tooltip label={'Wniosek odrzucony'} hasArrow>
              <Box>
                <FaTimesCircle />
              </Box>
            </Tooltip>
          )}
          {!pto.pending && pto.wasAccepted && (
            <Tooltip label={'Wniosek zaakceptowany'} hasArrow>
              <Box>
                <FaCheckCircle />
              </Box>
            </Tooltip>
          )}
        </VStack>
      </HStack>
      {!pto.pending && !pto.wasAccepted && (
        <Tooltip label={pto.declineReason}>
          <HStack>
            <Text>Powód odmowy:</Text>
            <Text>{pto.declineReason ? pto.declineReason.substring(0, 40) : 'brak podanego powodu'}</Text>
            {pto.declineReason.length > 100 && <Text>...</Text>}
          </HStack>
        </Tooltip>
      )}
    </VStack>
  );
};
