import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { GoCheckCircleFill, GoClockFill, GoXCircleFill } from 'react-icons/go';
import { PtoRequestResponse } from '../../model/Pto';

interface Props {
  pto: PtoRequestResponse;
}

export const PtoCardStatus = ({ pto }: Props) => {
  const decision = pto.decisionDateTime ? new Date(pto.decisionDateTime) : undefined;
  const withdrawnDate = pto.withdrawnDateTime ? new Date(pto.withdrawnDateTime) : undefined;

  return (
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
      {pto.wasMarkedToWithdraw && !pto.wasWithdrawn && (
        <Tooltip
          whiteSpace='pre-line'
          label={`Zaakceptowany, oznaczony do wycofania. Data akceptacji:
          ${decision && decision.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}, ${
            decision && decision.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })
          }`}
        >
          <Flex cursor={'help'} w={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
            <Text fontSize={'.6rem'}>Do wycofania</Text>
            <GoXCircleFill />
          </Flex>
        </Tooltip>
      )}
      {pto.wasMarkedToWithdraw && pto.wasWithdrawn && (
        <Tooltip
          whiteSpace='pre-line'
          label={`Zaakceptowany, wycofany. Data akceptacji:
          ${decision && decision.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}, ${
            decision && decision.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })
          }
          Data wycofania:
          ${withdrawnDate && withdrawnDate.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}, ${
            withdrawnDate && withdrawnDate.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })
          }`}
        >
          <Flex cursor={'help'} w={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
            <Text fontSize={'.6rem'}>Wycofany</Text>
            <GoXCircleFill />
          </Flex>
        </Tooltip>
      )}
      {!pto.wasMarkedToWithdraw && !pto.wasWithdrawn && pto.pending && (
        <>
          <Text>Oczekuje</Text>
          <GoClockFill />
        </>
      )}
      {!pto.wasMarkedToWithdraw && !pto.wasWithdrawn && !pto.pending && pto.wasAccepted && (
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
      {!pto.wasMarkedToWithdraw && !pto.wasWithdrawn && !pto.pending && !pto.wasAccepted && (
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
  );
};
