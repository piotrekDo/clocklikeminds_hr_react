import { AttachmentIcon, ChatIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { FaUserTie } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { MdChildFriendly, MdEventRepeat, MdTimer } from 'react-icons/md';
import usePtoModalStore from '../../state/usePtoModalStore';
import { WithdrawActionButton } from './WithdrawActionButton';
import { GrNotes } from 'react-icons/gr';
import { TimeOffRequestHistory } from './time_off_request_history/TimeOffRequestHistory';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PtoRequestExtendedModal = ({ isOpen, onClose }: Props) => {
  const r = usePtoModalStore(s => s.ptoExtendedForUser);

  if (!r) return null;
  console.log(r);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent p={10}>
        <ModalHeader textAlign={'center'}>WNIOSEK URLOPOWY</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Heading mb={'50px'} borderBottom={'solid'} w={'100%'} textAlign={'center'}>
              {r.applierFirstName} {r.applierLastName}
            </Heading>
            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.2rem'} align={'end'}>
              <Text>Proszę o udzielenie</Text>
              <Text textDecor={'underline'} fontSize={'1.5rem'}>
                {r.businessDays}
              </Text>
              <Text>{r.businessDays === 1 ? 'dnia.' : 'dni.'}</Text>
            </HStack>
            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.2rem'}>
              {r.leaveType === 'pto' && (
                <HStack>
                  <GiPalmTree size={'30px'} />
                  <Text>urlopu wypoczynkowego</Text>
                </HStack>
              )}
              {r.leaveType === 'pto_on_demand' && (
                <HStack>
                  <MdTimer size={'30px'} />
                  <Text>urlopu wypoczynkowego na żądanie</Text>
                </HStack>
              )}
              {r.leaveType === 'on_saturday_pto' && (
                <HStack>
                  <MdEventRepeat size={'30px'} />
                  <Text>odbiór dnia wolnego za święto wypadające w sobotę- </Text>
                  <Text>{r.saturday_holiday_date}</Text>
                </HStack>
              )}
              {r.leaveType === 'occasional_leave' && (
                <HStack>
                  <FaUserTie size={'30px'} />
                  <Text>zwolnienie okolicznościowe- </Text>
                  <Text>{r.occasional_descriptionPolish}</Text>
                </HStack>
              )}
              {r.leaveType === 'child_care' && (
                <HStack>
                  <MdChildFriendly size={'30px'} />
                  <Text>zwolnienie okolicznościowe z tytułu opieki nad dzieckiem</Text>
                </HStack>
              )}
            </HStack>
            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.6rem'}>
              <Text>{r.businessDays == 1 ? 'w dniu:' : 'w dniach:'} </Text>
              <Text fontWeight={'700'}>{r.ptoStart}</Text>
              {r.businessDays > 1 && <Text fontWeight={'700'}>- {r.ptoEnd}</Text>}
            </HStack>
            <VStack w={'100%'} mt={'50px'}>
              <VStack w={'100%'} mb={10}>
                <HStack w={'100%'}>
                  <Text fontWeight={'600'} fontSize={'1.3rem'}>
                    STATUS:{' '}
                  </Text>
                  {r.wasMarkedToWithdraw && !r.wasWithdrawn && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'orange.500'}>
                      ZAAKCEPTOWANY, ZGŁOSZONY DO WYCOFANIA
                    </Text>
                  )}
                  {r.wasWithdrawn && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'orange.500'}>
                      ZAAKCEPTOWANY I WYCOFANY
                    </Text>
                  )}
                  {r.pending && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'yellow.500'}>
                      OCZEKUJE
                    </Text>
                  )}
                  {!r.wasMarkedToWithdraw && !r.wasWithdrawn && !r.pending && r.wasAccepted && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'green.400'}>
                      ZAAKCEPTOWANY
                    </Text>
                  )}
                  {!r.wasWithdrawn && !r.pending && !r.wasAccepted && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'red.500'}>
                      ODRZUCONY {(r.declineReason && `- ${r.declineReason}`) || ' -brak podanego powodu'}
                    </Text>
                  )}
                </HStack>
                {!r.pending && (
                  <HStack w={'100%'}>
                    <Text>Data decyzji: </Text>{' '}
                    <Text>
                      {new Date(r.decisionDateTime).toLocaleString('pl-PL', {
                        day: '2-digit',
                        month: 'long',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </Text>
                  </HStack>
                )}
                {!r.pending && r.wasWithdrawn && (
                  <HStack w={'100%'}>
                    <Text>Data wycofania: </Text>{' '}
                    <Text>
                      {new Date(r.withdrawnDateTime).toLocaleString('pl-PL', {
                        day: '2-digit',
                        month: 'long',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </Text>
                  </HStack>
                )}
              </VStack>
              <HStack w={'100%'}>
                <Text>Data i godzina wniosku</Text>
                <Text>{new Date(r.requestDateTime).toLocaleString('pl-PL')}</Text>
              </HStack>
              <HStack w={'100%'}>
                <Text>Rozpatrujący:</Text>
                <Text>{r.acceptorFirstName}</Text>
                <Text>{r.acceptorLastName}</Text>
              </HStack>
            </VStack>
            <VStack w={'100%'} align={'start'} mt={10}>
              <HStack w={'500px'}>
                <GrNotes fontSize={'30px'} />
                <Text>Historia wniosku</Text>
              </HStack>
              <VStack pl={5} spacing={0}>
                {r.requestHistory.map(history => (
                  <TimeOffRequestHistory history={history}/>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <WithdrawActionButton request={r} closeModal={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
